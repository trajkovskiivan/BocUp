import {CREATE_PRIVATE_MESSAGE, CREATE_PRIVATE_ROOM} from '../actions/types';


class PrivateMessage {
  constructor(sender, message) {
    this.sender = sender;
    this.message = message
  }
};


class PrivateRoom {
  constructor(roomId, senders = [], messages = []) {
    this.roomId = roomId
    this.senders = senders;
    this.messages = messages;
  }
};

// eslint-disable-next-line
export default (state = [], action) => {
  switch (action.type) {
    case CREATE_PRIVATE_ROOM:
      return [...state, action.payload];
    case CREATE_PRIVATE_MESSAGE:
      state.filter(room => room.roomId === action.payload.room)[0].messages.push(new PrivateMessage(action.payload.sender, action.payload.message))
      return state;
    default:
      return state;
  }
}