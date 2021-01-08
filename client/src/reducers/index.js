import {combineReducers} from 'redux';

import authReducer from './authReducer'

// import { } from 'redux-form'

export default combineReducers({
  auth: authReducer
})