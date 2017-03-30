import { generatCRUDRequests } from 'fetchum-redux';

export default {
  posts: generatCRUDRequests('/post', ':id', true),
};
