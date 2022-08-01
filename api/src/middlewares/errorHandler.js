const UnauthorizedException = require('../exceptions/UnauthorizedException');
const NotFoundException = require('../exceptions/NotFoundException');
const UnprocessableEntityException = require('../exceptions/UnprocessableEntityException');
const ForbiddenException = require('../exceptions/ForbiddenException');

module.exports = (options) => {
  const { db, dbTableName } = options;

  return (error, req, res, next) => {
    db.insert({
      method: req.method,
      path: req.url,
      errorMessage: error.stack,
    })
      .into(dbTableName)
      .then(() => {
        if (error instanceof NotFoundException) return res.status(404).send({ error: error.message });
        else if (error instanceof UnauthorizedException) return res.status(401).send({ error: 'Unauthorized' });
        else if (error instanceof ForbiddenException) return res.status(403).send({ error: 'Forbidden' });
        else if(error instanceof UnprocessableEntityException) return res.status(422).send({ error: error.errors });
        res.send('Something went wrong');
        next();
      });
  };
};
