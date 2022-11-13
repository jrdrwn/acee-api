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

  async getPostsHandler(request, h) {
    const posts = await this._service.getPosts();
    const response = h.response({
      status: 'success',
      message: 'Postingan berhasil diambil',
      data: {
        posts,
      },
    });
    return response;
  }

  async getPostByIdHandler(request, h) {
    const { postId } = request.params;
    const post = await this._service.getPostById(postId);
    const response = h.response({
      status: 'success',
      message: 'Postingan berhasil diambil',
      data: {
        post,
      },
    });
    return response;
  }
}

module.exports = PostsHandler;
