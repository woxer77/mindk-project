const router = require('express').Router();
const upload = require('../services/multer');
const postsService = require('../services/store/posts.service');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const authMiddleware = require('../middlewares/authMiddleware');
const aclMiddleware = require('../middlewares/aclMiddleware');
const validateMiddleware = require('../middlewares/validateMiddleware');
const path = require('path');
const { postUpdate, postDelete} = require('../configs/acl_config');

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

router.get('/:id/image', asyncErrorHandler(async (req, res) => {
  const postImage = await postsService.getPostImage(req.params.id);
  res.status(200).sendFile(`${postImage[0].image}`, {root: path.dirname('')});
}));

router.post('/',
  authMiddleware,
  validateMiddleware({
    text: {
      isRequired: true,
      minLength: 2,
      maxLength: 2048
    },
    availability: {
      isRequired: true,
      regex: /(for all|for friends|for me)/gm
    },
    creationDate: {
      isRequired: true,
    },
    creationTime: {
      isRequired: true,
    },
    creatorId: {
      isRequired: true,
    },
  }),
  upload.single('image'),
  asyncErrorHandler(async (req, res) => {
    if (req.hasOwnProperty('file')) req.body.image = req.file.path;
    await postsService.createNewPost(req.body);
    res.status(200).send('New post has been successfully created');
  }));

router.put('/:id',
  authMiddleware,
  aclMiddleware(postUpdate),
  validateMiddleware({
    text: {
      isRequired: true,
      minLength: 2,
      maxLength: 2048
    },
    availability: {
      isRequired: true,
      regex: /(for all|for friends|for me)/gm
    },
    creationDate: {
      isRequired: true,
    },
    creationTime: {
      isRequired: true,
    },
    creatorId: {
      isRequired: true,
    },
  }),
  upload.single('image'),
  asyncErrorHandler(async (req, res) => {
    if (req.hasOwnProperty('file')) req.body.image = req.file.path;
    await postsService.updatePostById(req.params.id, req.body);
    res.status(200).send('Post was successfully updated');
  }));

router.delete('/:id',
  authMiddleware,
  aclMiddleware(postDelete),
  asyncErrorHandler(async (req, res) => {
    await postsService.deletePostById(req.params.id);
    res.status(200).send('Post was successfully deleted');
  }));
