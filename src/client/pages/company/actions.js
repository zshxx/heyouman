import constants from './constants'
import axios from 'utils/axios'

// 新增公司
export const handleSave = val => dispatch => {
  axios({
    url: '/company/save',
    method: 'post',
    data: {
      ...val
    }
  }).then(data => {
    console.log(data)
    // dispatch({
    //   type: constants.GET_COMPANY_LIST,
    //   payload: data.result
    // })
  }).catch(e => {})
}
