import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './styles.css';

const TodoList = props => (
  <div className="TodoList" d>
    {props.todos.map((todo, index) => (
      <a
        key={index}
        tabIndex="0"
        onClick={() => { props.onClick(index, !todo.complete); }}
        className={classNames('TodoListItem', { is_complete: todo.complete })}
      >
        {todo.content}
      </a>
    ))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  })).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TodoList;
