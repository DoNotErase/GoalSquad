const historyState = {
  goals: [],
  filteredGoals: [],
  sortedGoals: [],
  sortType: '',
};

const historyReducer = (state = historyState, action) => {
  switch (action.type) {
    case 'SET_HISTORY': {
      return {
        ...state,
        goals: action.payload,
      };
    }
    case 'SET_FILTERED': {
      if (action.payload === 'all') {
        return {
          ...state,
          filteredGoals: state.goals,
        };
      }
      if (action.payload === 'success') {
        const filteredGoals = state.goals.filter(goal => (goal.user_goal.success === 1));
        return {
          ...state,
          filteredGoals,
        };
      }
      if (action.payload === 'fail') {
        const filteredGoals = state.goals.filter(goal => (goal.user_goal.success === 0));
        return {
          ...state,
          filteredGoals,
        };
      }
      break;
    }
    case 'SET_SORTED': {
      return {
        ...state,
        sortedGoals: action.payload.goals,
        sortType: action.payload.type,
      };
    }
    default: {
      return state;
    }
  }
};

export default historyReducer;
