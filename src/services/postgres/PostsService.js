const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { pg } = require('../../utils/config');

class PostsService {
  constructor() {
    this._pool = new Pool({
      connectionString: pg.uri,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async addPost({ owner, title, status, caption, imageUrl }) {
    const id = `post-${nanoid(16)}`;
    const insertedAt = new Date().toISOString();
    const query = {
      text: 'INSERT INTO posts VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [id, owner, title, status, caption, imageUrl, insertedAt, insertedAt],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('Postingan gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async getPosts({ limit, offset, userId }) {
    let query = {
      text: `SELECT posts.*, COUNT(comments.*) as comment_count, users.fullname, users.username, users.photo FROM posts
             LEFT OUTER JOIN comments ON comments.post_id = posts.id
             LEFT OUTER JOIN users ON users.id = posts.owner
             GROUP BY (posts.id, users.fullname, users.username, users.photo)
             ORDER BY posts.inserted_at DESC LIMIT $1 OFFSET $2
             `,
      values: [limit, offset],
    };
    if (userId) {
      query = {
        text: `SELECT posts.*, COUNT(comments.*) as comment_count, users.fullname, users.username, users.photo FROM posts
               LEFT OUTER JOIN comments ON comments.post_id = posts.id
               LEFT OUTER JOIN users ON users.id = posts.owner
               WHERE posts.owner = $3
               GROUP BY (posts.id, users.fullname, users.username, users.photo)
               ORDER BY posts.inserted_at DESC LIMIT $1 OFFSET $2
             `,
        values: [limit, offset, userId],
      };
    }
    const result = await this._pool.query(query);

    return result.rows;
  }

  async getPostById(id) {
    const query = {
      text: `SELECT posts.*, COUNT(comments.*) as comment_count, users.fullname, users.username, users.photo FROM posts
             LEFT OUTER JOIN comments ON comments.post_id = posts.id
             LEFT OUTER JOIN users ON users.id = posts.owner
             WHERE posts.id = $1
             GROUP BY (posts.id, users.fullname, users.username, users.photo)`,
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Postingan tidak ditemukan');
    }
    return result.rows[0];
  }

  async deletePostById(id) {
    const query = {
      text: 'DELETE FROM posts WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Gagal menghapus postingan. Id tidak ditemukan');
    }
  }
}

module.exports = PostsService;
