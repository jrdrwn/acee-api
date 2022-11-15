const routes = (handler) => [
  {
    method: 'POST',
    path: '/posts',
    handler: (request, h) => handler.postPostHandler(request, h),
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'GET',
    path: '/posts',
    handler: (request, h) => handler.getPostsHandler(request, h),
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'GET',
    path: '/posts/{postId}',
    handler: (request, h) => handler.getPostByIdHandler(request, h),
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/posts/{postId}',
    handler: (request, h) => handler.deletePostByIdHandler(request, h),
    options: {
      auth: 'jwt',
    },
  },
];

module.exports = routes;
