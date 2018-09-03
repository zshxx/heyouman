import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Select, Icon, Dropdown, Menu } from 'antd'
import './index.less'

const { Option, OptGroup } = Select

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
  static get propTypes () {
    return {
      userInfo: PropTypes.object
    }
  }
  render () {
    const { userInfo } = this.props
    const { userName, userAliasName } = userInfo
    return (
      <div className='m-header'>
        <div className='m-nav'>
          <Link to='/' className='logo'>
            <img
              src={require('assets/img/logo.png')}
              alt='homepage'
              className='dark-logo'
            />
          </Link>
          <div className='user'>
            <div className='login-menu'>
              <Dropdown overlay={menu} trigger={['click']}>
                <a className='ant-dropdown-link' href='#'>
                  <Icon type='user' /> {`${userName}[${userAliasName}]`}
                  <Icon type='down' />
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
