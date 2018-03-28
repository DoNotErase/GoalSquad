const squadState = {
  squaddies: [],
  yardSquaddies: [],
  position: {
    x: 0,
    y: 0,
  },
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
    case 'GET_POSITION': {
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
