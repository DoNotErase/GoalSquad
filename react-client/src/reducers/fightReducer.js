const fightState = {
  user: {},
  monster: {},
};

const fightReducer = (state = fightState, action) => {
  switch (action.type) {
    case 'GET_LOBBY_INFO': {
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'CHOOSE_FIGHTER': {
      const key = Object.keys(action.payload);
      console.log('key', key);
      return {
        ...state,
        monster: {
          ...state.monster,
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
