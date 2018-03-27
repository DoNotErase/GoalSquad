const yardState = {
  newSquaddie: null,
  userSquaddies: [],
  position: {
    x: 0,
    y: 0,
  },
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
        userSquaddies: [],
      };
    }
    case 'RESET_NEW_SQUADDIE': {
      return {
        ...state,
        newSquaddie: null,
      };
    }
    case 'GET_POSITION': {
      return {
        ...state,
        position: {
          x: action.payload.x,
          y: action.payload.y,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default yardReducer;
