import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { autobind } from 'core-decorators';

import { getRandomUsers } from 'actions/RandomUserActions';

import './styles.css';

@autobind
class Users extends Component {

  static displayName = 'Users';

  static propTypes = {
    dispatch: PropTypes.func,
    randomUsers: PropTypes.arrayOf(PropTypes.object),
    randomUsersLoading: PropTypes.bool,
  };

  addMoreUsers() {
    if (!this.props.randomUsersLoading) {
      this.props.dispatch(getRandomUsers());
    }
  }

  render() {
    return (
      <div className="Users">
        Users
        <div>
          {this.props.randomUsers.map((user, i) => (
            <div key={i}>
              {user.name.first}
            </div>
          ))}
          {this.props.randomUsersLoading ? 'loading' : ''}
        </div>
        <button onClick={this.addMoreUsers}>Add More</button>
        <Link to="/">Todos</Link>
      </div>
    );
  }

}

const connectState = state => ({
  randomUsers: state.randomUsers.list,
  randomUsersLoading: state.randomUsers.loading,
});

export default connect(connectState)(Users);
