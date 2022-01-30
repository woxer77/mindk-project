const router = require('express').Router();
const likesService = require('../services/store/likes.service');

module.exports = router;

router.get('/', async (req, res) => {
    try {
        res.status(200).json(await likesService.getAllLikes());
    } catch (err) {
        res.send(err);
    }
});

router.get('/:userId/:postId', async (req, res) => {
    try {
        res.status(200).json(await likesService.getLikesByUserIdPostId(req.params.userId, req.params.postId));
    } catch (err) {
        res.send(err);
    }
});

router.post('/', async (req, res) => {
    try {
        await likesService.createNewLike(req.body);
        res.status(200).send('New like has been successfully created');
    } catch (err) {
        res.send(err);
    }
});

router.put('/:userId/:postId', async (req, res) => {
    try {
        await likesService.updateLikeUserIdPostId(req.params.userId, req.params.postId, req.body);
        res.status(200).send('Like was successfully updated');
    } catch (err) {
        res.send(err);
    }
});

router.delete('/:userId/:postId', async (req, res) => {
    try {
        await likesService.deleteLikeUserIdPostId(req.params.userId, req.params.postId);
        res.status(200).send('User was successfully deleted');
    } catch (err) {
        res.send(err);
    }
});