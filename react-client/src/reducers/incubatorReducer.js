const incubatorState = {
  userGoals: {},
  egg: {
    egg_xp: 0,
  },
};

const incubatorReducer = (state = incubatorState, action) => {
  switch (action.type) {
    case 'SET_USER_GOALS': {
      console.log(action.payload, 'goals');
      return {
        ...state,
        userGoals: action.payload,
      };
    }
    case 'EGG_DATA': {
      console.log('egg data', action.payload);
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
