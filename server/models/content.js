'use strict'
module.exports = function (sequelize, DataTypes) {
  const Content = sequelize.define('Content', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    contractId: {
      type: DataTypes.INTEGER(11),
      field: 'contract_id'
    },
    status: DataTypes.INTEGER(1),
    content: DataTypes.TEXT,
    authorId: {
      type: DataTypes.INTEGER(11),
      field: 'author_id'
    },
    author: DataTypes.STRING(45),
    createdTime: {
      type: DataTypes.DATE,
      field: 'created_time'
    },
    updatedTime: {
      type: DataTypes.DATE,
      field: 'updated_time'
    }
  }, {
    tableName: 'contract_content'
  })

  return Content
}
