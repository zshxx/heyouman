'use strict'
module.exports = function (sequelize, DataTypes) {
  const CompanyOperatingLog = sequelize.define('CompanyOperatingLog', {
    id: {
      type: DataTypes.INTEGER(20).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    companyId: {
      type: DataTypes.STRING(45),
      field: 'company_id'
    },
    dbId: {
      type: DataTypes.STRING(45),
      field: 'db_id'
    },
    addUserId: {
      type: DataTypes.INTEGER(20),
      field: 'add_user_id'
    },
    comment: {
      type: DataTypes.TEXT,
      field: 'comment'
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
    tableName: 'company_operating_log'
  })

  return CompanyOperatingLog
}
