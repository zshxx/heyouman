import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Search from './components/user-search'
import List from './components/user-list'
import Detail from './components/user-detail'

import { query, save, hideModal, showModal, remove } from './reducer'
@connect(
  state => ({ user: state.user }),
  dispatch => ({
    action: bindActionCreators({ query, save, hideModal, showModal, remove }, dispatch)
  })
)
export default class UserPage extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    action: PropTypes.object.isRequired
  }

  componentDidMount () {
    this.props.action.query()
  }

  render () {
    const { user, action } = this.props
    const list = user.get('list')
    const modal = user.get('modal')

    return (
      // 为了保证页面高度自动滚动，请使用 MainContent 组件
      <div
        // 面包屑
        crumbs={['示例系统', '用户管理']}
      >
        {/* 查询条件 */}
        <Search list={list} query={action.query} />

        {/* 列表 */}
        <List
          list={list}
          query={action.query}
          remove={action.remove}
          showModal={action.showModal}
        />

        {/* 新增/修改弹窗页面 */}
        <Detail
          modal={modal}
          save={action.save}
          query={action.query}
          hideModal={action.hideModal}
        />
      </div>
    )
  }
}
