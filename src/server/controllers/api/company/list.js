// 获取用户列表
const Company = require('daos/company')
module.exports = async ctx => {
  const company = new Company()

  const data = await company.getCompanyList(ctx.query)

  ctx.body = {
    code: 0,
    data: data
  }
}
