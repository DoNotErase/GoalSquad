const historyState = {
  goals: [],
  filteredGoals: [],
  filterType: '',
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
      let filteredGoals = state.goals;
      if (action.payload === 'success') {
        filteredGoals = state.goals.filter(goal => (goal.user_goal_success === 1));
      } else if (action.payload === 'fail') {
        filteredGoals = state.goals.filter(goal => (goal.user_goal_success === 0));
      }
      return {
        ...state,
        filteredGoals,
      };
    }
    case 'SET_SORTED': {
      let sorted = state.filteredGoals;
      const sortType = action.payload || state.sortType;
      if (sortType === 'date') {
        sorted = state.filteredGoals.sort((a, b) => {
          if (a.user_goal_start_date < b.user_goal_start_date) {
            return -1;
          }
          return 1;
        });
      } else if (sortType === 'points') {
        sorted = state.filteredGoals.sort((a, b) => (a.user_goal_points - b.user_goal_points));
      } else if (sortType === 'activity') {
        sorted = state.filteredGoals.sort((a, b) => {
          if (a.goal_activity < b.goal_activity) {
            return -1;
          }
          return 1;
        });
      }
      return {
        ...state,
        sortedGoals: sorted,
        sortType: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default historyReducer;
