module.exports = class {
  async findOrSave (opts = {}) {
    return global.M.User.findOrCreate({
      where: {
        userName: opts.userName
      },
      defaults: {
        userName: opts.userName
      }
    })
  }
  // 获取用户列表
  async getUserList () {
    return global.M.User.findAll({
      attributes: [['id', 'uid'], 'userName', 'userNamePinyin']
    })
  }

  async getUserById (userName) {
    return global.M.User.findOne({
      where: {
        userName
      }
    })
  }
}
