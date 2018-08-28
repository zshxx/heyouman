module.exports = function () {
  return async (ctx, next) => {
    try {
      await next()
    } catch (e) {
      ctx.log.error(e)
      const data = {}
      if (typeof e === 'string') {
        data.error = e
      } else if (e instanceof Error) {
        data.type = 'error'
        data.error = e.message || '系统异常，请稍后再试'
      }
      ctx.body = {
        code: 1,
        error: data.error
      }
    }
  }
}
