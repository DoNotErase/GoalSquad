const incubatorState = {
  userGoals: {},
  egg: {
    egg_xp: 0,
    egg_hatched: false,
  },
  needsUpdate: true,
};

const incubatorReducer = (state = incubatorState, action) => {
  switch (action.type) {
    case 'SET_USER_GOALS': {
      return {
        ...state,
        userGoals: action.payload,
        needsUpdate: false,
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
