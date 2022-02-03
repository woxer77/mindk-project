const db = require('../db');

module.exports = {
    getAllLikes: async () => db.select().from('likedUser-post'),
    getLikesByUserIdPostId: async (userId, postId) => db.select().from('likedUser-post').where({
        userId: userId,
        postId: postId
    }),
    createNewLike: async (body) => db.insert(body).into('likedUser-post'),
    updateLikeUserIdPostId: async (userId, postId, body) => db.select().from('likedUser-post').where({
        userId: userId,
        postId: postId
    }).update(body),
    deleteLikeUserIdPostId: async (userId, postId) => db.select().from('likedUser-post').where({
        userId: userId,
        postId: postId
    }).del(),
};