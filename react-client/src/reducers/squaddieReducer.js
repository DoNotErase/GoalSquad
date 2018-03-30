const squadState = {
  squaddies: [],
  yardSquaddies: [],
  isLoading: false,
  needsUpdate: true,
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
        needsUpdate: false,
      };
    }
    case 'SQUADDIE_UPDATE': {
      return {
        ...state,
        needsUpdate: true,
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
        needsUpdate: false,
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
