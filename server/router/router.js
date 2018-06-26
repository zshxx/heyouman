const Router = require('koa-router')
const appConfig = require('utils/config')

const { apiPrefix } = appConfig

// 路由定义
const router = new Router({ prefix: apiPrefix })

router.post('/user/save', require('controllers/user/save'))

module.exports = router
