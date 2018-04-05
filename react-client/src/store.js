import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import mainReducer from './mainReducer';
import createGoalReducer from './CreateGoal/createGoalReducer';
import incubatorReducer from './Incubator/incubatorReducer';
import squaddieReducer from './SquaddieYard/squaddieReducer';
import fightReducer from './Battle/fightReducer';
import historyReducer from './History/historyReducer';

const reducer = combineReducers({ // combines reducers from reducer folder
  main: mainReducer,
  goals: createGoalReducer,
  incubator: incubatorReducer,
  squad: squaddieReducer,
  routing: routerReducer,
  squaddies: squaddieReducer,
  fight: fightReducer,
  history: historyReducer,
});

// creates store and allows for chrome redux plugin
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(browserHistory))),
);

export default store;
