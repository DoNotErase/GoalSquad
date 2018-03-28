const fightState = {
  user: {},
  monster: {},
};

const fightReducer = (state = fightState, action) => {
  switch (action.type) {
    case 'GET_LOBBY_INFO': {
      console.log('action.payload', action.payload);
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'CHOOSE_FIGHTER': {
      return {
        ...state,
        monster: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default fightReducer;
