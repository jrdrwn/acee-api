const PostsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'posts',
  version: '1.0.0',
  register: async (server, { postsService, validator }) => {
    const postsHandler = new PostsHandler(postsService, validator);

    server.route(routes(postsHandler));
  },
};
