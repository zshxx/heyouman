import constants from './constants'
import axios from 'utils/axios'

// 查询列表
export const getComoanyList = val => dispatch => {
  const { page, pageSize } = val
  axios({
    url: '/company/list',
    method: 'get',
    params: {
      page,
      pageSize
    }
  }).then(data => {
    dispatch({
      type: constants.GET_COMPANY_LIST,
      payload: data
    })
  }).catch(e => {})
}

// 新增公司
export const handleSave = val => dispatch => {
  axios({
    url: '/company/save',
    method: 'post',
    data: {
      ...val
    }
  }).then(data => {
    // dispatch({
    //   type: constants.GET_COMPANY_LIST,
    //   payload: data.result
    // })
  }).catch(e => {})
}
