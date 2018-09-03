import menus from './menu'

const { baseURI, apiPrefix, appCode, resourceList, userInfo } = window.__config__

// 小屏自适应条件判断
const responsive = innerWidth <= 576

// 默认布局方式
const defaultLayout = 'basic'

export {
  // 基础 URI
  baseURI,
  // ajax 请求前缀
  apiPrefix,
  // 系统编号
  appCode,
  // 菜单项
  menus,
  // 用户资源列表
  resourceList,
  // 用户信息
  userInfo,
  responsive,
  defaultLayout
}
