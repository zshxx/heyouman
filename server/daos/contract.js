// contract表操作
const { extractDataValues } = require('../common/daosProcessor')
const Project = require('./project')
const contractStatus = require('../contants/contract_status')
const contentStatus = require('../contants/content_status')
const processStatus = require('../contants/process_status')
const processType = require('../contants/process_types')
module.exports = class {
  constructor () {
    this.project = new Project()
  }
  // 获取协议列表
  async getContractList ({ projectId, page, pageSize }) {
    await this._checkProjectExist(projectId)
    let offset = (page - 1) * pageSize
    let limit = +pageSize
    let list = await global.M.Contract.findAndCountAll({
      where: {
        pid: projectId
      },
      offset,
      limit,
      order: [['id', 'ASC']]
    })
    let rows = extractDataValues(list.rows)

    // 获取最新的协议内容
    let contents = rows.length ? await global.M.Content.findAll({
      where: {
        contractId: rows.map(row => row.id)
      },
      attributes: [['id', 'contentId'], 'contractId'],
      order: [['createdTime', 'DESC']]
    }) : { dataValues: [] }
    contents = extractDataValues(contents)

    rows = rows.map(row => {
      let content = contents.find(content => content.contractId === row.id)
      content && (row.contentId = content.contentId)
      return row
    })
    return { rows, total: list.count }
  }

  // 创建协议
  async createContract ({ projectId, contractName }) {
    await this._checkProjectExist(projectId)
    // 校验同一个项目协议是否重名
    let contract = await this._findOneContract({
      pid: projectId,
      contractName
    })
    if (contract) {
      throw new Error(`项目id=${projectId}中已存在协议'${contractName}'`)
    }
    return global.M.Contract.create({
      pid: projectId,
      contractName
    })
  }

  // 修改协议
  async modifyContract ({ contractName, contractId }) {
    // 校验协议是否存在
    let contract = await this._findOneContract({ id: contractId })
    if (!contract) throw new Error(`协议id=${contractId}不存在`)
    let otherContract = await this._findOneContract({
      contractName,
      pid: contract.pid,
      id: { '$ne': contractId }
    })
    if (otherContract) throw new Error(`同一项目不同协议不允许重名`)
    await global.M.Contract.update({
      contractName
    }, {
      where: {
        id: contractId
      }
    })

    return { oldName: contract.contractName, newName: contractName }
  }

  // 提交协议审核
  async submitReviewContract ({
    contractId,
    userName,
    uid
  }) {
    let contract = await this._findOneContract({ id: contractId })
    if (!contract) throw new Error(`协议id=${contractId}不存在`)
    if (contract.status !== contractStatus['EDITING']) throw new Error(`协议id=${contractId}状态不允许提交审核`)
    // 从content表中找到对应协议id的最新一条
    const content = await global.M.Content.findOne({
      where: {
        contractId
      },
      order: [['id', 'DESC']]
    })
    // content = extractDataValues(content)
    if (!content) throw new Error(`协议id=${contractId}的模板草稿不存在`)
    return global.M.sequelize.transaction(async t => {
      // 将协议状态置为AUDIT
      await global.M.Contract.update({
        status: contractStatus['AUDIT']
      }, {
        where: {
          id: contractId
        },
        transaction: t
      })

      content.status = contentStatus.INPROCESS
      content.save({transaction: t})

      // 在任务表中插入一条数据
      await global.M.Process.create({
        contractId,
        contentId: content.id,
        pid: contract.pid,
        applicant: userName,
        applicantId: uid,
        status: processStatus['TODO'],
        type: processType['AUDIT']
      }, {
        transaction: t
      })
    }).then(res => contract)
  }

  // 复制协议
  async copyContract ({ contractId, contractName, distPid, user }) {
    await this._checkProjectExist(distPid)
    let contract = await this._findOneContract({ id: contractId })
    if (!contract) throw new Error(`协议id=${contractId}不存在`)

    // 同一项目协议不允许重名
    if ((await global.M.Contract.findOne({
      where: { pid: distPid, contractName }
    }))) { throw new Error(`项目id=${distPid}已存在同名协议`) }
    // 最新模板
    let lastContent = await global.M.Content.findOne({
      where: {
        contractId
      },
      order: [
        ['createdTime', 'desc']
      ]
    })
    lastContent = extractDataValues(lastContent)

    let contractCopy
    await global.M.sequelize.transaction(async t => {
      // 复制协议
      contractCopy = await global.M.Contract.create({
        contractName,
        status: contractStatus[lastContent ? 'EDITING' : 'INITIAL'],
        pid: distPid,
        lastEditor: user.nicknameCN
      }, {
        transaction: t
      })
      contractCopy = extractDataValues(contractCopy)
      // 如果存在最新模板，则复制模板内容
      lastContent && await global.M.Content.create({
        contractId: contractCopy.id,
        content: lastContent.content,
        status: contentStatus['EDITING'],
        author: user.nicknameCN,
        authorId: user.id
      }, {
        transaction: t
      })
    })
    return { content: lastContent ? lastContent.content : null, newContractId: contractCopy.id }
  }

  // 根据projectId校验项目是否存在
  async _checkProjectExist (projectId) {
    let project = await this.project._findOneProject({ id: projectId })
    project = extractDataValues(project)
    if (!project) {
      throw new Error(`项目id=${projectId}不存在`)
    }
    return project
  }

  // 获取单个协议
  async _findOneContract (params) {
    let contract = await global.M.Contract.findOne({
      where: params
    })
    contract = extractDataValues(contract)
    return contract
  }

  async updateStatus (data) {
    const contract = await global.M.Contract.findOne({where: {id: data.contractId}})
    return global.M.Contract.update({
      status: data.status,
      contentId: data.contentId,
      lastEditor: data.lastEditor,
      editTime: new Date()
    }, {
      where: {
        id: data.contractId
      }
    }).then(res => contract)
  }

  async getMembers (contractId) {
    const contract = await global.M.Contract.findOne({
      where: {
        id: contractId
      }
    })
    return global.M.Permission.findAll({
      include: [{
        model: global.M.Project,
        as: 'Project',
        attributes: [['id', 'pid']]
      },
      {
        model: global.M.User,
        as: 'User'
      }
      ],
      attributes: ['pid', 'uid', 'role'],
      where: {
        pid: contract.pid
      }
    })
  }
}
