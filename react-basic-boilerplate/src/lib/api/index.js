import { generatCRUDRequests } from 'fetchum';

export default {
  posts: generatCRUDRequests('/post', ':id', true),
};
