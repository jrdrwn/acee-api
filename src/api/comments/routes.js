const routes = (handler) => [
  {
    method: 'POST',
    path: '/comments',
    handler: (request, h) => handler.postCommentHandler(request, h),
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'GET',
    path: '/comments/{commentId}',
    handler: (request, h) => handler.getCommentByIdHandler(request, h),
    options: {
      auth: 'jwt',
    },
  },
  {
    method: 'GET',
    path: '/comments/post/{postId}',
    handler: (request, h) => handler.getCommentsByPostId(request, h),
    options: {
      auth: 'jwt',
    },
  },
];

module.exports = routes;
