// 客户管理
import CompanyList from '../components/list'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'

function mapStateToProps (state) {
  const company = state.company
  return {
    list: company.get('list'),
    pageSize: company.get('pageSize'),
    page: company.get('page')
  }
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators(Actions, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(CompanyList)
