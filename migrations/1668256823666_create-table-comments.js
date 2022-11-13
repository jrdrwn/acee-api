/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('comments', {
    id: {
      type: 'VARCHAR(25)',
      primaryKey: true,
    },
    post_id: {
      type: 'VARCHAR(21)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    text: {
      type: 'text',
      notNull: true,
    },
    inserted_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
  });

  pgm.addConstraint(
    'comments',
    'fk_comments.post_id',
    'FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE'
  );

  pgm.addConstraint(
    'comments',
    'fk_comments.user_id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropTable('comments');
  pgm.dropConstraint('comments', 'fk_comments.post_id');
  pgm.dropConstraint('comments', 'fk_comments.user_id');
};
