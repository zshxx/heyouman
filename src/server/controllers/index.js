const { baseURI, appCode, apiPrefix } = require('utils/config')
const UserDao = require('daos/user')

module.exports = async ctx => {
  const initState = await getInitState()
  const config = await getConfig(ctx)

  await ctx.render('index', {
    config: JSON.stringify(config),
    initState: JSON.stringify(initState),
    baseURI
  })
}

// 提供给前台 redux 作为初始化 state
async function getInitState () {
  const userdao = new UserDao()
  const userInfo = await userdao.getUserById('admin')
  const common = {
  }
  return {
    common,
    userinfo: {
      userAddress: userInfo.userAddress,
      userAliasName: userInfo.userAliasName,
      userName: userInfo.userName,
      userSex: userInfo.userSex,
      userTel: userInfo.userTel
    }
  }
}

// 获取全局配置
async function getConfig (ctx) {
  return {
    // 基础 URI
    baseURI,
    // ajax 请求前缀
    apiPrefix,
    // 系统编号
    appCode
  }
}
