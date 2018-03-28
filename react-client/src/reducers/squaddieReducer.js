const squadState = {
  squaddies: [],
  yardSquaddies: [],
  position: {
    x: 0,
    y: 0,
  },
  needsUpdate: true,
};

const squadReducer = (state = squadState, action) => {
  switch (action.type) {
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
