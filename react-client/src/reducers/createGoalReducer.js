const createGoalState = {
  standardGoals: {},
  isLoading: false,
};

const createGoalReducer = (state = createGoalState, action) => {
  switch (action.type) {
    case 'IS_LOADING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'SET_DEFAULT_GOALS': {
      return {
        ...state,
        standardGoals: action.payload,
      };
    }
    case 'DONE_LOADING': {
      return {
        ...state,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default createGoalReducer;
