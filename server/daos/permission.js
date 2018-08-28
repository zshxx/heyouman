// 表Permission操作
const {extractDataValues} = require('../common/daosProcessor')
module.exports = class {
  // 获取用户在某个项目中的权限
  async getUserRole ({ userNamePinyin, userName, pid }) {
    let users = await global.M.User.findOne({
      where: {
        userName
      },
      defaults: {
        userNamePinyin
      },
      attributes: [['id', 'uid']]
    })

    users = users.dataValues
    let permission = await global.M.Permission.findOne({
      where: {
        uid: users.uid,
        pid
      }
    })
    return extractDataValues(permission)
  }
}
