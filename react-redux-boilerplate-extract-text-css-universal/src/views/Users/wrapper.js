import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import asyncComponent from '../../lib/utils/asyncComponent';
import { getRandomUsers } from '../../actions/RandomUserActions';

class UsersWrapper extends Component {

  static displayName = 'UsersWrapper';

  static propTypes = {
    dispatch: PropTypes.func,
    match: PropTypes.object, // eslint-disable-line
    randomUsers: PropTypes.array, // eslint-disable-line
  };

  static initialFetch(store) {
    return store.dispatch(getRandomUsers());
  }

  componentDidMount() {
    const { randomUsers, dispatch, match } = this.props;
    if (randomUsers.length === 0) {
      UsersWrapper.initialFetch({ dispatch }, match);
    }
  }

  render() {
    const { randomUsers } = this.props;
    if (randomUsers.length === 0) {
      return <div style={{ height: '100vh' }}>... loading</div>;
    }

    const Users = asyncComponent('views/Users', () => System.import('../Users').then(module => module.default));

    return <Users />;
  }

}

const connectState = state => ({
  randomUsers: state.randomUsers.list,
});

export default connect(connectState)(UsersWrapper);
