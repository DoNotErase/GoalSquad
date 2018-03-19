const mainState = {
  id: '',
  username: '',
  level: 0,
  XP: 0,
  steps: 0,
  stairs: 0,
  distance: 0,
};

const mainReducer = (state = mainState, action) => {
  switch (action.type) {
    case 'USER_LIFETIME_ACTIVITY': {
      console.log(action.payload);
      return {
        ...state,
        steps: action.payload.steps,
        stairs: action.payload.floors,
        distance: action.payload.distance,
      };
    }
    case 'USER_LOGIN': {
      console.log(action.payload);
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
