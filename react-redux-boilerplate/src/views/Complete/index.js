import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import TodoList from 'components/TodoList';
import SubmitInput from 'components/SubmitInput';

import { setTodoComplete, addTodo } from 'actions/TodoActions';

import styles from './styles.css';

const Complete = props => (
  <div className={styles.Complete}>
    <TodoList
      todos={props.todos}
      onClick={(index, complete) => props.dispatch(setTodoComplete({ index, complete }))}
    />
    <SubmitInput
      buttonText="Add Todo"
      onSubmit={content => props.dispatch(addTodo({ content, complete: false }))}
    />
    <Link to="/">Show All</Link>
    <Link to="/incomplete">Only Show Incomplete</Link>
  </div>
);

Complete.propTypes = {
  dispatch: PropTypes.func,
  todos: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  })),
};

const connectState = state => ({
  todos: state.todos.filter(todo => todo.complete),
});

export default connect(connectState)(Complete);
