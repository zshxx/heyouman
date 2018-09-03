'use strict'
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER(20).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    userName: {
      type: DataTypes.STRING(45),
      field: 'user_name'
    },
    userNamePinyin: {
      type: DataTypes.STRING(45),
      field: 'user_en_name'
    },
    userAliasName: {
      type: DataTypes.STRING(45),
      field: 'user_alias_name'
    },
    userPassword: {
      type: DataTypes.STRING(45),
      field: 'user_password'
    },
    userTel: {
      type: DataTypes.STRING(20),
      field: 'user_tel'
    },
    userAddress: {
      type: DataTypes.STRING(100),
      field: 'user_address'
    },
    userSex: {
      type: DataTypes.STRING(10),
      field: 'user_sex'
    },
    createTime: {
      type: DataTypes.DATE,
      field: 'create_time'
    },
    updatetime: {
      type: DataTypes.DATE,
      field: 'update_time'
    }
  }, {
    tableName: 'user'
  })

  return User
}
