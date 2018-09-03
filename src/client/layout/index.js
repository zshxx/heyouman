import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import './index.less'
import Router from '../router'
import HeaderInfo from './header'

const { Sider, Content, Header } = Layout

class LayoutApp extends Component {
  static propTypes = {
    userInfo: PropTypes.object
  }
  render () {
    const { userInfo } = this.props
    return (
      <div className='m-container'>
        <Layout className='m-layout'>
          <Header>
            <HeaderInfo userInfo={userInfo} />
          </Header>
          <Layout>
            <Sider>
            Sider
            </Sider>
            <Content>
              <Router />
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default LayoutApp
