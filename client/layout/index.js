import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import './index.less'
import Router from '../router'

const { Footer, Sider, Content, Header } = Layout

class LayoutApp extends Component {
  static propTypes = {
    common: PropTypes.object
  }
  render () {
    const { common } = this.props
    return (
      <div className='m-container'>
        <Layout>
          <Sider>Sider</Sider>
          <Layout>
            <Header>Header {common}</Header>
            <Content>
              <Router />
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default LayoutApp
