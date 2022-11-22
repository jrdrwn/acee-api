const CommentsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'comments',
  version: '1.0.0',
  register: async (server, { commentsService, validator }) => {
    const commnetsHandler = new CommentsHandler(commentsService, validator);

    server.route(routes(commnetsHandler));
  },
};
