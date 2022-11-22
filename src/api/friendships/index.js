const FriendShipsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'friendships',
  version: '1.0.0',
  register: async (server, { friendshipsService, validator }) => {
    const friendshipsHandler = new FriendShipsHandler(friendshipsService, validator);

    server.route(routes(friendshipsHandler));
  },
};
