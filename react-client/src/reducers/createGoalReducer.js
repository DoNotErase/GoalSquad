const createGoalState = {

};

const createGoalReducer = (state = createGoalState, action) => {
  switch (action.type) {
    case 'TEST': {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};

export default createGoalReducer;
