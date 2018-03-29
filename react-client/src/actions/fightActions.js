import axios from "axios/index";

export const setLobbyInfo = ((roomInfo, player) => {
  return (dispatch) => {
    dispatch({
      type: 'GET_LOBBY_INFO',
      payload: {
        iam: player,
        roomName: roomInfo.roomName,
        player1: roomInfo.player1,
        player2: roomInfo.player2,
      },
    });
  };
});


// export const getLobbyInfo = (roomInfo) => {
//   return (dispatch) => {
//     dispatch(setLobbyInfo(roomInfo));
//   };
// };

export const setPlayerNumber = ((playernumber) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_PLAYER_NUMBER',
      payload: {
        user: playernumber,
      },
    });
  };
});


// export const getPlayerNumber = (playernumber) => {
//   return (dispatch) => {
//     dispatch(setMonsterFighter(playernumber));
//   };
// };

export const setMonsterFighter = ((player, squaddie) => {
  if (player === 'player1') {
    return (dispatch) => {
      dispatch({
        type: 'CHOOSE_FIGHTER',
        payload: {
          monster1: squaddie,
        },
      });
    };
  } else {
    return (dispatch) => {
      dispatch({
        type: 'CHOOSE_FIGHTER',
        payload: {
          monster2: squaddie,
        },
      });
    };
  }
});


// export const getMonsterID = (monsterUserID) => {
//   return (dispatch) => {
//     dispatch(setMonsterFighter(monsterUserID));
//   };
// };
