const Router = require('koa-router')
const path = require('path')
const glob = require('glob')

// 路由定义
const router = new Router()

const controllersDir = path.join(__dirname, '../controllers/api')
glob.sync('**/*.js', {
  cwd: controllersDir
}).forEach((ctrPath) => {
  ctrPath = ctrPath.replace(/([/\\])?\.js$/, '')
  const controller = require(path.join(controllersDir, ctrPath))

  router.all('/api/' + ctrPath, controller)
})

module.exports = router
