const router = require('express').Router();
const usersService = require('../services/store/users.service');
const upload = require('../services/multer');
const path = require('path');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');

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

router.post('/:id/avatar', upload.single('avatar'), asyncErrorHandler(async (req, res) => {
  if (req.file) {
    await usersService.uploadUserAvatar(req.params.id, req.file.path);
    res.status(200).send('Avatar was successfully uploaded');
  }
  else {
    res.send('File cannot be loaded');
  }
}));

router.post('/', asyncErrorHandler(async (req, res) => {
  await usersService.createNewUser(req.body);
  res.status(200).send('New user has been successfully created');
}));

router.put('/:id', upload.single('avatar'), asyncErrorHandler(async (req, res) => {
  req.body.avatar = req.file.path;
  await usersService.updateUser(req.params.id, req.body);
  res.status(200).send('User was successfully updated');
}));

router.delete('/:id', asyncErrorHandler(async (req, res) => {
  await usersService.deleteUser(req.params.id);
  res.status(200).send('User was successfully deleted');
}));