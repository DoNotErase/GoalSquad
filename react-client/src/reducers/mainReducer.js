
const mainReducer = (state = {}, action) => {
    switch(action.type) {
        case 'TEST': {
            return {
                ...state
            }
        }
        case 'USER_LIFETIME_ACTIVITY': {
            return {
                ...state, 
                lifetimeSteps : action.payload.lifetimeSteps,
                lifetimeFloors: action.payload.lifetimeFloors,
                lifetimeDistance: action.payload.lifetimeDistance,
            }
        }
        default: return state;
    }
}

export default mainReducer;