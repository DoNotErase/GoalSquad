const fightState = {
  roomName: '',
  activePlayer: '',
  playeriam: '',
  player1: '',
  player2: '',
  monster1: {},
  monster2: {},
  monster1CurrentHP: 0,
  monster2CurrentHP: 0,
};

const fightReducer = (state = fightState, action) => {
  console.log('action', action);
  switch (action.type) {
    case 'GET_LOBBY_INFO': {
      return {
        ...state,
        roomName: action.payload.roomName,
        playeriam: action.payload.playeriam,
        player1: action.payload.player1,
        player2: action.payload.player2,
        activePlayer: 'player1',
      };
    }
    case 'CHOOSE_FIGHTER': {
      if (action.payload.player === 'player1') {
        console.log('action.payload', action.payload);
        return {
          ...state,
          monster1: action.payload.monster,
          monster1CurrentHP: action.payload.monsterCurrentHP,
        };
      } else {
        return {
          ...state,
          monster2: action.payload.monster,
          monster2CurrentHP: action.payload.monsterCurrentHP,
        };
      }
    }
    case 'DECREASE_HEALTH': {
      // used later to switch players
      let toggledPlayer = '';
      let newHP = 0;
      state.activePlayer === 'player1' ?
        toggledPlayer = 'player2' :
        toggledPlayer = 'player1';
      console.log('toggledplayer', toggledPlayer);
      console.log('action.payload.damage', action.payload.damage);
      // action.payload.user_monster_id has the monster that did the damage
      // so find the other one to decrease their hp
      if (state.monster1.user_monster_id === action.payload.user_monster_id) {
        newHP = state.monster2CurrentHP - action.payload.damage;
        console.log('newHP', newHP);
        return {
          ...state,
          monster2CurrentHP: newHP,
          activePlayer: toggledPlayer,
        };
      } else {
        newHP = state.monster1CurrentHP - action.payload.damage;
        console.log('newHP', newHP);
        return {
          ...state,
          monster1CurrentHP: newHP,
          activePlayer: toggledPlayer,
        };
      }
    }
    // state becomes too nested. Decided to flatten out
    // case 'CHOOSE_FIGHTER': {
    //   const key = Object.keys(action.payload);
    //   return {
    //     ...state,
    //     monster: {
    //       ...state.monster,
    //       [key]: action.payload[key],
    //     },
    //   };
    // }
    case 'SET_ACTIVE_PLAYER': {
      const key = Object.keys(action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          [key]: action.payload[key],
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default fightReducer;
