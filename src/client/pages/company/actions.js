import constants from './constants'
import axios from 'utils/axios'

// 新增公司
export const handleSelectProduct = val => dispatch => {
  axios({
    url: '/api/',
    method: 'post',
    data: {}
  }).then(data => {
    dispatch({
      type: constants.GET_SUPPORT_BANK_LIST,
      payload: data.result
    })
  }).catch(e => {})
}
