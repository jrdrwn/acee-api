const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const { pg } = require('../../utils/config');

class PostsService {
  constructor() {
    this._pool = new Pool({ connectionString: pg.uri });
  }

  async addPost({ owner, title, status, caption, imageUrl }) {
    const id = `post-${nanoid(16)}`;
    const insertedAt = new Date().toISOString();
    const query = {
      text: 'INSERT INTO posts VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [id, owner, title, status, caption, imageUrl, insertedAt, insertedAt],
    };

    const result = await this._pool.query(query);

    return result.rows[0].id;
  }

  async getPosts() {
    const query = {
      text: `SELECT posts.*, COUNT(comments.*) as comment_count, users.fullname, users.photo FROM posts
             LEFT OUTER JOIN comments ON comments.post_id = posts.id
             LEFT OUTER JOIN users ON users.id = posts.owner
             GROUP BY (posts.id, users.fullname, users.photo)`,
    };
    const result = await this._pool.query(query);

    return result.rows;
  }

  async getPostById(id) {
    const query = {
      text: `SELECT posts.*, COUNT(comments.*) as comment_count, users.fullname, users.photo FROM posts
             LEFT OUTER JOIN comments ON comments.post_id = posts.id
             LEFT OUTER JOIN users ON users.id = posts.owner
             WHERE posts.id = $1
             GROUP BY (posts.id, users.fullname, users.photo)`,
      values: [id],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }
}

module.exports = PostsService;

module.exports = PostsService;