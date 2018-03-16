import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter, browserHistory } from 'react-router-dom';

//  VIEW TO RENDER
import HomePage from './HomePage';
import LandingPage from './LandingPage';
import GoalsPage from './GoalsPage';
import BarnPage from './BarnPage';

const Routes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/landing" component={LandingPage} />
      <Route path="/goals" component={GoalsPage} />
      <Route path="/barn" component={BarnPage} />
      {/* <Router path='/futurpage' component={ nameOfCOmponent } /> */}
    </Switch>
  </Router>
);

export default Routes;
