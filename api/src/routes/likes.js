const router = require('express').Router();
const likesService = require('../services/store/likes.service');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');

module.exports = router;

router.get('/', asyncErrorHandler(async (req, res) => {
  res.status(200).json(await likesService.getAllLikes());
}));

router.get('/:userId/:postId', asyncErrorHandler(async (req, res) => {
  res.status(200).json(await likesService.getLikesByUserIdPostId(req.params.userId, req.params.postId));
}));

router.post('/', asyncErrorHandler(async (req, res) => {
  await likesService.createNewLike(req.body);
  res.status(200).send('New like has been successfully created');
}));

router.put('/:userId/:postId', asyncErrorHandler(async (req, res) => {
  await likesService.updateLikeUserIdPostId(req.params.userId, req.params.postId, req.body);
  res.status(200).send('Like was successfully updated');
}));

router.delete('/:userId/:postId', asyncErrorHandler(async (req, res) => {
  await likesService.deleteLikeUserIdPostId(req.params.userId, req.params.postId);
  res.status(200).send('User was successfully deleted');
}));