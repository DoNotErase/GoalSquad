const incubatorState = {
  userGoals: {},
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
    case 'GOAL_FINALIZE': {
      return {
        ...state,
        // local update for speed improvements
        // somehow update usergoal with user_goal_id = action.payload to finalized = true;
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
