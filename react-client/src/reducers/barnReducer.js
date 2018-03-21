const barnState = {
  newSquaddie: null,
  userSquaddies: [],
};

const barnReducer = (state = barnState, action) => {
  switch (action.type) {
    case 'TEST': {
      return {
        ...state,
      };
    }
    case 'NEW_SQUADDIE': {
      return {
        ...state,
        newSquaddie: action.payload,
      };
    }
    case 'SET_SQUADDIES': {
      return {
        ...state,
        userSquaddies: [],
      };
    }
    case 'RESET_NEW_SQUADDIE': {
      return {
        ...state,
        newSquaddie: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default barnReducer;
