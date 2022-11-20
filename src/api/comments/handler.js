class CommentsHandler {
  constructor(service) {
    this._service = service;
  }

  async postCommentHandler(request, h) {
    const { postId, text } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const commentId = await this._service.addComment({
      postId,
      userId: credentialId,
      text,
    });
    const response = h.response({
      status: 'success',
      message: 'Comment berhasil ditambahkan',
      data: {
        commentId,
      },
    });
    response.code(201);
    return response;
  }

  async getCommentByIdHandler(request) {
    const { commentId } = request.params;
    const comment = await this._service.getCommentById(commentId);
    return comment;
  }

  async getCommentsByPostId(request) {
    const { postId } = request.params;
    const { limit, offset } = request.query;
    const comments = await this._service.getComments(postId, { limit, offset });
    return comments;
  }
}

module.exports = CommentsHandler;
