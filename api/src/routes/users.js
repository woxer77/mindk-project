const router = require('express').Router();
const usersService = require('../services/store/users.service');
const upload = require('../services/multer');
const path = require('path');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const authMiddleware = require('../middlewares/authMiddleware');
const aclMiddleware = require('../middlewares/aclMiddleware');
const validateMiddleware = require('../middlewares/validateMiddleware');
const { userUpdate } = require('../configs/acl_config');

module.exports = router;

router.get('/', asyncErrorHandler(async (req, res) => {
  res.status(200).json(await usersService.getAllUsers());
}));

router.get('/:id', asyncErrorHandler(async (req, res) => {
  res.status(200).json(await usersService.getUserById(req.params.id));
}));

router.get('/:id/posts', asyncErrorHandler(async (req, res) => {
  res.status(200).json(await usersService.getUserPosts(req.params.id));
}));

router.get('/:id/avatar', asyncErrorHandler(async (req, res) => {
  const userAvatar = await usersService.getUserAvatar(req.params.id);
  res.status(200).sendFile(`${userAvatar[0].avatar}`, {root: path.dirname('')});
}));

router.post('/:id/avatar', authMiddleware, upload.single('avatar'), asyncErrorHandler(async (req, res) => {
  if (req.file) {
    await usersService.uploadUserAvatar(req.params.id, req.file.path);
    res.status(200).send('Avatar was successfully uploaded');
  }
  else {
    res.send('File cannot be loaded');
  }
}));

router.post('/',
  authMiddleware,
  validateMiddleware({
    firstName: {
      isRequired: true,
      minLength: 2,
      maxLength: 32,
      regex: /^[A-Za-z ]*$/,
    },
    secondName: {
      isRequired: true,
      minLength: 2,
      maxLength: 64,
      regex: /^[A-Za-z ]*$/,
    },
    email: {
      isRequired: true,
      isUnique: true,
      minLength: 6,
      maxLength: 128,
      email: true,
    },
    phone: {
      isRequired: true,
      isUnique: true,
      regex: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
    },
  },
  {
    email: {
      tableName: 'users',
      fieldName: 'email',
      id: 'userId',
    },
    phone: {
      tableName: 'users',
      fieldName: 'phone',
      id: 'userId',
    },
  }),
  asyncErrorHandler(async (req, res) => {
    await usersService.createNewUser(req.body);
    res.status(200).send('New user has been successfully created');
  }));

router.put('/:id',
  authMiddleware,
  aclMiddleware(userUpdate),
  validateMiddleware({
    firstName: {
      isRequired: true,
      minLength: 2,
      maxLength: 32,
      regex: /^[A-Za-z ]*$/,
    },
    secondName: {
      isRequired: true,
      minLength: 2,
      maxLength: 64,
      regex: /^[A-Za-z ]*$/,
    },
    email: {
      isRequired: true,
      isUnique: true,
      minLength: 6,
      maxLength: 128,
      email: true,
    },
    phone: {
      isRequired: true,
      isUnique: true,
      regex: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
    },
  },
  {
    email: {
      tableName: 'users',
      fieldName: 'email',
      id: 'userId',
    },
    phone: {
      tableName: 'users',
      fieldName: 'phone',
      id: 'userId',
    },
  }),
  upload.single('avatar'),
  asyncErrorHandler(async (req, res) => {
    if (req.hasOwnProperty('file')) req.body.avatar = req.file.path;
    await usersService.updateUser(req.params.id, req.body);
    res.status(200).send('User was successfully updated');
  }));

router.delete('/:id', authMiddleware, asyncErrorHandler(async (req, res) => {
  await usersService.deleteUser(req.params.id);
  res.status(200).send('User was successfully deleted');
}));
