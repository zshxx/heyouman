import im from 'immutable'
import constants from './constants'

const initialState = im.fromJS({

})

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.COMPANY_SAVE:
      return state.set('bankcardlist', im.fromJS(action.payload || []))
  }
  return state
}
