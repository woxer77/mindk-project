module.exports = (options) => {
  const { db, dbTableName } = options;

  return (req, res, next) => {
    db.insert({
      method: req.method,
      path: req.url
    })
      .into(dbTableName)
      .then(() => {
        next();
      });
  };
};