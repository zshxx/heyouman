'use strict'
module.exports = function (sequelize, DataTypes) {
  const Contract = sequelize.define('Contract', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    contractName: {
      type: DataTypes.STRING(100),
      field: 'contract_name'
    },
    pid: {
      type: DataTypes.INTEGER(11),
      field: 'project_id'
    },
    deployTime: {
      type: DataTypes.DATE,
      field: 'deploy_time'
    },
    lastEditor: {
      type: DataTypes.STRING(45),
      field: 'last_editor'
    },
    editTime: {
      type: DataTypes.DATE,
      field: 'edit_time'
    },
    status: {
      type: DataTypes.INTEGER(1),
      field: 'contract_status'
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
    tableName: 'contract_contract'
  })

  Contract.associate = function (models) {
    models.Contract.belongsTo(models.Project, {
      as: 'Project',
      foreignKey: 'pid'
    })
  }
  return Contract
}
