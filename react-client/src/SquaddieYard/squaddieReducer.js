const squadState = {
  squaddies: [],
  yardSquaddies: [],
  isLoading: false,
  needsUpdate: true,
  newSquaddie: {},
  yardLoading: false,
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
    case 'NEW_SQUADDIE': {
      return {
        ...state,
        newSquaddie: action.payload,
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
    case 'YARD_LOADING': {
      return {
        ...state,
        yardLoading: true,
      };
    }
    case 'YARD_DONE_LOADING': {
      return {
        ...state,
        yardLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default squadReducer;
