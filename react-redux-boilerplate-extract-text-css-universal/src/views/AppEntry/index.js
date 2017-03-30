import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { StaticRouter, withRouter } from 'react-router';

import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import asyncComponent from '../../lib/utils/asyncComponent';
import restoreClient from '../../lib/store/restoreClient';

import './styles.css';

import Users from '../Users/wrapper';

const Home = asyncComponent('views/Home', () => System.import('../Home').then(module => module.default));
const Complete = asyncComponent('views/Complete', () => System.import('../Complete').then(module => module.default));
const Incomplete = asyncComponent('views/Incomplete', () => System.import('../Incomplete').then(module => module.default));

export const entryRoutes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/complete',
    exact: true,
    component: Complete,
  },
  {
    path: '/incomplete',
    exact: true,
    component: Incomplete,
  },
  {
    path: '/users',
    exact: true,
    component: Users,
  },
];

const renderRoutes = () => entryRoutes.map((data, key) => <Route key={key} {...data} />);

const App = () => (
  <div className="App">
    {renderRoutes()}
  </div>
);

const AppWrapper = withRouter(App);

class AppEntry extends Component {

  static displayName = 'AppEntry';

  static propTypes = {
    store: PropTypes.any, // eslint-disable-line
    server: PropTypes.oneOfType([
      PropTypes.bool.isRequired,
      PropTypes.object.isRequired,
    ]),
  };

  componentDidMount() {
    restoreClient(this.props.store);
  }

  render() {
    const { store, server } = this.props;
    const Router = server ? StaticRouter : BrowserRouter;

    return (
      <AppContainer>
        <Provider store={store}>
          <Router {...server}>
            <AppWrapper />
          </Router>
        </Provider>
      </AppContainer>
    );
  }
}

export default AppEntry;
