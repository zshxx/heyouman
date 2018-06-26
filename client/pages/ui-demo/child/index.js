import React from 'react'
import { MainContent } from 'components'

import { Link } from 'react-router-dom'

export default () => {
  return (
    <MainContent crumbs={['系统管理', <Link to="/ui-demo">组件示范</Link>, '子页面']}>
      <h1>子页面</h1>
    </MainContent>
  )
}
