import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter, browserHistory } from 'react-router-dom';

//  VIEW TO RENDER
import HomePage from './HomePage.jsx';
import LandingPage from './LandingPage.jsx';
import GoalsPage from './GoalsPage.jsx'

const Routes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/landing" component={LandingPage} />
      <Route path="/goals" component={GoalsPage} />
      {/* <Router path='/futurpage' component={ nameOfCOmponent } /> */}
    </Switch>
  </Router>
);
/* <Router path='/futurpage' component={ nameOfCOmponent } /> */

export default Routes;
