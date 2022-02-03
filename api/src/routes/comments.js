const router = require('express').Router();
const commentsService = require('../services/store/comments.service');

module.exports = router;

router.get('/', async (req, res) => {
    try {
        res.status(200).json(await commentsService.getAllComments());
    } catch (err) {
        res.send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        res.status(200).json(await commentsService.getCommentById(req.params.id));
    } catch (err) {
        res.send(err);
    }
});

router.post('/', async (req, res) => {
    try {
        await commentsService.createNewComment(req.body);
        console.log(req.body);
        res.status(200).send('New comment has been successfully created');
    } catch (err) {
        res.send(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        await commentsService.updateCommentById(req.params.id, req.body);
        res.status(200).send('Comment was successfully updated');
    } catch (err) {
        res.send(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await commentsService.deleteCommentById(req.params.id);
        res.status(200).send('Comment was successfully deleted');
    } catch (err) {
        res.send(err);
    }
});