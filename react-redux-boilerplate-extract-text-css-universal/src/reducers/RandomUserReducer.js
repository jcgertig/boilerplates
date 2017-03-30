import defaultState from '../lib/store/default';
import { ADD_RANDOM_USERS } from '../actions/RandomUserActions';

export default function randomUsers(state = defaultState.randomUsers, action) {
  switch (action.type) {
    case ADD_RANDOM_USERS:
      return { ...state, list: [...state.list, ...action.payload] };
    case 'NEW_RANDOM_USERS_REQUEST':
      return { ...state, loading: true, error: false };
    case 'RANDOM_USERS_REQUEST_SUCCESS':
      return { ...state, loading: false, error: false };
    case 'RANDOM_USERS_REQUEST_FAILURE':
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}
