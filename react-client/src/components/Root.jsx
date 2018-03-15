import React from 'react';
import { Provider } from 'react-redux';
import{ Router, Route } from 'react-router-dom';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import Routes from './Routes.jsx';
import store from '../store/index.js';
import mainReducer from '../reducers/mainReducer.js'

//gives URL history to redux
const history = syncHistoryWithStore(createBrowserHistory(), store);

//Root component can only have one child component
//Route component handles route redirection based on filtered path option below
const Root = ({ store }) => (
    <Provider store={ store }>
        <Router history={ history }>
            <Route path='/:filter?' component={ Routes } />
        </Router>
    </Provider>
)

export default Root;