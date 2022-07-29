const config = require('../configs/config');

module.exports = require('knex')({
  client: 'pg',
  connection: {
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbDatabase,
  },
});
