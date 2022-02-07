const router = require('express').Router();
const postsService = require('../services/store/posts.service');

module.exports = router;

router.get('/', async (req, res) => {
    try {
        res.status(200).json(await postsService.getAllPosts());
    } catch (err) {
        res.send(err);
    }
});

router.get('/:id/comments', async (req, res) => {
    try {
        res.status(200).json(await postsService.getPostComments(req.params.id));
    } catch (err) {
        res.send(err);
    }
});

router.get('/:id/likes', async (req, res) => {
    try {
        res.status(200).json(await postsService.getPostLikes(req.params.id));
    } catch (err) {
        res.send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        res.status(200).json(await postsService.getPostById(req.params.id));
    } catch (err) {
        res.send(err);
    }
});

router.post('/', async (req, res) => {
    try {
        await postsService.createNewPost(req.body);
        res.status(200).send('New post has been successfully created');
    } catch (err) {
        res.send(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        await postsService.updatePostById(req.params.id, req.body);
        res.status(200).send('Post was successfully updated');
    } catch (err) {
        res.send(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await postsService.deletePostById(req.params.id);
        res.status(200).send('Post was successfully deleted');
    } catch (err) {
        res.send(err);
    }
});