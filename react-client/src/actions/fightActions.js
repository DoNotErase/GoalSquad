import axios from "axios/index";

export const setLobbyInfo = roomInfo => ({
  type: 'GET_LOBBY_INFO',
  payload: {
    roomName: roomInfo.roomName,
    player1: roomInfo.player1,
    player2: roomInfo.player2,
  },
});

export const getLobbyInfo = (roomInfo) => {
  return (dispatch) => {
    dispatch(setLobbyInfo(roomInfo));
  };
};

export const setMonsterFighter = monsterUserID => ({
  type: 'CHOOSE_FIGHTER',
  payload: {
    monster: monsterUserID,
  },
});


export const getMonsterID = (monsterUserID) => {
  return (dispatch) => {
    dispatch(setMonsterFighter(monsterUserID));
  };
};
