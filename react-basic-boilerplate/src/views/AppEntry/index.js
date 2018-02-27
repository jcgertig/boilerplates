/* global System */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import asyncComponent from '../../lib/utils/asyncComponent';
import styles from './styles.css';

const Home = asyncComponent(() => System.import('views/Home'));

const AppEntry = () => (
  <Router>
    <div className={styles.App}>
      <Route exact path="/" component={Home} />
    </div>
  </Router>
);

export default AppEntry;
