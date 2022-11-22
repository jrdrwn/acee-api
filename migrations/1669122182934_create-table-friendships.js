/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('friendships', {
    id: { type: 'VARCHAR(30)', primaryKey: true },
    from_user: {
      type: 'VARCHAR(50)',
    },
    to_user: {
      type: 'VARCHAR(50)',
    },
    type: {
      type: 'VARCHAR(10)',
      notNull: true,
    },
  });

  pgm.addConstraint(
    'friendships',
    'fk_friendships.from.users_id',
    'FOREIGN KEY(from_user) REFERENCES users(id) ON DELETE CASCADE'
  );
  pgm.addConstraint(
    'friendships',
    'fk_friendships.to.users_id',
    'FOREIGN KEY(to_user) REFERENCES users(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  pgm.dropTable('friendships');
  pgm.dropConstraint('friendships', 'fk_friendships.from.users_id');
  pgm.dropConstraint('friendships', 'fk_friendships.to.users_id');
};
