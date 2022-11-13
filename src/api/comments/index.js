const CommentsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'comments',
  version: '1.0.0',
  register: async (server, { commentsService }) => {
    const commnetsHandler = new CommentsHandler(commentsService);

    server.route(routes(commnetsHandler));
  },
};
