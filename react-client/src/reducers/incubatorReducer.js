const incubatorState = {

};

const incubatorReducer = (state = incubatorState, action) => {
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

export default incubatorReducer;
