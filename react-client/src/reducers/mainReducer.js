const defaultState = {
  user: {
    id: '',
    username: '',
    level: 0,
    XP: 0,
  },
  activity: {},
};

const mainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'USER_LIFETIME_ACTIVITY': {
      return {
        ...state,
        activity: {
          lifetimeSteps: action.payload.lifetimeSteps,
          lifetimeFloors: action.payload.lifetimeFloors,
          lifetimeDistance: action.payload.lifetimeDistance,
        },
      };
    }
    case 'USER_LOGIN': {
      console.log('setting user');
      return {
        ...state,
        user: {
          id: action.payload.user_id,
          username: action.payload.user_username,
          level: action.payload.user_level,
          XP: action.payload.user_current_xp,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default mainReducer;
