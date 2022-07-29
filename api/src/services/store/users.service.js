const db = require('../db');
const passwordHasher = require('../passwordHasher');
const config = require('../../configs/config');

module.exports = {
  getAllUsers: async () => db.select().from('users').orderBy('userId'),
  getUserById: async (id) => db.select().first().from('users').where('userId', id),
  getUserByEmail: async (email) => db.select().first().from('users').where('email', email),
  getUserPosts: async (id) => db.select().from('posts').where('creatorId', id),
  getUserAvatar: async (id) => db.select('avatar').from('users').where('userId', id),
  uploadUserAvatar: async (id, filepath) => db.update('avatar', filepath).from('users').where('userId', id),
  createNewUser: async (body) => {
    if (body.password) body.password = passwordHasher(body.password, config.salt);
    return db.insert(body).into('users');
  },
  updateUser: async (id, body) => db.select().from('users').where('userId', id).update(body),
  deleteUser: async (id) => db.select().from('users').where('userId', id).del(),
  checkPassword: (plainPassword, hash) => hash === passwordHasher(plainPassword, config.salt),
};
