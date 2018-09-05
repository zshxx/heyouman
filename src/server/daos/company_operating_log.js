module.exports = class {
  // 获取用户列表
  async getCompanyList () {
    return global.M.CompanyOperatingLog.findAll({
      attributes: [['id', 'uid'], 'userName', 'userNamePinyin']
    })
  }
}
