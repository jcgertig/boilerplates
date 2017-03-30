import { combineReducers } from 'redux';
import todos from './TodoReducer';
import randomUsers from './RandomUserReducer';

const rootReducer = combineReducers({
  todos,
  randomUsers,
});

export default rootReducer;
