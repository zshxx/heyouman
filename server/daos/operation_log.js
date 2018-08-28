// 表operation_log操作
const { extractDataValues } = require('../common/daosProcessor')
module.exports = class {
  // 插入操作记录到operation_log
  async create ({
    userNamePinyin,
    userName,
    resourceId,
    operation,
    description
  }) {
    let users = await global.M.User.findOne({
      where: {
        userName
      },
      defaults: {
        userNamePinyin
      }
    })
    users = extractDataValues(users)
    return global.M.Log.create({
      uid: users.id,
      resourceId,
      operation,
      description
    })
  }
}
