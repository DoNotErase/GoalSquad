const mainState = {
  user = {},
  deets: {},
};

const mainReducer = (state = mainState, action) => {
  switch (action.type) {
    case 'USER_LOGIN': {
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'SET_DEETS': {
      return {
        ...state,
        deets: { ...action.payload },
      };
    }
    default: {
      return state;
    }
  }
};

export default mainReducer;
