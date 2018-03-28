import axios from "axios/index";

export const setRoomName = roomName => ({
  type: 'GET_SOCKET_ROOM',
  payload: {
    socketRoom: roomName,
  },
});

export const getSocketRoom = (roomName) => {
  return (dispatch) => {
    dispatch(setRoomName(roomName));
  };
};
