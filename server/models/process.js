'use strict'
const moment = require('moment')
module.exports = function (sequelize, DataTypes) {
  const Process = sequelize.define('Process', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    contractId: {
      type: DataTypes.INTEGER(11),
      field: 'contract_id'
    },
    contentId: {
      type: DataTypes.INTEGER(11),
      field: 'contract_content_id'
    },
    pid: {
      type: DataTypes.INTEGER(11),
      field: 'project_id'
    },
    applicantId: {
      type: DataTypes.INTEGER(11),
      field: 'applicant_id'
    },
    applicant: {
      type: DataTypes.STRING(45),
      field: 'applicant'
    },
    status: {
      type: DataTypes.INTEGER(1),
      field: 'process_status'
    },
    type: {
      type: DataTypes.INTEGER(1),
      field: 'process_type'
    },
    operatorId: {
      type: DataTypes.INTEGER(11),
      field: 'operator_id'
    },
    operator: {
      type: DataTypes.STRING(45),
      field: 'operator'
    },
    remark: DataTypes.STRING(500),
    createdTime: {
      type: DataTypes.DATE,
      field: 'created_time',
      get: function () {
        return moment(this.getDataValue('createdTime')).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    updatedTime: {
      type: DataTypes.DATE,
      field: 'updated_time',
      get: function () {
        return moment(this.getDataValue('updatedTime')).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }, {
    tableName: 'contract_process'
  })

  Process.associate = function (models) {
    models.Process.belongsTo(models.Project, {
      as: 'Project',
      foreignKey: 'pid'
    })
    models.Process.belongsTo(models.Contract, {
      as: 'Contract',
      foreignKey: 'contractId'
    })
  }
  return Process
}
