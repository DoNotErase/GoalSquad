const squadState = {
  squaddies: [],
};

const squadReducer = (state = squadState, action) => {
  switch (action.type) {
    case 'GET_SQUADDIES': {
      return {
        squaddies: action.payload,
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};

export default squadReducer;
