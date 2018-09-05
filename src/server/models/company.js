'use strict'
module.exports = function (sequelize, DataTypes) {
  const Company = sequelize.define('Company', {
    id: {
      type: DataTypes.INTEGER(20).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    companyName: {
      type: DataTypes.STRING(45),
      field: 'company_name'
    },
    companyCity: {
      type: DataTypes.STRING(45),
      field: 'company_city'
    },
    companyIndustry: {
      type: DataTypes.STRING(45),
      field: 'company_industry'
    },
    companyAlias: {
      type: DataTypes.STRING(10),
      field: 'company_alias'
    },
    companyEnName: {
      type: DataTypes.STRING(100),
      field: 'company_en_name'
    },
    type: {
      type: DataTypes.INTEGER(8),
      field: 'type'
    },
    companyTel: {
      type: DataTypes.STRING(20),
      field: 'company_tel'
    },
    companyAddress: {
      type: DataTypes.STRING(100),
      field: 'company_address'
    },
    contactEmail: {
      type: DataTypes.STRING(45),
      field: 'contact_email'
    },
    companyProfile: {
      type: DataTypes.STRING(45),
      field: 'company_profile'
    },
    contactTel: {
      type: DataTypes.STRING(45),
      field: 'contact_tel'
    },
    contactName: {
      type: DataTypes.INTEGER(20),
      field: 'contact_name'
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
    tableName: 'company'
  })

  return Company
}
