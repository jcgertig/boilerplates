import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import TodoList from 'components/TodoList';
import SubmitInput from 'components/SubmitInput';

import { setTodoComplete, addTodo } from 'actions/TodoActions';

import styles from './styles.css';

const Home = props => (
  <div className={styles.Home}>
    <TodoList
      todos={props.todos}
      onClick={(index, complete) => props.dispatch(setTodoComplete({ index, complete }))}
    />
    <SubmitInput
      buttonText="Add Todo"
      onSubmit={content => props.dispatch(addTodo({ content, complete: false }))}
    />
    <Link to="/complete">Only Show Complete</Link>
    <Link to="/incomplete">Only Show Incomplete</Link>
  </div>
);

Home.propTypes = {
  dispatch: PropTypes.func,
  todos: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  })),
};

const connectState = state => ({
  todos: state.todos,
});

export default connect(connectState)(Home);
