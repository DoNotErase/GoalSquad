const mainState = {
  id: '',
  username: '',
  level: 0,
  XP: 0,
  deets: {},
};

const mainReducer = (state = mainState, action) => {
  switch (action.type) {
    case 'USER_LOGIN': {
      return {
        ...state,
        id: action.payload.user_id,
        username: action.payload.user_username,
        level: action.payload.user_level,
        XP: action.payload.user_current_xp,
      };
    }
    case 'SET_DEETS': {
      return {
        ...state,
        deets: { ...action.payload },
      };
    }
    default: {
      return state;
    }
  }
};

export default mainReducer;
