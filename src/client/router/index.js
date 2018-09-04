import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import lazyloader from './lazyloader'

// 改为 PureComponent 防止菜单收缩导致重新渲染
export default class CoreRouter extends React.Component {
  render () {
    return (
      <Switch>
        <Route component={lazyloader('candidate')} path='/candidate' />
        <Route component={lazyloader('company')} path='/company' />
        <Route component={lazyloader('project')} path='/project' />
        <Redirect to='/project' />
      </Switch>
    )
  }
}
