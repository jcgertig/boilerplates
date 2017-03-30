// ./src/index.js
import React from 'react';
import ReactDOM from 'react-dom';

import AppEntry from './views/AppEntry';
import configureStore from './lib/store/configure';

const preloadedState = window.__PRELOADED_STATE__; // eslint-disable-line no-underscore-dangle
document.getElementById('__PRELOADED_STATE__').remove();

const render = (Component = AppEntry, store) => {
  ReactDOM.render(
    (<Component server={false} store={store} />),
    document.getElementById('root'),
  );
};

const store = configureStore(preloadedState);

render(undefined, store);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./views/AppEntry', () => {
    render(AppEntry, store);
  });
}
