const PostsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'posts',
  version: '1.0.0',
  register: async (server, { postsService }) => {
    const postsHandler = new PostsHandler(postsService);

    server.route(routes(postsHandler));
  },
};
