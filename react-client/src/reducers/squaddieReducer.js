const squadState = {
  squaddies: [],
  yardSquaddies: [],
};

const squadReducer = (state = squadState, action) => {
  switch (action.type) {
    case 'GET_SQUADDIES': {
      return {
        ...state,
        squaddies: action.payload,
      };
    }
    case 'TOGGLE_YARD_STATUS': {
      return {
        ...state,
        yardSquaddies: action.payload,
      };
    }
    case 'GET_YARD_SQUADDIES': {
      return {
        ...state,
        yardSquaddies: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default squadReducer;
