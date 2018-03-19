const incubatorState = {
  userGoals: {},
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
    default: {
      return state;
    }
  }
};

export default incubatorReducer;
