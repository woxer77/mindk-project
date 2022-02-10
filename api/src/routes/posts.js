const router = require('express').Router();
const postsService = require('../services/store/posts.service');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');

module.exports = router;

router.get('/', asyncErrorHandler(async (req, res) => {
  res.status(200).json(await postsService.getAllPosts());
}));

router.get('/:id/comments', asyncErrorHandler(async (req, res) => {
  res.status(200).json(await postsService.getPostComments(req.params.id));
}));

router.get('/:id/likes', asyncErrorHandler(async (req, res) => {
  res.status(200).json(await postsService.getPostLikes(req.params.id));
}));

router.get('/:id', asyncErrorHandler(async (req, res) => {
  res.status(200).json(await postsService.getPostById(req.params.id));
}));

router.post('/', asyncErrorHandler(async (req, res) => {
  await postsService.createNewPost(req.body);
  res.status(200).send('New post has been successfully created');
}));

router.put('/:id', asyncErrorHandler(async (req, res) => {
  await postsService.updatePostById(req.params.id, req.body);
  res.status(200).send('Post was successfully updated');
}));

router.delete('/:id', asyncErrorHandler(async (req, res) => {
  await postsService.deletePostById(req.params.id);
  res.status(200).send('Post was successfully deleted');
}));