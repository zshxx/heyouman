const { baseURI } = require('utils/config')

// 判断是否是异步请求
const isXmlHttpReq = ctx => {
  return ctx.header['x-requested-with'] === 'XMLHttpRequest'
}

// 统一错误处理
// 本地开发环境下不捕获错误
module.exports = app => {
  const isDev = app.env === 'development'

  if (!isDev) {
    app.on('error', function (err, ctx) {
      const message = `
unCaughtException:
loginUser:${(ctx.session && ctx.session.userName) || ''} at ${new Date().toISOString()}

${ctx.method} ${ctx.url} ${ctx.status} ${ctx.message}
${err}`

      ctx.log.error(message)
    })
  }

  return async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      // 使用上文的方法处理error
      ctx.app.emit('error', error, ctx)

      const { code = 500, message } = error

      ctx.status = code
      if (isXmlHttpReq(ctx)) {
        ctx.body = {
          code,
          error: message
        }
      } else {
        await ctx.render('error', {
          pageTitle: '服务器错误',
          code,
          error: message,
          baseURI
        })
      }
    }
  }
}
