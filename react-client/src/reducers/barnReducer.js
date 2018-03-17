const barnState = {

};

const barnReducer = (state = barnState, action) => {
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

export default barnReducer;
