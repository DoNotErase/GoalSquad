import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import store from './store/index';

render(
  <Root store={store} />,
  document.getElementById('app')
);
