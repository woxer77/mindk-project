const router = require('express').Router();
const commentsService = require('../services/store/comments.service');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');

module.exports = router;

router.get('/', asyncErrorHandler(async (req, res) => {
  res.status(200).json(await commentsService.getAllComments());
}));

router.get('/:id', asyncErrorHandler(async (req, res) => {
  res.status(200).json(await commentsService.getCommentById(req.params.id));
}));

router.post('/', asyncErrorHandler(async (req, res) => {
  await commentsService.createNewComment(req.body);
  console.log(req.body);
  res.status(200).send('New comment has been successfully created');
}));

router.put('/:id', asyncErrorHandler(async (req, res) => {
  await commentsService.updateCommentById(req.params.id, req.body);
  res.status(200).send('Comment was successfully updated');
}));

router.delete('/:id', asyncErrorHandler(async (req, res) => {
  await commentsService.deleteCommentById(req.params.id);
  res.status(200).send('Comment was successfully deleted');
}));