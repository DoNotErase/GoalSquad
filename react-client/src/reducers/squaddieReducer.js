const squadState = {
  squaddies: [],
  yardSquaddies: [],
  isLoading: false,
};

const squadReducer = (state = squadState, action) => {
  switch (action.type) {
    case 'IS_LOADING': {
      return {
        ...state,
        isLoading: true,
      };
    }
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

export default squadReducer;
