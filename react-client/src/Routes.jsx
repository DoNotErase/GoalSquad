import React from 'react';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';
import TransitionSwitch from 'react-router-transition-switch';
import Fader from 'react-fader';

//  VIEW TO RENDER
import AdminPage from './Admin/AdminPage';
import HomePage from './HomePageDeets/HomePage';
import IncubatorPage from './Incubator/IncubatorPage';
import YardPage from './SquaddieYard/YardPage';
import GoalsPage from './CreateGoal/GoalsPage';
import DeetsPage from './HomePageDeets/DeetsPage';
import SquadPage from './SquaddieYard/SquadPage';
import BattleLobbyPage from './Battle/BattleLobbyPage';
import BattlePage from './Battle/BattlePage';
import HistoryPage from './History/HistoryPage';

const Routes = () => (
  <Router history={browserHistory}>
    <TransitionSwitch component={Fader}>
      <Route exact path="/" component={HomePage} />
      <Route path="/incubator" component={IncubatorPage} />
      <Route path="/deets" component={DeetsPage} />
      <Route path="/squad" component={SquadPage} />
      <Route path="/yard" component={YardPage} />
      <Route path="/goals" component={GoalsPage} />
      <Route path="/lobby" component={BattleLobbyPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/battle" component={BattlePage} />
      <Route path="/history" component={HistoryPage} />
    </TransitionSwitch>
  </Router>
);

export default Routes;
