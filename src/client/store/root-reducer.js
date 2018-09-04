/**
 * 根 reducer
 */
import candidate from '../pages/candidate/reducer'
import project from '../pages/project/reducer'
import company from '../pages/company/reducer'
import common from './common'
import userinfo from './userinfo'

export default {
  common,
  userinfo,
  project,
  candidate,
  company
}
