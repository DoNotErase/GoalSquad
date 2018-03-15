import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, withRouter, browserHistory } from 'react-router-dom';

//  VIEW TO RENDER
import HomePage from './HomePage.jsx';

const App = (props) => {
    render (
        <Router history={ browserHistory }>
            <Switch>
                <Route exact path='/' component={ HomePage } />
            </Switch>
        </Router>
    )
}