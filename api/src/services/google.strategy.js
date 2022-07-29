const passport = require('passport');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const { createNewUser, getUserByEmail } = require('../services/store/users.service');
const config = require('../configs/config');

module.exports = () => {
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: config.googleClientId,
        clientSecret: config.clientSecret,
      },
      //  Passport verify callback
      async (accessToken, refreshToken, profile, done) => {
        const [{ value: email }] = profile.emails;
        let user = await getUserByEmail(email);
        if (!user) {
          await createNewUser({
            firstName: profile.name.givenName,
            secondName: profile.name.familyName,
            email,
          });
          user = await getUserByEmail(email);
        }
        return done(null, {
          userId: user.userId,
          firstName: user.firstName,
          secondName: user.secondName,
          email: user.email,
        });
      },
    ),
  );
};
