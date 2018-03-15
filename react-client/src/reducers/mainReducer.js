
const initialState = null

const mainReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'TEST': {
            return {
                ...state
            }
        }
    }
}

export default mainReducer;