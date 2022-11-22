const routes = (handler) => [
  {
    method: 'POST',
    path: '/friendships/:from/:to/:type',
    handler: (request, h) => handler.postFriendshipHandler(request, h),
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'PUT',
    path: '/friendships/:from/:to',
    handler: (request, h) => handler.updateFriendshipHandler(request, h),
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'GET',
    path: '/friendships/:from/:to',
    handler: (request, h) => handler.getFriendshipsHandler(request, h),
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'GET',
    path: '/friendships/:from/:to/:type',
    handler: (request, h) => handler.getFriendshipsByTypeHandler(request, h),
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/friendships/:from/:to',
    handler: (request, h) => handler.deleteFriendshipHandler(request, h),
    options: {
      auth: 'jwt',
    },
  },
];

module.exports = routes;
