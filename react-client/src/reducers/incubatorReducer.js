const incubatorState = {
  egg: {
    egg_xp: 0,
  },
};

const incubatorReducer = (state = incubatorState, action) => {
  switch (action.type) {
    case 'SET_USER_GOALS': {
      return {
        ...state,
        userGoals: action.payload,
      };
    }
    case 'EGG_DATA': {
      return {
        ...state,
        egg: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default incubatorReducer;
