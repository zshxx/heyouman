module.exports = class {
  findOrSave (opts = {}) {
    return global.M.User.findOrCreate({
      where: {
        userNamePinyin: opts.nickname
      },
      defaults: {
        userName: opts.nicknameCN
      }
    })
  }
  // 获取用户列表
  async getUserList () {
    return global.M.User.findAll({
      attributes: [['id', 'uid'], 'userName', 'userNamePinyin']
    })
  }

  getUserById (id) {
    return global.M.User.findOne({
      where: {id}
    })
  }
}
