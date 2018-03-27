const yardState = {
  newSquaddie: null,
  userSquaddies: [],
};

const yardReducer = (state = yardState, action) => {
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
        userSquaddies: [...state.userSquaddies, action.payload],
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

export default yardReducer;
