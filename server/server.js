// 可以添加目录
require('app-module-path/register')

const Promise = require('bluebird')

Promise.config({
  warnings: false,
  longStackTraces: true
})

global.Promise = Promise

const path = require('path')

// config
const config = require('./utils/config')

// koa相关
const Koa = require('koa')
const nunjucks = require('koa-nunjucks-2')
const bodyParser = require('koa-bodyparser')
const favicon = require('koa-favicon')

global.M = require('./models')(config.dbOption)

// 中间件
const error = require('./middlewares/error')
// const CasLogin = require('./middlewares/casLogin')
const healthCheck = require('./middlewares/health-check')

// 路由
const router = require('./router')

const app = new Koa()
app.name = config.appCode.toLowerCase()
app.keys = [`${app.name}`]

const isDev = app.env === 'development'
const port = config.server.port

// 使用中间件
app.use(healthCheck())
app.use(favicon(path.join(__dirname, '../client/public/favicon.ico')))
app.use(bodyParser())
app.use(
  nunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'),
    nunjucksConfig: {
      noCache: isDev,
      autoescape: true
    }
  })
)
// 统一错误处理
app.use(error())
// 登录控制
// app.use(CasLogin())
// 路由配置
app.use(router.routes(), router.allowedMethods())

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
