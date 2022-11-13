const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const config = require('../../utils/config');

class CommentsService {
  constructor() {
    this._pool = new Pool({
      connectionString: config.pg.uri,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async addComment({ postId, userId, text }) {
    const id = `comment-${nanoid(16)}`;
    const insertedAt = new Date().toISOString();
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, postId, userId, text, insertedAt, insertedAt],
    };

    const result = await this._pool.query(query);
    return result.rows[0].id;
  }

  async getCommentById(commentId) {
    const query = {
      text: `SELECT comments.*, users.fullname, users.photo FROM comments
             LEFT OUTER JOIN users ON users.id  = comments.user_id
             WHERE comments.id = $1`,
      values: [commentId],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getComments(postId) {
    const query = {
      text: `SELECT comments.*, users.fullname, users.photo FROM comments
             LEFT OUTER JOIN users ON users.id = comments.user_id
             WHERE comments.post_id = $1`,
      values: [postId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = CommentsService;
