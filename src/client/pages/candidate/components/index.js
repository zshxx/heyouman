import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Add from 'pages/company/page/add'
import List from 'pages/company/page/list'

class Company extends Component {
  render () {
    return (
      <Switch>
        <Route exact component={Add} path='/company/add' />
        <Route component={List} path='/' />
      </Switch>
    )
  }
}
export default Company
