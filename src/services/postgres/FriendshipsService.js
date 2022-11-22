const { nanoid } = require('nanoid');
const { Pool } = require('pg');

class FriendshipsService {
  constructor() {
    this._pool = new Pool();
  }

  async addFriendship({ from, to, type }) {
    const id = `friendship-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO friendships VALUES($1, $2, $3, $4)',
      values: [id, from, to, type],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async updateFriendship({ from, to, type }) {
    const query = {
      text: 'UPDATE friendships SET type = $3 WHERE from_user = $1 AND to_user = $2,',
      values: [from, to, type],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getFriendships({ from, to }) {
    const query = {
      text: "SELECT * FROM friendships WHERE from_user = $1 OR to_user = $2 AND type != 'BLOCK'",
      values: [from, to],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getFriendshipsByType({ from, to, type }) {
    const query = {
      text: 'SELECT * FROM friendships WHERE from_user = $1 AND to_user = $2',
      values: [from, to, type],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async deleteFriendship({ from, to }) {
    const query = {
      text: 'DELETE FROM friendships WHERE from_user = $1 AND to_user = $2',
      values: [from, to],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = FriendshipsService;
