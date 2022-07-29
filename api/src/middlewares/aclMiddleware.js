const ForbiddenException = require('../exceptions/ForbiddenException');
const usersService = require('../services/store/users.service');
const { aclRules, Possession} = require('../configs/acl_config');

module.exports = (rule) => async (req, res, next) => {
  const rules = Array.isArray(rule) ? rule : [rule];
  let isAllow = false;

  const user = await usersService.getUserById(req.auth.userId);
  if (user) {
    for await (const checkRule of rules) {
      if (aclRules[user.role] && aclRules[user.role][checkRule.resource]) {
        for await (const permission of aclRules[user.role][
          checkRule.resource
        ]) {
          const canUseAnyAction =
            permission.possession === Possession.ANY &&
            permission.action === checkRule.action;

          if (checkRule.possession === Possession.ANY) {
            if (canUseAnyAction) {
              isAllow = true;
            }
          } else {
            if (canUseAnyAction) {
              isAllow = true;
            } else {
              const resource = await checkRule.getResource(req);
              if (checkRule.isOwn(resource, user.userId)) {
                isAllow = true;
              }
            }
          }
        }
      }
    }
  }

  if (isAllow) {
    return next();
  }

  next(new ForbiddenException());
};
