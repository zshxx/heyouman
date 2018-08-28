'use strict'
module.exports = function (sequelize, DataTypes) {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    projectName: {
      type: DataTypes.STRING(45),
      field: 'project_name'
    },
    createdTime: {
      type: DataTypes.DATE,
      field: 'created_time'
    },
    updatedTime: {
      type: DataTypes.DATE,
      field: 'updated_time'
    }
  }, {
    tableName: 'contract_project'
  })

  return Project
}
