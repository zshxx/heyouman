// 获取用户列表
const User = require('daos/user')
module.exports = async ctx => {
  const user = new User()

  ctx.body = {
    code: 0,
    data: 'DDDDD'
  }
}
