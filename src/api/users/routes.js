const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: (request, h) => handler.postUserHandler(request, h),
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: (request, h) => handler.getUserByIdHandler(request, h),
  },
  {
    method: 'GET',
    path: '/users/me',
    handler: (request, h) => handler.getMeHandler(request, h),
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'GET',
    path: '/users',
    handler: (request, h) => handler.getUsersByUsernameHandler(request, h),
  },
];

module.exports = routes;
