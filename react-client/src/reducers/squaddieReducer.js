const squadState = {
  squaddies: [],
};

const squadReducer = (state = squadState, action) => {
  switch (action.type) {
    case 'GET_SQUADDIES': {
      return {
        ...state,
        squaddies: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default squadReducer;
