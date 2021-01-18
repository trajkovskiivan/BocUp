import {combineReducers} from 'redux';

import authReducer from './authReducer';
import mainMessagesReducer from './mainMessagesReducer';
import privateRoomsReducer from './privateRoomsReducer';

// import { } from 'redux-form'

export default combineReducers({
  auth: authReducer,
  mainMessages: mainMessagesReducer,
  privateRooms: privateRoomsReducer
})