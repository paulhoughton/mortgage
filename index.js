import 'babel-polyfill';

import React from 'react';
import ReactDom  from 'react-dom';

import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';
import '!style!css!./style.css';

const store = configureStore();

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
