const incubatorState = {
  userGoals: [],
};

const incubatorReducer = (state = incubatorState, action) => {
  switch (action.type) {
    case 'SET_USER_GOALS': {
      return {
        ...state,
        userGoals: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default incubatorReducer;
