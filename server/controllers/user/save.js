module.exports = async ctx => {
  ctx.body = {
    code: 1,
    error: '自定义 controllers 拦截',
    body: ctx.request.body,
    query: ctx.query
  }
}
