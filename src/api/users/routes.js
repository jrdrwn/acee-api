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
    options: {
      auth: 'jwt',
    },
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
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/users',
    handler: (request, h) => handler.deleteUserHandler(request, h),
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'PUT',
    path: '/users',
    handler: (request, h) => handler.updateUserHandler(request, h),
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'PUT',
    path: '/users/passwd',
    handler: (request, h) => handler.updateUserpasswordHandler(request, h),
    options: {
      auth: 'jwt',
    },
  },
];

module.exports = routes;
