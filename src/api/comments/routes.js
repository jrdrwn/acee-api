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
    path: '/posts/comment/{postId}',
    handler: (request, h) => handler.getCommentsHandler(request, h),
    options: {
      auth: 'jwt',
    },
  },
];

module.exports = routes;
