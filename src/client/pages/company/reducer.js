import im from 'immutable'
import constants from './constants'

const initialState = im.fromJS({
  list: {},
  page: 1,
  pageSize: 10
})

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_COMPANY_LIST:
      return state.set('list', im.fromJS(action.payload || {}))
  }
  return state
}
