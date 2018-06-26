// 清理 baseURI 路径
const removePrefix = require('../utils/remove-prefix')

module.exports = function (prefix) {
  return async function (ctx, next) {
    ctx.path = removePrefix(ctx.path, prefix) || '/'
    await next()
  }
}
