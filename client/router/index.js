import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import lazyloader from './lazyloader'

// 改为 PureComponent 防止菜单收缩导致重新渲染
export default class CoreRouter extends React.PureComponent {
  render () {
    return (
      <Switch>
        <Route component={lazyloader('user')} path='/user' />
        <Route component={lazyloader('ui-demo')} path='/ui-demo' />
        <Redirect to='/user' />
      </Switch>
    )
  }
}
