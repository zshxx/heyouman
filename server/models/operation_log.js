'use strict'
module.exports = function (sequelize, DataTypes) {
  const Log = sequelize.define('Log', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    uid: DataTypes.INTEGER(11),
    resourceId: {
      type: DataTypes.INTEGER(11),
      field: 'resource_id'
    },
    operation: DataTypes.STRING(45),
    description: DataTypes.TEXT,
    createdTime: {
      type: DataTypes.DATE,
      field: 'created_time'
    },
    updatedTime: {
      type: DataTypes.DATE,
      field: 'updated_time'
    }
  }, {
    tableName: 'contract_operation_log'
  })

  return Log
}
