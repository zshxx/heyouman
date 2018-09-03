'use strict'
module.exports = function (sequelize, DataTypes) {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.INTEGER(20).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    proName: {
      type: DataTypes.STRING(45),
      field: 'pro_name'
    },
    proContact: {
      type: DataTypes.STRING(45),
      field: 'pro_contact'
    },
    proPriority: {
      type: DataTypes.STRING(45),
      field: 'pro_priority'
    },
    proStatus: {
      type: DataTypes.STRING(10),
      field: 'pro_status'
    },
    proDescription: {
      type: DataTypes.STRING(200),
      field: 'pro_description'
    },
    proCity: {
      type: DataTypes.STRING(45),
      field: 'pro_city'
    },
    addUserId: {
      type: DataTypes.INTEGER(20),
      field: 'add_user_id'
    },
    hiring: {
      type: DataTypes.INTEGER(20),
      field: 'hiring'
    },
    joinUser: {
      type: DataTypes.STRING(45),
      field: 'join_user'
    },
    salary: {
      type: DataTypes.STRING(45),
      field: 'salary'
    },
    companyId: {
      type: DataTypes.INTEGER(20),
      field: 'company_id'
    },
    proStartTime: {
      type: DataTypes.DATE,
      field: 'pro_start_time'
    },
    proEndTime: {
      type: DataTypes.DATE,
      field: 'pro_end_time'
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
    tableName: 'project'
  })

  return Project
}
