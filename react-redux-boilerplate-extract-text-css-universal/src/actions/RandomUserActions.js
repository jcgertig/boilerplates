import createAction from '../lib/utils/createAction';
import api from '../lib/api';

export const ADD_RANDOM_USERS = 'ADD_RANDOM_USERS';
export const addRandomUsers = createAction(ADD_RANDOM_USERS);

export const getRandomUsers = () => dispatch => dispatch(api.randomUsers())
      .then(res => dispatch(addRandomUsers(res.data.results)));
