// 新增公司
const Company = require('daos/company')
module.exports = async ctx => {
  const company = new Company()

  ctx.body = {
    code: 0,
    data: await company.SaveCompany(ctx.request.body)
  }
}
