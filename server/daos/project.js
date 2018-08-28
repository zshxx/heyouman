// 表Contract操作
const _ = require('lodash')
const { extractDataValues } = require('../common/daosProcessor')
module.exports = class {
  // 获取公共项目列表
  async getPublicProjectList ({ page, pageSize }) {
    let offset = (page - 1) * pageSize
    let projects = await global.M.Project.findAndCountAll({
      attributes: [['id', 'pid'], 'projectName'],
      offset,
      limit: +pageSize,
      order: [['id', 'ASC']]
    })
    // 提取projects.rows的dataValues
    let rows = extractDataValues(projects.rows)

    rows = await this._getProjectList(rows)
    return { total: projects.count, rows }
  }
  // 获取私人项目
  async getPrivateProjectList ({
    userName, userNamePinyin, page, pageSize
  }) {
    let options = {
      include: [{
        model: global.M.User,
        as: 'User',
        where: {
          userName
        },
        defaults: {
          userNamePinyin
        }
      },
      {
        model: global.M.Project,
        as: 'Project',
        attributes: [['id', 'pid'], 'projectName']
      }
      ],
      offset: (page - 1) * pageSize,
      limit: +pageSize,
      order: [['pid', 'ASC']]
    }
    if (typeof pageSize === 'undefined' || typeof page === 'undefined') {
      delete options.offset
      delete options.limit
    }

    let userRoles = await global.M.Permission.findAndCountAll(options)

    let rows = extractDataValues(userRoles.rows)
    let projects = _.map(rows, 'Project')
    rows = await this._getProjectList(projects)

    return { total: userRoles.count, rows }
  }

  // 获取单个项目详情
  async getSingleProject (projectId) {
    let project = await this._findOneProject({ id: projectId })
    if (!project) {
      throw new Error(`不存在id=${projectId}的项目`)
    }

    let list = await this._getProjectList([project])
    return list[0]
  }

  // 创建项目
  async createProject ({ projectName, members }) {
    let project = await this._findOneProject({ projectName })
    // 判断project是否已经存在
    if (project) {
      throw new Error(`项目名'${projectName}'已经存在`)
    }

    // 判断该项目的成员是否身兼两个角色
    this._checkRoleDiff(members)

    // 如果有不存在的用户，则返回错误
    await this._checkUserExist(members)

    let uids = _.uniq(members, 'uid')
    await global.M.sequelize.transaction(async t => {
      // 创建项目
      project = await global.M.Project.create(
        {
          projectName
        }, {
          transaction: t
        }
      )
      project = extractDataValues(project)

      // 插入权限记录
      let users = uids.map(u => Object.assign({}, u, { pid: project.id }))

      await global.M.Permission.bulkCreate(
        users,
        {
          transaction: t
        })
    })
    return { projectId: project.id }
  }

  // 修改项目
  async modifyProject ({ projectId, projectName, members }) {
    let project = await this._findOneProject({ id: projectId })
    // 校验项目是否存在
    if (!project) {
      throw new Error(`项目id=${projectId}不存在`)
    }
    let oldName = project.projectName
    // 校验项目名字是否重复
    let projectDuplicate = await this._findOneProject({
      projectName,
      id: { '$ne': projectId }
    })
    if (projectDuplicate) {
      throw new Error(`项目名'${projectName}'已经存在`)
    }
    // 校验用户角色是否唯一
    this._checkRoleDiff(members)
    // 校验用户是否均存在
    await this._checkUserExist(members)
    let userRoles, newUserRoles
    await global.M.sequelize.transaction(async t => {
      userRoles = await global.M.Permission.findAll({
        where: { pid: projectId },
        attributes: ['pid', 'uid', 'role']
      })
      userRoles = extractDataValues(userRoles)

      newUserRoles = _.uniqBy(members, m => `${m.uid}`).map(m => Object.assign(m, { pid: projectId }))

      // 更新项目名称
      await global.M.Project.update({
        projectName
      }, {
        where: {
          id: projectId
        },
        transaction: t
      })
      // 删除项目中所有角色
      await global.M.Permission.destroy({
        where: { pid: projectId },
        transaction: t
      })
      // 新增项目所有角色
      await global.M.Permission.bulkCreate(
        newUserRoles,
        {
          transaction: t
        })
    })

    return { oldName, newName: projectName, oldUserRoles: userRoles, newUserRoles }
  }

  // 根据projects获取list
  async _getProjectList (projects) {
    let contracts = await global.M.Contract.findAll({
      include: [{
        model: global.M.Project,
        as: 'Project',
        attributes: [['id', 'pid']]
      }],
      attributes: [['id', 'contractId']]
    })
    let userRoles = await global.M.Permission.findAll({
      include: [{
        model: global.M.Project,
        as: 'Project',
        attributes: [['id', 'pid']]
      },
      {
        model: global.M.User,
        as: 'User',
        attributes: [['id', 'uid'], 'userName']
      }
      ],
      attributes: ['pid', 'uid', 'role']
    })
    // 提取contracts的dataValues
    contracts = extractDataValues(contracts)
    // 计算协议数目
    let contractCounter = _.countBy(contracts, c => _.get(c, 'Project.pid'))

    // 提取userRoles的dataValues
    userRoles = extractDataValues(userRoles)

    projects = projects.map(pts => Object.assign(pts, { contractNum: contractCounter[pts.pid] || 0 }))
      .map(pts => {
        let roles = userRoles.filter(r => `${r.pid}` === `${pts.pid}`).map(r => ({
          uid: r.uid,
          userName: r.User.userName,
          role: r.role
        }))
        return Object.assign({}, pts, { members: roles })
      })
    return projects
  }

  // 查询单个项目
  async _findOneProject (params) {
    let project = await global.M.Project.findOne({
      where: params,
      attributes: [['id', 'pid'], 'projectName']
    })
    project = extractDataValues(project)

    return project
  }

  // 查询所有项目
  async _findAllProjects (params) {
    let projects = await global.M.Project.findAll({
      where: params,
      attributes: [['id', 'pid'], 'projectName']
    })
    projects = extractDataValues(projects)

    return projects
  }

  // 校验同一项目每个成员是否具有两个以上角色
  _checkRoleDiff (members) {
    let membersLength = members.length
    for (let i = 0; i < membersLength - 1; i++) {
      for (let j = i + 1; j < membersLength; j++) {
        if (`${members[i].uid}` === `${members[j].uid}` &&
          `${members[i].role}` !== `${members[j].role}`) { throw new Error('成员角色不唯一') }
      }
    }
    return true
  }

  // 校验用户是否存在数据库中
  async _checkUserExist (members) {
    let existUids, uids
    existUids = uids = _.uniq(members, 'uid')
    if (uids.length) {
      existUids = await global.M.User.findAll({
        where: {
          id: _.map(uids, 'uid')
        }
      })
      existUids = extractDataValues(existUids)
    }
    if (existUids.length < uids.length) {
      throw new Error('存在未知成员')
    }

    return true
  }
}
