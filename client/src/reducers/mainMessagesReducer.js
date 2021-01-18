import {ADD_MAIN_MESSAGE} from '../actions/types';

// eslint-disable-next-line
export default (state = [], action) => {
  switch (action.type) {
    case ADD_MAIN_MESSAGE:
      return [...state, action.payload];
    default:
      return state
  }
}