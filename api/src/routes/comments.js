const router = require('express').Router();
const db = require('../services/db');

module.exports = router;

router.get('/', async (req, res) => {
    try {
        const comment = await db.select().from('Comments').orderBy('CommentID');

        res.status(200).json(comment);
    } catch (err) {
        res.send(err);
    }
});

router.get('/:PostID', async (req, res) => {
    try {
        const reqPostID = req.params.PostID;
        const allCommentsToPost = await db.select().from('Comments').where('PostID', reqPostID);

        res.status(200).json(allCommentsToPost);
    } catch (err) {
        res.send(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const reqBody = req.body;
        db.insert(reqBody).into('Comments');
        res.status(200).send('New comment has been successfully created');
    } catch (err) {
        res.send(err);
    }
});

router.put('/:CommentID', async (req, res) => {
    try {
        const reqCommentID = req.params.CommentID;
        const reqBody = req.body;
        await db.select().from('Comments').where('CommentID', reqCommentID).update(reqBody);
        res.status(200).send('Comment was successfully updated');
    } catch (err) {
        res.send(err);
    }
});

router.delete('/:CommentID', async (req, res) => {
    try {
        const reqCommentID = req.params.CommentID;
        await db.select().from('Comments').where('CommentID', reqCommentID).del();
        res.status(200).send('Comment was successfully deleted');
    } catch (err) {
        res.send(err);
    }
});