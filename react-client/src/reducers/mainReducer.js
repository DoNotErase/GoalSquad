const mainState = {
  id: '',
  username: '',
  level: 0,
  XP: 0,
  lifetimeSteps: 0,
  lifetimeFloors: 0,
  lifetimeDistance: 0,
};

const mainReducer = (state = mainState, action) => {
  switch (action.type) {
    case 'USER_LIFETIME_ACTIVITY': {
      return {
        ...state,
        lifetimeSteps: action.payload.lifetimeSteps,
        lifetimeFloors: action.payload.lifetimeFloors,
        lifetimeDistance: action.payload.lifetimeDistance,
      };
    }
    case 'USER_LOGIN': {
      return {
        ...state,
        id: action.payload.user_id,
        username: action.payload.user_username,
        level: action.payload.user_level,
        XP: action.payload.user_current_xp,
      };
    }
    default: {
      return state;
    }
  }
};

export default mainReducer;
