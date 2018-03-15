import { createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import mainReducer from '../reducers/mainReducer.js';

const reducer = combineReducers({  //combines reducers from reducer folder
    main: mainReducer,
    routing: routerReducer
});

//creates store and allows for chrome redux plugin
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;