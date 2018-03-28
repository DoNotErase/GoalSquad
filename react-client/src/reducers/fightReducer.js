const fightState = {
  user: {},
  socket: {},
  monster: {},
};

const fightReducer = (state = fightState, action) => {
  switch (action.type) {
    case 'GET_USER_INFO': {
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'GET_SOCKET_ROOM': {
      return {
        ...state,
        socket: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default fightReducer;
