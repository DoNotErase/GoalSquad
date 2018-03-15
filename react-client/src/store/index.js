import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const reducer = combineReducers({  //combines reducers from reducer folder
    data: mainReducer,
    routing: routerReducer
});

//creates store and allows for chrome redux plugin
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;