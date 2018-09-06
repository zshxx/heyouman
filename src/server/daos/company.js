module.exports = class {
  // 获取用户列表
  async getCompanyList () {
    return global.M.Company.findAll({
      attributes: [['id', 'uid'], 'userName', 'userNamePinyin']
    })
  }
  async SaveCompany (params) {
    return global.M.Company.create({
      ...params
    })
  }
}
