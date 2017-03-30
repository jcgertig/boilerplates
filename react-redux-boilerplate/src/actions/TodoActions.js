import createAction from '../lib/utils/createAction';

export const ADD_TODO = 'ADD_TODO';
export const addTodo = createAction(ADD_TODO);

export const SET_TODO_COMPLETE = 'SET_TODO_COMPLETE';
export const setTodoComplete = createAction(SET_TODO_COMPLETE);
