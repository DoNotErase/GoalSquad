const defaultState = {
  user: {
    id: '',
    username: '',
  },
};

const mainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'TEST': {
      return {
        ...state,
      };
    }
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
        user: {
          id: action.payload.user_id,
          username: action.payload.user_username,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default mainReducer;
