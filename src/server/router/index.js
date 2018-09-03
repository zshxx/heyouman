const Router = require('koa-router')

const home = require('controllers')
const customRouter = require('./router')

const router = new Router()

// 首页
router
  .get('/', home)
  // 路由定义
  .use(customRouter.routes())
  // 自动首页渲染
  .all('*', async (ctx, next) => {
    // 其他请求 尝试使用首页渲染
    await home(ctx)
  })

module.exports = router
