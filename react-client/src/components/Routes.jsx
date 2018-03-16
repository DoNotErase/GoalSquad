import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter, browserHistory } from 'react-router-dom';

//  VIEW TO RENDER
import HomePage from './HomePage.jsx';
import LandingPage from './LandingPage.jsx';
import IncubatorPage from './IncubatorPage.jsx'

const Routes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/landing" component={LandingPage} />
      <Route path="/incubator" component={IncubatorPage} />
      {/* <Router path='/futurpage' component={ nameOfCOmponent } /> */}
    </Switch>
  </Router>
);

export default Routes;
