import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import styles from './styles.css';

const Home = asyncComponent(() => System.import('views/Home').then(module => module.default));

const AppEntry = () => (
  <Router>
    <div className={styles.App}>
      <Route exact path="/" component={Home} />
    </div>
  </Router>
);

export default AppEntry;
