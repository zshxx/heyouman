import im from 'immutable'
import constants from '../pages/constants'

const initialState = im.fromJS({})

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case constants.HOME_ACTION_SELECT:
      return state.set('productid', payload)
  }
  return state
}
