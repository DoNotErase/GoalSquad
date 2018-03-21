import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import mainReducer from '../reducers/mainReducer';
import barnReducer from '../reducers/barnReducer';
import createGoalReducer from '../reducers/createGoalReducer';
import incubatorReducer from '../reducers/incubatorReducer';

const reducer = combineReducers({ // combines reducers from reducer folder
  main: mainReducer,
  barn: barnReducer,
  goals: createGoalReducer,
  incubator: incubatorReducer,
  routing: routerReducer,
});

// const router = routerMiddleware(browserHistory);

// creates store and allows for chrome redux plugin
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(browserHistory)))
);

export default store;
