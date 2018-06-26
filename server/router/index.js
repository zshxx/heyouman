const Router = require('koa-router')

const papayaProxy = require('@wac/papaya-proxy')
const { apiPrefix } = require('utils/config')
const apiMap = require('utils/api-map')

const home = require('controllers/home')
const customRouter = require('./router')

const router = new Router()

const proxy = papayaProxy({ map: apiMap })

// 首页
router
  .get('/', home)
  // 路由定义
  .use(customRouter.routes())
  // 自动代理到 java 和 首页渲染
  .all('*', async (ctx, next) => {
    const path = ctx.path

    // 如果路径以 apiPrefix 开头，认为是 ajax 请求
    if (!apiPrefix) {
      /* eslint-disable no-console */
      console.warn('apiPrefix 未配置，proxy 功能无法正常使用！')
    }

    // 自动代理
    if (apiPrefix && path.startsWith(apiPrefix) && path !== apiPrefix) {
      await proxy(ctx, next)
    } else {
      // 其他请求 尝试使用首页渲染
      await home(ctx)
    }
  })

module.exports = router
