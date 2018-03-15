import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, withRouter, browserHistory } from 'react-router-dom';

//  VIEW TO RENDER
import LandingPage from './LandingPage.jsx';

class Routes extends React.Component {
    render() {
        return (
            <Router history={ browserHistory }>
                <Switch>
                    <Route exact path='/' component={ LandingPage } />
                    {/* <Router path='/futurpage' component={ nameOfCOmponent } /> */}
                </Switch>
            </Router>
        )
    }   
}

export default Routes;