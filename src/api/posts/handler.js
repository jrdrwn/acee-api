class PostsHandler {
  constructor(service) {
    this._service = service;
  }

  async postPostHandler(request, h) {
    const { title, status, caption, imageUrl } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const postId = await this._service.addPost({
      owner: credentialId,
      title,
      status,
      caption,
      imageUrl,
    });
    const response = h.response({
      status: 'success',
      message: 'Postingan berhasil ditambahkan',
      data: {
        postId,
      },
    });
    response.code(201);
    return response;
  }

  async getPostsHandler(request) {
    const { limit, offset } = request.query;
    const posts = await this._service.getPosts({ limit, offset });
    return posts;
  }

  async getPostByIdHandler(request) {
    const { postId } = request.params;
    const post = await this._service.getPostById(postId);
    return post;
  }

  async deletePostByIdHandler(request, h) {
    const { postId } = request.params;

    await this._service.deletePostById(postId);
    const response = h.response({
      status: 'success',
      message: 'Postingan berhasil dihapus',
    });
    response.code(201);
    return response;
  }
}

module.exports = PostsHandler;
