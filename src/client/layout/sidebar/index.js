import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './index.less'

import { Menu, Icon } from 'antd'

class SideBar extends Component {
  static propTypes = {
  }
  state = {
    current: 'project'
  }
  handleClick = (e) => {
    this.setState({
      current: e.key
    })
  }
  render () {
    return (
      <Menu
        mode='inline'
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        defaultOpenKeys={['project']}
      >
        <Menu.Item key='project'>
          <Link to={`/project`}>
            <Icon type='project' />项目管理
          </Link>
        </Menu.Item>
        <Menu.Item key='candidate'>
          <Link to={`/candidate`}>
            <Icon type='user' />人才库
          </Link>
        </Menu.Item>
        <Menu.Item key='company'>
          <Link to={`/company`}>
            <Icon type='team' />客户管理
          </Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default SideBar
