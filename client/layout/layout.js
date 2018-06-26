import './layout.less'

import React from 'react'
import PropTypes from 'prop-types'
import { Layout as AntdLayout } from 'antd'

import PageHeader from './page-header'
import SiderMenu from './sider-menu'

export default class Layout extends React.Component {
  static displayName = 'Layout'

  static propTypes = {
    appCode: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    logo: PropTypes.string,
    children: PropTypes.node,
    mainMenu: PropTypes.array,
    siderMenu: PropTypes.array,
    selectedMenus: PropTypes.array.isRequired,

    logoutUrl: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    responsive: PropTypes.bool,
    className: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.collapsedKey = `${props.appCode}_sider_collapsed`
    const collapsed = localStorage[this.collapsedKey] === 'true'

    this.state = {
      collapsed: collapsed
    }
  }

  // componentDidMount() {
  //   // 如果 Layout 包裹了其他 Layout，尝试隐藏父节点的 layout
  //   const nodes = document.querySelectorAll('.papaya-layout')
  //   if (nodes.length > 1) {
  //     const pNodes = [...nodes].slice(0, -1)
  //     const currentNode = nodes[nodes.length - 1]

  //     for (const node of pNodes) {
  //       const sider = node.querySelector('.ant-layout-sider')
  //       const header = node.querySelector('.papaya-header')

  //       if (sider) sider.style.display = 'none'
  //       if (header) header.style.display = 'none'
  //       currentNode.parentNode.style.padding = 0
  //     }
  //   }
  // }

  // componentWillUnmount() {
  //   const nodes = document.querySelectorAll('.papaya-layout')
  //   if (nodes.length > 1) {
  //     const pNodes = [...nodes].slice(0, -1)
  //     const currentNode = nodes[nodes.length - 1]

  //     for (const node of pNodes) {
  //       const sider = node.querySelector('.ant-layout-sider')
  //       const header = node.querySelector('.papaya-header')

  //       if (sider) sider.style.display = ''
  //       if (header) header.style.display = ''
  //       currentNode.parentNode.style.padding = ''
  //     }
  //   }
  // }

  render() {
    const {
      children,
      title,
      logo,
      mainMenu,
      siderMenu,
      selectedMenus,
      userName,
      logoutUrl,
      responsive,
      className
    } = this.props

    const { collapsed } = this.state

    return (
      <AntdLayout className={className}>
        <SiderMenu
          logo={logo}
          title={title}
          menus={siderMenu}
          selectedMenus={selectedMenus}
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          responsive={responsive}
        />
        <AntdLayout>
          <PageHeader
            userName={userName}
            logoutUrl={logoutUrl}
            responsive={responsive}
            menus={mainMenu}
            selectedMenus={selectedMenus}
          />
          <AntdLayout.Content>{children}</AntdLayout.Content>
        </AntdLayout>
      </AntdLayout>
    )
  }

  onCollapse = (collapsed, type) => {
    // 排除响应式反馈
    if (type === 'responsive') {
      return
    }

    localStorage[this.collapsedKey] = collapsed.toString()
    this.setState({ collapsed })
  }
}
