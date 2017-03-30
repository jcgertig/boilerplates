import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import asyncComponent from 'lib/utils/asyncComponent';

import styles from './styles.css';

const Home = asyncComponent(() => System.import('views/Home').then(module => module.default));
const Complete = asyncComponent(() => System.import('views/Complete').then(module => module.default));
const Incomplete = asyncComponent(() => System.import('views/Incomplete').then(module => module.default));

const AppEntry = props => (
  <Provider store={props.store}>
    <Router>
      <div className={styles.App}>
        <Route exact path="/" component={Home} />
        <Route path="/complete" component={Complete} />
        <Route path="/incomplete" component={Incomplete} />
      </div>
    </Router>
  </Provider>
);

AppEntry.propTypes = {
  store: React.propTypes.any,
};

export default AppEntry;
