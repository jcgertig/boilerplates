import { generateCRUDRequests, generateRequest } from 'fetchum-redux';

export default {
  posts: generateCRUDRequests('/post', ':id', true, 'POSTS'),
  randomUsers: generateRequest({
    method: 'GET',
    external: true,
    route: 'https://randomuser.me/api/?results=10',
  }, 'RANDOM_USERS'),
};
