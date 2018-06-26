const { baseURI, appCode, apiPrefix, pageTitle = '暂无标题' } = require('utils/config')

module.exports = async ctx => {
  const initState = getInitState()
  const config = await getConfig(ctx)

  await ctx.render('index', {
    pageTitle,
    config: JSON.stringify(config),
    initState: JSON.stringify(initState),
    baseURI
  })
}

// 提供给前台 redux 作为初始化 state
function getInitState() {
  return {}
}

// 获取全局配置
async function getConfig(ctx) {
  return {
    // 基础 URI
    baseURI,
    // ajax 请求前缀
    apiPrefix,
    // 系统编号
    appCode,
    // 用户信息
    userInfo: { nickname: ctx.session.userName }
  }
}
