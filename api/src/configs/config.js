module.exports = {
  appPort: process.env.APP_PORT,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbDatabase: process.env.DB_DATABASE,
  logsDbTableName: process.env.LOGS_DB_TABLENAME,
  salt: process.env.SALT,
  appKey: process.env.APP_KEY,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};