// 页面初始化

import './boot'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'

import { WaterMark } from 'components'
import { userInfo } from 'common/config'
import CoreRouter from './router'
import withLayout from './layout/with-layout'

import createStore from './store/create'
import history from './utils/history'

const { nickname } = userInfo
const RouteComponent = withLayout()(CoreRouter)

const store = createStore(window.__INITIAL_STATE__)

ReactDOM.render(
  [
    <LocaleProvider key='provider' locale={zhCN}>
      <Provider store={store}>
        <Router history={history}>
          <Route path='/' component={RouteComponent} />
        </Router>
      </Provider>
    </LocaleProvider>,
    <WaterMark key='watermark' text={nickname} freeze />
  ],
  document.getElementById('root')
)
