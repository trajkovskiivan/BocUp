import {CREATE_PRIVATE_MESSAGE, CREATE_PRIVATE_ROOM} from '../actions/types';


class PrivateMessage {
  constructor(sender, message) {
    this.sender = sender;
    this.message = message
  }
};

// eslint-disable-next-line
class PrivateRoom {
  constructor(roomId, senders = [], messages = []) {
    this.roomId = roomId
    this.senders = senders;
    this.messages = messages;
  }
};

// eslint-disable-next-line
export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRIVATE_ROOM:
      return {...state, [action.payload.roomId]: action.payload};
    case CREATE_PRIVATE_MESSAGE:
      let privateRooms = state;
      privateRooms[action.payload.room].messages = [...privateRooms[action.payload.room].messages, new PrivateMessage(action.payload.sender, action.payload.message)];
      return {...privateRooms};
    default:
      return state;
  }
}


/*
export default (state = [], action) => {
  switch (action.type) {
    case CREATE_PRIVATE_ROOM:
      return [...state, action.payload];
    case CREATE_PRIVATE_MESSAGE:
      state.filter(room => room.roomId === action.payload.room)[0].messages.push(new PrivateMessage(action.payload.sender, action.payload.message))
      return [...state]
    default:
      return state;
  }
}
*/