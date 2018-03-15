import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import mainReducer from '../reducers/mainReducer.js';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';

const reducer = combineReducers({  //combines reducers from reducer folder
    main: mainReducer,
    routing: routerReducer
});

//creates store and allows for chrome redux plugin
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;