// 页面初始化

import './common'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import im from 'immutable'

import Home from './pages/home'

import createStore from './store/create'
import history from './utils/history'

const store = createStore(window.__INITIAL_STATE__)

ReactDOM.render(

  <LocaleProvider key='provider' locale={zhCN}>
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={Home} />
      </Router>
    </Provider>
  </LocaleProvider>
  ,
  document.getElementById('root')
)
