const fightState = {
  roomName: '',
  activePlayer: '',
  playeriam: '',
  player1: '',
  player2: '',
  monster1: {},
  monster2: {},
  monster1CurrentHP: 0,
  monster1DefenseTurns: 0,
  monster2CurrentHP: 0,
  monster2DefenseTurns: 0,
};

const fightReducer = (state = fightState, action) => {
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
        return {
          ...state,
          monster1: action.payload.monster,
          monster1CurrentHP: action.payload.monsterCurrentHP,
          monster1Attack: action.payload.monsterAttack,
          monster1Defense: action.payload.monsterDefense,
        };
      } // active player is player 2
      return {
        ...state,
        monster2: action.payload.monster,
        monster2CurrentHP: action.payload.monsterCurrentHP,
        monster2Attack: action.payload.monsterAttack,
        monster2Defense: action.payload.monsterDefense,
      };
    }
    case 'DECREASE_HEALTH': {
      // used later to switch players
      const toggledPlayer = state.activePlayer === 'player1' ? 'player2' : 'player1';

      // action.payload.user_monster_id has the monster that did the damage
      // so find the other one to decrease their hp
      if (state.monster1.user_monster_id === action.payload.userMonsterID) {
        return {
          ...state,
          monster2CurrentHP: state.monster2CurrentHP - action.payload.damage,
          monster2DefenseTurns: state.monster2DefenseTurns - 1,
          activePlayer: toggledPlayer,
        };
      } // the other monster
      return {
        ...state,
        monster1CurrentHP: state.monster1CurrentHP - action.payload.damage,
        monster1DefenseTurns: state.monster1DefenseTurns - 1,
        activePlayer: toggledPlayer,
      };
    }
    case 'START_DEFEND': {
      console.log('defending!', action.payload);
      const toggledPlayer = state.activePlayer === 'player1' ? 'player2' : 'player1';

      // the monster that did the defending is in the payload
      if (state.monster1.user_monster_id === action.payload.userMonsterID) {
        console.log('mosnter1');
        return {
          ...state,
          monster1DefenseTurns: 2,
          monster2DefenseTurns: state.monster2DefenseTurns - 1,
          activePlayer: toggledPlayer,
        };
      } // the other monster
      console.log('mosnter2');
      return {
        ...state,
        monster2DefenseTurns: 2,
        monster1DefenseTurns: state.monster1DefenseTurns - 1,
        activePlayer: toggledPlayer,
      };
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
    case 'RESET_STATE': {
      return {
        ...fightState,
      };
    }
    case 'SURRENDER': {
      return {
        ...state,
        surrenderPlayer: action.payload.surrenderPlayer,
      };
    }
    default: {
      return state;
    }
  }
};

export default fightReducer;
