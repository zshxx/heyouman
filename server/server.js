require('app-module-path/register')

const Promise = require('bluebird')

Promise.config({
  warnings: false,
  longStackTraces: true
})

global.Promise = Promise

const path = require('path')
const _ = require('lodash')

const Koa = require('koa')
const nunjucks = require('koa-nunjucks-2')
const bodyParser = require('koa-bodyparser')
const favicon = require('koa-favicon')

const papayaRequest = require('@wac/papaya-request')
const papayaCas = require('@wac/papaya-cas')

const error = require('./middlewares/error')
const healthCheck = require('./middlewares/health-check')
const removePrefix = require('./middlewares/remove-prefix')

const config = require('./utils/config')
const router = require('./router')

const app = new Koa()
const isDev = app.env === 'development'
const port = config.server.port

app.name = config.appCode.toLowerCase()
app.keys = [`loan-${app.name}`]

app.use(healthCheck())
app.use(removePrefix(config.baseURI))
app.use(favicon(path.join(__dirname, '../client/public/favicon.ico')))
app.use(bodyParser())

app.use(
  papayaRequest(
    function (ctx) {
      return {
        // 通用参数配置，如用户信息
        // 默认使用 header['X-Login-User'] 传递
        // proxy: {
        //   host: "127.0.0.1",
        //   port: 8888
        // },
        // 默认 header
        headers: {
          // gzip 压缩
          'Accept-Encoding': 'gzip, deflate',
          referer: ctx.get('referer')
        }
      }
    },
    {
      formatRes (res) {
        const statusCode = res.statusCode || res.status
        const data = res.data

        // 返回结果是否为流
        const isStream = data && _.isFunction(data.pipe)

        let body = `[response ${isStream ? 'file' : 'data'}]`

        // 返回结果是否存在错误
        const isError = data == null || data.code !== 0
        // 在非流模式下，本地 or 返回结果不符合规范的情况下打印日志
        if ((isDev || isError) && !isStream) {
          body = data
        }

        return {
          res_statusCode: statusCode,
          res_body: body
        }
      }
    }
  )
)

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
app.use(error(app))

// 外包 需要开启 静态资源
if (config.out) {
  const staticServer = require('koa-static-cache')
  app.use(
    staticServer(path.join(__dirname, '../build'), {
      maxage: 3600 * 24 * 30,
      gzip: true
    })
  )
}

// cas登录控制
app.use(
  papayaCas({
    casUrl (ctx) {
      const { out, casUrl } = config
      return out && out.domain === ctx.hostname ? out.casUrl : casUrl
    },
    logoutUrl: '/logout',
    baseURI: config.baseURI
  })
)

// 路由配置
app.use(router.routes(), router.allowedMethods())

app.listen(port, () => {
  app.log.info(`server started at localhost:${port}`)
})
