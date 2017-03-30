import { combineReducers } from 'redux';
import todos from './TodoReducer';

const rootReducer = combineReducers({
  todos,
});

export default rootReducer;
