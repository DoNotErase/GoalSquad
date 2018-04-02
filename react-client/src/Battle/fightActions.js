export const setLobbyInfo = ((roomInfo, player) => {
  return (dispatch) => {
    dispatch({
      type: 'GET_LOBBY_INFO',
      payload: {
        playeriam: player,
        roomName: roomInfo.roomName,
        player1: roomInfo.player1,
        player2: roomInfo.player2,

      },
    });
  };
});

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

// move player identification to reducer rather than action
// export const setMonsterFighter = ((player, squaddie) => {
//   console.log('squaddie', squaddie);
//   if (player === 'player1') {
//     return (dispatch) => {
//       dispatch({
//         type: 'CHOOSE_FIGHTER',
//         payload: {
//           monster1: squaddie,
//           monster1CurrentHP: squaddie.user_monster_hp,
//         },
//       });
//     };
//   } else {
//     return (dispatch) => {
//       dispatch({
//         type: 'CHOOSE_FIGHTER',
//         payload: {
//           monster2: squaddie,
//           monster2CurrentHP: squaddie.user_monster_hp,
//         },
//       });
//     };
//   }
// });

export const setMonsterFighter = ((player, squaddie) => {
  return (dispatch) => {
    dispatch({
      type: 'CHOOSE_FIGHTER',
      payload: {
        player,
        monster: squaddie,
        monsterCurrentHP: squaddie.user_monster_hp,
        monsterAttack: squaddie.user_monster_attack,
        monsterDefense: squaddie.user_monster_defense,
      },
    });
  };
});

export const decreaseHealth = ((damage, user_monster_id) => {
  return (dispatch) => {
    dispatch({
      type: 'DECREASE_HEALTH',
      payload: {
        damage,
        user_monster_id,
      },
    });
  };
});

// Not used
export const setActivePlayer = ((playernumber) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_ACTIVE_PLAYER',
      payload: {
        activePlayer: playernumber,
      },
    });
  };
});

export const resetState = (() => {
  return (dispatch) => {
    dispatch({
      type: 'RESET_STATE',
    });
  };
});


export const surrendered = ((surrenderPlayer) => {
  return (dispatch) => {
    dispatch({
      type: 'SURRENDER',
      payload: {
        surrenderPlayer,
      },
    });
  };
});
