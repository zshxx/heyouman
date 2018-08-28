const url = require('url')
const request = require('co-request')
const config = require('../utils/config')

module.exports = function (options) {
  options = options || {}

  const casUrl = 'https://cas.wacai.com'

  const loginUrl = casUrl + '/login?service='

  const logoutUrl = casUrl + '/logout?service='

  return async (ctx, next) => {
    const user = ctx.session.user
    const parsedUrl = url.parse(ctx.request.href)

    let service = parsedUrl.protocol + '//' + parsedUrl.host + parsedUrl.pathname

    // 退出登录
    if (parsedUrl.path.indexOf('logout') > -1) {
      ctx.session.user = null
      service = parsedUrl.protocol + '//' + parsedUrl.host + config.baseURI
      return ctx.redirect(logoutUrl + encodeURIComponent(service))
    }

    if (user) {
      if (!user.id) { // session中用户信息无id时，判断为没有写入数据库
        const UserDao = require('daos/user')
        const userDao = new UserDao()
        const userInDb = await userDao.findOrSave(user)
        ctx.session.user = Object.assign({}, user, { id: userInDb[0].id })
      }
      await next()
      return
    }

    const ticket = ctx.query.ticket

    if (ctx.header.accept && ctx.header.accept.indexOf('json') > -1) {
      ctx.body = {
        code: 1,
        error: '登录超时,请重新登录'
      }
      return
    }
    // cas获取ticket
    if (!ticket) {
      return ctx.redirect(loginUrl + encodeURIComponent(service))
    }

    const result = await request.get({
      url: casUrl + '/validate',
      qs: {
        ticket: ticket,
        service: service
      }
    })

    const sections = result.body.split('\n')

    if (!sections.length || sections[0] === 'no') {
      ctx.throw('Bad response', 500)
    }

    if (sections[0] === 'yes' && sections.length >= 2) {
      const user = await getUser(sections[1]).then(res => {
        return res.body.data
      })
      // console.log(res)

      ctx.session.user = user
      // remove ticket
      ctx.redirect(service)
    }
  }
}

function getUser (nickname) {
  nickname = nickname.split('@')[0]

  return request.get('http://staff.wacai.info/staff/' + nickname, {
    json: true
  })
}
