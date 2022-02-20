const router = require('express').Router();
const passport = require('passport');
const auth = require('../services/auth');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const UnauthorizedException = require('../exceptions/UnauthorizedException');
const ForbiddenException = require('../exceptions/ForbiddenException');

module.exports = router;

router.post(
  '/login',
  asyncErrorHandler(async (req, res) => {
    const { accessToken, refreshToken } = await auth.authorize(
      req.body.email,
      req.body.password
    );
    if (accessToken) {
      return res.send({
        accessToken,
        refreshToken,
        success: true,
      });
    }
    throw UnauthorizedException;
  })
);

router.post(
  '/refresh',
  asyncErrorHandler(async (req, res) => {
    const { accessToken, refreshToken } = await auth.refresh(req.body.refreshToken);
    if (accessToken) {
      return res.send({
        accessToken: accessToken,
        refreshToken: refreshToken,
        success: true,
      });
    }
    throw ForbiddenException;
  })
);

router.post(
  '/logout',
  asyncErrorHandler(async (req, res) => {
    await auth.logout(req.body.refreshToken);
    return res.send({
      success: true,
    });
  })
);

router.post(
  '/google',
  passport.authenticate('google-token', { session: false }),
  asyncErrorHandler(async (req, res) => {
    const { accessToken, refreshToken } = await auth.authorizeById(req.user.userId);
    if (accessToken) {
      return res.send({
        accessToken: accessToken,
        refreshToken: refreshToken,
        success: true,
      });
    }
    throw UnauthorizedException;
  })
);
