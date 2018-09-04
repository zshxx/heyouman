// 客户管理
import Company from './components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'

function mapStateToProps (state) {
  const userInfo = state.userinfo
  return {
    userInfo
  }
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators(Actions, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Company)
