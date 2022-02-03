const db = require('../db');

module.exports = {
    getAllComments: async () => db.select().from('comments').orderBy('commentId'),
    getCommentById: async (id) => db.select().from('comments').where('commentId', id),
    createNewComment: async (body) => db.insert(body).into('comments'),
    updateCommentById: async (id, body) => db.select().from('comments').where('commentId', id).update(body),
    deleteCommentById: async (id) => db.select().from('comments').where('commentId', id).del(),
};