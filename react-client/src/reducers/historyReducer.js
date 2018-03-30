const historyState = {
  goals: [],
};

const historyReducer = (state = historyState, action) => {
  switch (action.type) {
    case 'SET_HISTORY': {
      return {
        ...state,
        goals: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default historyReducer;
