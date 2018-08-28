'use strict'
module.exports = function (sequelize, DataTypes) {
  const Permission = sequelize.define('Permission', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    pid: {
      type: DataTypes.INTEGER(11),
      field: 'project_id'
    },
    uid: DataTypes.INTEGER(11),
    role: DataTypes.INTEGER(1),
    createdTime: {
      type: DataTypes.DATE,
      field: 'created_time'
    },
    updatedTime: {
      type: DataTypes.DATE,
      field: 'updated_time'
    }
  }, {
    tableName: 'contract_project_user_role'
  })

  Permission.associate = function (models) {
    models.Permission.belongsTo(models.Project, {
      as: 'Project',
      foreignKey: 'pid'
    })

    models.Permission.belongsTo(models.User, {
      as: 'User',
      foreignKey: 'uid'
    })

    models.Permission.hasMany(models.Process, {
      as: 'Process',
      foreignKey: 'pid',
      sourceKey: 'pid'
    })
  }

  return Permission
}
