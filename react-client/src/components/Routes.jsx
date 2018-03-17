import React from 'react';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';

//  VIEW TO RENDER
import HomePage from './HomePage';
import LandingPage from './LandingPage';
import IncubatorPage from './IncubatorPage';
import BarnPage from './BarnPage';
import GoalsPage from './GoalsPage';
import ProgressBar from './ProgressBarPage';

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 20,
    };
  }

  tick() {
    console.log('inside tick', this);
    this.setState((prevState, props) => ({ percent: prevState.percent + 1 }));
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/landing" component={LandingPage} />
          <Route path="/incubator" component={IncubatorPage} />
          <Route path="/barn" component={BarnPage} />
          <Route path="/goals" component={GoalsPage} />
          <Route path="/egg" render={() => <ProgressBar percent={this.state.percent} tick={() => { this.tick(); }} />} />
        </Switch>
      </Router>
    );
  }
}
export default Routes;
