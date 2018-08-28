// contract表操作
const contentStatus = require('contants/content_status')
const processStatus = require('../contants/process_status')
module.exports = class {
  // 获取草稿状态协议内容状态
  getEditingContent ({ contractId }) {
    return global.M.Content.findOne({
      where: {
        contractId,
        status: contentStatus.EDITING
      }
    })
  }

  getLatestContent ({ contractId }) {
    return global.M.Content.findOne({
      where: {
        contractId
      },
      order: [['id', 'DESC']]
    })
  }

  updateContent ({ contentId, saveContent, user }) {
    return global.M.Content.update({
      content: saveContent,
      author: user.nicknameCN,
      authorId: user.id
    }, {
      where: {
        id: contentId
      }
    })
  }

  async insertContent ({ contractId, saveContent, user }) {
    await global.M.Content.update({
      status: contentStatus.REJECTED
    }, {
      where: {
        contractId,
        status: contentStatus.INPROCESS
      }
    })
    await global.M.Process.update({
      status: processStatus['DELETE']
    }, {
      where: {
        status: processStatus['TODO'],
        contractId
      }
    })
    return global.M.Content.create({
      content: saveContent,
      contractId,
      status: contentStatus.EDITING,
      author: user.nicknameCN,
      authorId: user.id
    })
  }

  getHistoryContent ({contractId}) {
    return global.M.Content.findAll({
      where: {
        contractId: contractId,
        status: [contentStatus.INVALID, contentStatus.ONLINE]
      },
      order: [['createdTime', 'DESC']]
    })
  }

  getOnlineContent ({ contractId }) {
    return global.M.Content.findOne({
      where: {
        contractId,
        status: [contentStatus.ONLINE]
      },
      order: [['id', 'DESC']]
    })
  }

  getPreTemplate (opts) {
    return global.M.Content.findOne({
      where: {
        id: opts.id
      }
    })
  }
}
