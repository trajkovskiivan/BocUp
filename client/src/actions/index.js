import {
  SIGN_IN,
  SIGN_OUT,
  ADD_MAIN_MESSAGE,
  CREATE_PRIVATE_ROOM,
  CREATE_PRIVATE_MESSAGE
} from './types';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};
export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const addMainMessage = (data) => {
  return {
    type: ADD_MAIN_MESSAGE,
    payload: data
  };
};


export const createPrivateRoom = (data) => {
  // history.push(`/private-chat-${data.roomId}`)
  return {
    type: CREATE_PRIVATE_ROOM,
    payload: data
  };

};

export const addPrivateMessage = ({message, receiver, sender, room}) => {
  return {
    type: CREATE_PRIVATE_MESSAGE,
    payload: {message, receiver, sender, room}
  }
}