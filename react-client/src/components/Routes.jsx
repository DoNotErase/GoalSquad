import React from 'react';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';

//  VIEW TO RENDER
import HomePage from './HomePage';
import LandingPage from './LandingPage';
import IncubatorPage from './IncubatorPage';
import YardPage from './YardPage';
import GoalsPage from './GoalsPage';

const Routes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/landing" component={LandingPage} />
      <Route path="/incubator" component={IncubatorPage} />
      <Route path="/yard" component={YardPage} />
      <Route path="/goals" component={GoalsPage} />
    </Switch>
  </Router>
);

export default Routes;
