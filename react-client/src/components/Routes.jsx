import React from 'react';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';
import TransitionSwitch from 'react-router-transition-switch';
import Fader from 'react-fader';

//  VIEW TO RENDER
import HomePage from './HomePage';
import LandingPage from './LandingPage';
import IncubatorPage from './IncubatorPage';
import YardPage from './YardPage';
import GoalsPage from './GoalsPage';
import DeetsPage from './DeetsPage';
import SquadPage from './SquadPage';
import BattleLobbyPage from './BattleLobbyPage';
import BattlePage from './BattlePage';

const Routes = () => (
  <Router history={browserHistory}>
    <TransitionSwitch component={Fader}>
      <Route exact path="/" component={HomePage} />
      <Route path="/landing" component={LandingPage} />
      <Route path="/incubator" component={IncubatorPage} />
      <Route path="/deets" component={DeetsPage} />
      <Route path="/squad" component={SquadPage} />
      <Route path="/yard" component={YardPage} />
      <Route path="/goals" component={GoalsPage} />
      <Route path="/lobby" component={BattleLobbyPage} />
    </TransitionSwitch>
  </Router>
);

export default Routes;
