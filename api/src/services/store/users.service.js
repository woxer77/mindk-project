const db = require('../db');

module.exports = {
    getAllUsers: async () => db.select().from('users').orderBy('userId'),
    getUserById: async (id) => db.select().from('users').where('userId', id),
    getUserPosts: async (id) => db.select().from('posts').where('creatorId', id),
    getUserAvatar: async (id) => db.select('avatar').from('users').where('userId', id),
    uploadUserAvatar: async (id, filepath) => db.update('avatar', filepath).from('users').where('userId', id),
    createNewUser: async (body) => db.insert(body).into('users'),
    updateUser: async (id, body) => db.select().from('users').where('userId', id).update(body),
    deleteUser: async (id) => db.select().from('users').where('userId', id).del(),
};