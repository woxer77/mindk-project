const db = require('../db');

module.exports = {
  getByToken: (token) => db.select().first().from('sessions').where('token', token),
  createSession: (session) => db.insert(session).into('sessions'),
  deleteByToken: (token) => db.select().from('sessions').where('token', token).del(),
  deleteTokensByUserId: (userId) => db.select().from('sessions').where('userId', userId).del(),
};
