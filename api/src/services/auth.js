const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { checkPassword, getUserById, getUserByEmail } = require('./store/users.service');
const sessionService = require('./store/session.service');
const { appKey } = require('./config');

module.exports = {
  authorize: async (email, password) => {
    const user = await getUserByEmail(email);
    if (user) {
      if (checkPassword(password, user.password)) {
        const accessToken = jwt.sign({ 
          userId: user.userId,
          firstName: user.firstName
        }, appKey);
        const refreshToken = uuidv4();
        await sessionService.createSession({
          userId: user.userId,
          refreshToken,
        });
        return { accessToken, refreshToken };
      }
    }
    return {};
  },
  refresh: async (refreshToken) => {
    const session = await sessionService.getByToken(refreshToken);
    if (session) {
      const user = await getUserById(session.userId);
      const accessToken = jwt.sign({ 
        userId: user.userId,
        firstName: user.firstName
      }, appKey);
      const refreshToken = uuidv4();
      await sessionService.deleteByToken(session.token);
      await sessionService.createSession({
        userId: session.userId,
        refreshToken,
      });
      return { accessToken, refreshToken };
    }
    return {};
  },
  authorizeById: async (id) => {
    const user = await getUserById(id);
    if (user) {
      const accessToken = jwt.sign({
        userId: user.userId,
        firstName: user.firstName,
        secondName: user.secondName,
      }, appKey);
      const refreshToken = uuidv4();
      await sessionService.createSession({
        userId: user.userId,
        refreshToken,
      });
      return { accessToken, refreshToken };
    }
    return {};
  },
  logout: async (token) => {
    await sessionService.deleteByToken(token);
  },
  getByToken: async (token) => {
    return await sessionService.getByToken(token);
  },
};