const usersService = require('../services/store/users.service');
const postsService = require('../services/store/posts.service');

const Action = {
  READ: 'read',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
};

const Possession = {
  ANY: 'any',
  OWN: 'own',
};

const Resources = {
  POST: 'post',
  USER: 'user',
};

const Roles = {
  ADMIN: 'admin',
  USER: 'user',
};

const allowAny = [
  {
    action: Action.CREATE,
    possession: Possession.ANY,
  },
  {
    action: Action.READ,
    possession: Possession.ANY,
  },
  {
    action: Action.UPDATE,
    possession: Possession.ANY,
  },
  {
    action: Action.DELETE,
    possession: Possession.ANY,
  },
];

const allowOwn = [
  {
    action: Action.CREATE,
    possession: Possession.ANY,
  },
  {
    action: Action.READ,
    possession: Possession.ANY,
  },
  {
    action: Action.UPDATE,
    possession: Possession.OWN,
  },
];

const aclRules = {
  [Roles.ADMIN]: {
    [Resources.USER]: allowAny,
    [Resources.POST]: allowAny,
  },
  [Roles.USER]: {
    [Resources.USER]: allowOwn,
    [Resources.POST]: allowOwn,
  },
};

const postUpdate = [
  {
    resource: 'post',
    action: 'update',
    possession: 'own',
    getResource: (req) => postsService.getPostById(req.params.id),
    isOwn: (resource, userId) => resource.creatorId === userId,
  },
];

const postDelete = [
  {
    resource: 'post',
    action: 'delete',
    possession: 'own',
    getResource: (req) => postsService.getPostById(req.params.id),
    isOwn: (resource, userId) => resource.creatorId === userId,
  },
];

const userUpdate = [
  {
    resource: 'user',
    action: 'update',
    possession: 'own',
    getResource: (req) => usersService.getUserById(req.params.id),
    isOwn: (resource, userId) => resource.userId === userId,
  },
];

module.exports = {
  Action,
  Possession,
  Resources,
  Roles,
  allowAny,
  allowOwn,
  aclRules,
  postUpdate,
  userUpdate,
  postDelete,
};
