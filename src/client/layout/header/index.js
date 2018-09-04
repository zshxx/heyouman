import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Icon, Dropdown, Menu } from 'antd'
import './index.less'

const menu = (
  <Menu>
    <Menu.Item key='0'>
      <a href='/myLogout' role='menuitem' tabIndex='-1'>
        <Icon type='logout' /> 退出
      </a>
    </Menu.Item>
  </Menu>
)

class Header extends Component {
  static propTypes = {
    userInfo: PropTypes.object
  }
  render () {
    const { userInfo } = this.props
    const { userName, userAliasName } = userInfo
    return (
      <div className='c-header'>
        <Link to='/' className='logo' >
          <img
            src={require('assets/img/logo.png')}
            alt='homepage'
            className='dark-logo'
          />
        </Link>
        <div className='user'>
          <Dropdown overlay={menu} trigger={['click']}>
            <a className='ant-dropdown-link' href='#'>
              <Icon type='user' className='fonticon' /> {` ${userName} [ ${userAliasName} ] `}
              <Icon type='down' className='fonticon' />
            </a>
          </Dropdown>
        </div>
      </div>
    )
  }
}

export default Header
