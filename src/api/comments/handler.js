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

  async getCommentByIdHandler(request, h) {
    const { commentId } = request.params;
    const comment = await this._service.getCommentById(commentId);
    const response = h.response({
      status: 'success',
      message: 'Comment berhasil diambil',
      data: {
        comment,
      },
    });
    return response;
  }

  async getCommentsHandler(request, h) {
    const { postId } = request.params;
    const comments = await this._service.getComments(postId);
    const response = h.response({
      status: 'success',
      message: 'Comments berhasil diambil',
      data: {
        comments,
      },
    });
    return response;
  }
}

module.exports = CommentsHandler;
