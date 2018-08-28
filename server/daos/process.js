const roles = require('contants/role')
const processStatus = require('contants/process_status')
const processTypes = require('contants/process_types')
const contentStatus = require('contants/content_status')
const contractStatus = require('contants/contract_status')
module.exports = class {
  async getTodoList (user) {
    const projects = await global.M.Permission.findAll({
      where: {
        uid: user.id
      }
    })
    const auditPids = projects.filter(p => p.role === roles['AUDITOR']).map(p => p.pid)
    const testPids = projects.filter(p => p.role === roles['TESTER']).map(p => p.pid)
    // const publishPids = projects.filter(p => p.role === roles['ISSUER']).map(p => p.pid)
    return Promise.props({
      auditList: global.M.Process.findAll({
        include: [{
          model: global.M.Project,
          as: 'Project',
          attributes: ['projectName']
        }, {
          model: global.M.Contract,
          as: 'Contract',
          attributes: ['contractName']
        }],
        where: {
          pid: auditPids,
          status: processStatus['TODO'],
          type: processTypes['AUDIT']
        },
        order: [['createdTime', 'DESC']]
      }),
      testList: global.M.Process.findAll({
        include: [{
          model: global.M.Project,
          as: 'Project',
          attributes: ['projectName']
        }, {
          model: global.M.Contract,
          as: 'Contract',
          attributes: ['contractName']
        }],
        where: {
          pid: testPids,
          status: processStatus['TODO'],
          type: processTypes['TEST']
        },
        order: [['createdTime', 'DESC']]
      }),
      publishList: global.M.Process.findAll({
        include: [{
          model: global.M.Project,
          as: 'Project',
          attributes: ['projectName']
        }, {
          model: global.M.Contract,
          as: 'Contract',
          attributes: ['contractName']
        }],
        where: {
          pid: testPids,
          status: processStatus['TODO'],
          type: processTypes['PUBLISH']
        },
        order: [['createdTime', 'DESC']]
      })
    })
  }

  submit (data) {
    return global.M.sequelize.transaction(async (t) => {
      await global.M.Process.findById(data.id).then(async (process) => {
        // 更新process表 中当前process
        await global.M.Process.update({
          status: data.status,
          remark: data.remark || null,
          operator: data.operator,
          operatorId: data.operatorId
        }, {
          where: {
            id: data.id
          },
          transaction: t
        })

        // process表 审稿、测试通过，则需新建流程 （上线通过不需建新流程）
        let newProcessType = ''
        if (data.status === processStatus['ACCEPTED']) {
          switch (process.type) {
            case processTypes['AUDIT']:
              newProcessType = processTypes['TEST']
              break
            case processTypes['TEST']:
              newProcessType = processTypes['PUBLISH']
              break
          }
        }

        if (newProcessType !== '') {
          await global.M.Process.create({
            contractId: process.contractId,
            contentId: process.contentId,
            pid: process.pid,
            applicant: process.applicant,
            applicantId: process.applicantId,
            status: 0,
            type: newProcessType
          }, {
            transaction: t
          })
        }

        // contract表 协议状态
        let cStatus = ''
        if (data.status === processStatus['ACCEPTED']) {
          switch (process.type) {
            case processTypes['AUDIT']:
              cStatus = contractStatus['TEST']
              break
            case processTypes['TEST']:
              cStatus = contractStatus['PUBLISH']
              break
            case processTypes['PUBLISH']:
              cStatus = contractStatus['ONLINE']
              break
          }
        } else if (data.status === processStatus['REJECTED']) {
          cStatus = contractStatus['EDITING']
        }
        if (cStatus !== '') {
          let updateData = {
            status: cStatus
          }
          if (cStatus === contractStatus['ONLINE']) {
            updateData = {
              status: cStatus,
              deployTime: new Date()
            }
          }
          await global.M.Contract.update(updateData, {
            where: {
              id: process.contractId
            },
            transaction: t
          })
        }

        // 更新content表模板状态
        if (data.status === 1 && process.type === processTypes['PUBLISH']) {
          // 之前线上在使用的要更新为’失效‘
          await global.M.Content.update({
            status: contentStatus['INVALID']
          }, {
            where: {
              contractId: process.contractId,
              status: contentStatus['ONLINE']
            },
            transaction: t
          })

          // 当前需要更新为’已上线‘
          await global.M.Content.update({
            status: contentStatus['ONLINE']
          }, {
            where: {
              id: process.contentId
            },
            transaction: t
          })
        }
        if (process.type === processTypes['AUDIT'] && data.status === processStatus['REJECTED']) {
          // 审稿拒绝时 更新content表对应状态
          await global.M.Content.update({
            status: contentStatus['REJECTED']
          }, {
            where: {
              id: process.contentId
            },
            transaction: t
          })
        }
      })
      return { success: true }
    })
  }

  getProcessById (processId) {
    return global.M.Process.findById(processId, {
      include: [{
        model: global.M.Contract,
        as: 'Contract',
        attributes: ['contractName']
      }]
    })
  }

  async getHistoryList (user) {
    return global.M.Process.findAll({
      include: [{
        model: global.M.Project,
        as: 'Project',
        attributes: ['projectName']
      }, {
        model: global.M.Contract,
        as: 'Contract',
        attributes: ['contractName']
      }],
      where: {
        operatorId: user.id
      },
      order: [['updatedTime', 'DESC']]
    })
  }
}
