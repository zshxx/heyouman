import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import './index.less'
import Router from '../router'
import HeaderInfo from './header'
import SideBar from './sidebar'

const { Sider, Content, Header, Footer } = Layout

class LayoutApp extends Component {
  static propTypes = {
    userInfo: PropTypes.object
  }
  render () {
    const { userInfo } = this.props
    return (
      <div className='m-container'>
        <Layout className='m-layout'>
          <Header className='m-header'>
            <HeaderInfo userInfo={userInfo} />
          </Header>
          <Layout className='m-sec-layout'>
            <Sider className='m-sider'>
              <SideBar />
            </Sider>
            <Content>
              <Router />
            </Content>
          </Layout>
          <Footer className='m-footer'>Copyright ©2018 HUM Corporation All rights reserved.</Footer>
        </Layout>
      </div>
    )
  }
}

export default LayoutApp
