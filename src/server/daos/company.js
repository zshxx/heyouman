module.exports = class {
  // 获取用户列表
  async getCompanyList ({page, pageSize}) {
    let offset = (page - 1) * pageSize
    let limit = +pageSize
    return global.M.Company.findAndCountAll({
      limit,
      offset,
      order: [['createTime', 'DESC']]
    })
  }
  async SaveCompany (params) {
    return global.M.Company.create({
      ...params
    })
  }
}
