const UnprocessableEntityException = require('../exceptions/UnprocessableEntityException');
const db = require('../services/db');

module.exports = (validationRules, params) => async (req, res, next) => {
  const resultErrors = {};

  for await (const field of Object.keys(validationRules)) {
    const fieldErrors = [];
    const rules = validationRules[field];

    for await (const rule of Object.entries(rules)) {
      const [ruleName, ruleParam] = rule;
      switch (ruleName) {
        case 'isRequired':
          if (!req.body[field]) fieldErrors.push('This field must be filled');
          break;
        case 'minLength':
          const minLength = parseInt(ruleParam);
          if (req.body[field] && req.body[field].length < minLength) {
            fieldErrors.push('Minimum string length = ' + minLength);
          }
          break;
        case 'maxLength':
          const maxLength = parseInt(ruleParam);
          if (req.body[field] && req.body[field].length > maxLength) {
            fieldErrors.push('Maximum string length = ' + maxLength);
          }
          break;
        case 'regex':
          if (!req.body[field].match(ruleParam)) {
            fieldErrors.push('Field has incorrect regular expression validation');
          }
          break;
        case 'isUnique':
          let originalResource;
          if (params[field].id) {
            originalResource = await db.select().first().from(params[field].tableName).where(params[field].id, req.params.id);
          }
          const resource = await db.select().first().from(params[field].tableName).where(params[field].fieldName, req.body[field]);
          if (resource && (!originalResource || resource.id !== originalResource.id)) {
            fieldErrors.push('The field must contain a unique value');
          }
          break;
        case 'email':
          const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          if (!regexEmail.test(req.body[field])) {
            fieldErrors.push('The field must contain a valid email');
          }
          break;
      }
    }
    if (fieldErrors.length !== 0) resultErrors[field] = fieldErrors;
  }

  if(Object.keys(resultErrors).length === 0) return next();

  next(new UnprocessableEntityException(resultErrors));
};
