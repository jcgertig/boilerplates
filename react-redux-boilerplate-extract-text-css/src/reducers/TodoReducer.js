import defaultState from '../lib/store/default';
import { ADD_TODO, SET_TODO_COMPLETE } from '../actions/TodoActions';

export default function todos(state = defaultState.todos, action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case SET_TODO_COMPLETE: {
      const todo = state[action.payload.index];
      todo.complete = action.payload.complete;
      const newState = [...state];
      newState.splice(action.payload.index, 1, todo);
      return newState;
    }
    default:
      return state;
  }
}
