const db = require('../db');

module.exports = {
  getAllPosts: async () => db.select().from('posts').orderBy('postId'),
  getPostComments: async (id) => db.select().from('comments').where('postId', id),
  getPostLikes: async (id) => db.select().from('likedUser-post').where('postId', id),
  getPostById: async (id) => db.select().first().from('posts').where('postId', id),
  getPostImage: async (id) => db.select('image').first().from('posts').where('postId', id),
  createNewPost: async (body) => db.insert(body).into('posts'),
  updatePostById: async (id, body) => db.select().from('posts').where('postId', id).update(body),
  deletePostById: async (id) => db.select().from('posts').where('postId', id).del(),
};