import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter, browserHistory } from 'react-router-dom';

//  VIEW TO RENDER
import HomePage from './HomePage';
import LandingPage from './LandingPage';
import GoalsPage from './GoalsPage';
import EggPage from './Egg';

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
          <Route path="/goals" component={GoalsPage} />
          <Route path="/egg" render={() => <EggPage percent={this.state.percent} tick={() => { this.tick(); }} />} />
          {/* <Router path='/futurpage' component={ nameOfCOmponent } /> */}
        </Switch>
      </Router>
    );
  }
}
export default Routes;
