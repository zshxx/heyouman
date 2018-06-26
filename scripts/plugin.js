const execa = require('execa')
const plugins = ['auth']

/* 代码提交时，需要保证所有 plugin 分支可以顺利合并入 master，没有冲突
 * 逻辑：
 * 1. 更新所有 plugin 分支
 * 2. 将【目标分支】设为当前分支
 * 3. 若当前分支为 plugin 分支，将 master 分支作为【目标分支】并更新
 * 4. 遍历所有 plugin 分支，尝试合并入【目标分支】
 * 5. 按照合并结果提示用户
 * 6. process.exit(errorCode)
*/

checkPush()

// 判断能否提交
function checkPush() {
  // 判断当前分支是否干净
  if (!isClean()) {
    // eslint-disable-next-line
    console.error('ERROR:当前工作区不干净，请先执行 commit 或 stash 命令')
    process.exit(1)
  }

  // 获取冲突分支
  const conflictBranch = checkConflict(plugins)
  if (conflictBranch) {
    const targetBranch = getTargetBranch()

    // eslint-disable-next-line
    console.error(
      `ERROR:分支 plugin/${conflictBranch} 无法顺利合并到 ${targetBranch}，请处理冲突之后再提交`
    )
    process.exit(1)
  }

  process.exit(0)
}

// 判断是否存在冲突分支
function checkConflict(plugins) {
  const currentBranch = getCurrentBranch()
  const targetBranch = getTargetBranch()
  const tempBranch = getTempBranch()

  // 更新所有 plugin 分支
  pullPlugins(plugins)

  // 检出到临时分支
  toNewBranch(tempBranch, targetBranch)

  // 判断冲突分支
  const conflictBranch = getConflictBranch(plugins)

  // // 清理分支
  clearBranch(tempBranch, currentBranch)

  return conflictBranch
}

// 获取临时分支
function getTempBranch() {
  const random = Math.random()
    .toString()
    .slice(-6)

  return `merge-test-plugin_${random}`
}

// 获取当前分支
function getCurrentBranch() {
  const result = execa.shellSync('git symbolic-ref --short HEAD')
  return result.stdout
}

// 更新 plugin 分支
function pullPlugins(plugins) {
  plugins.forEach(plugin => pullBranch(`plugin/${plugin}`))
}

// 判断当前工作区是否干净
function isClean() {
  return execa.shellSync('git status --porcelain').stdout === ''
}
// 更新分支
function pullBranch(branch) {
  execa.shellSync(`
git checkout ${branch}
git pull origin ${branch}`)
}

// 获取目标分支
function getTargetBranch() {
  const currentBranch = getCurrentBranch()
  let targetBranch = currentBranch
  if (currentBranch.startsWith('plugin')) {
    targetBranch = 'master'
    pullBranch('master')
  }
  return targetBranch
}

// 检出新分支
function toNewBranch(branch, targetBranch) {
  execa.shellSync(`git checkout -b ${branch} ${targetBranch}`)
}

// 获取冲突分支
function getConflictBranch(plugins) {
  for (const plugin of plugins) {
    // 判断是否冲突
    const isConflict = isConflictBranch(`plugin/${plugin}`)

    if (isConflict) {
      return plugin
    }
  }
}

// 判断是否为冲突分支
function isConflictBranch(branch) {
  // 尝试合并
  const mergeResult = execa.shellSync(`git merge ${branch}`)
  const isConflict = mergeResult.status !== 0

  if (isConflict) {
    execa.shellSync(`git merge --abort`)
  }

  return isConflict
}

// 删除分支
function clearBranch(targetBranch, baseBranch) {
  execa.shellSync(`
  git checkout ${baseBranch}
  git branch -D ${targetBranch}`)
}
