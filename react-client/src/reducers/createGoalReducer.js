const createGoalState = {
  standardGoals: [],
};

const createGoalReducer = (state = createGoalState, action) => {
  switch (action.type) {
    case 'SET_DEFAULT_GOALS': {
      return {
        ...state,
        standardGoals: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default createGoalReducer;
