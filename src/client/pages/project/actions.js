import constants from './constants'
// 选择项目
export const handleSelectProduct = val => dispatch => {
  if (val === 'new') {
    this.handleModalVisible()(dispatch)
    return
  }
  dispatch({
    type: constants.HOME_ACTION_SELECT,
    payload: val
  })
}
