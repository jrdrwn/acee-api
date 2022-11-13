/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('posts', {
    id: {
      type: 'VARCHAR(21)',
      primaryKey: true,
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    title: {
      type: 'text',
    },
    status: {
      type: 'text',
    },
    caption: {
      type: 'TEXT',
      notNull: true,
    },
    image_url: {
      type: 'TEXT',
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
    'posts',
    'fk_posts.owner',
    'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropTable('posts');
  pgm.dropConstraint('posts', 'fk_posts.owner');
};
