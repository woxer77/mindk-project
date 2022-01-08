const router = require('express').Router();
const db = require('../services/db');

module.exports = router;

router.get('/', async (req, res) => {
    try {
        const likedUserPost = await db.select().from('LikedUser-Post');

        res.status(200).json(likedUserPost);
    } catch (err) {
        res.send(err);
    }
});

router.get('/:UserID/:PostID', async (req, res) => {
    try {
        const reqUserID = req.params.UserID;
        const reqPostID = req.params.PostID;
        const like = await db.select().from('LikedUser-Post').where({
            UserID: reqUserID,
            PostID: reqPostID
        });

        res.status(200).json(like);
    } catch (err) {
        res.send(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const reqBody = req.body;

        db.insert(reqBody).into('LikedUser-Post');
        res.status(200).send('New like has been successfully created');
    } catch (err) {
        res.send(err);
    }
});

router.put('/:UserID/:PostID', async (req, res) => {
    try {
        const reqUserID = req.params.UserID;
        const reqPostID = req.params.PostID;
        const reqBody = req.body;

        await db.select().from('LikedUser-Post').where({
            UserID: reqUserID,
            PostID: reqPostID
        }).update(reqBody);
        res.status(200).send('Like was successfully updated');
    } catch (err) {
        res.send(err);
    }
});

router.delete('/:UserID/:PostID', async (req, res) => {
    try {
        const reqUserID = req.params.UserID;
        const reqPostID = req.params.PostID;

        await db.select().from('LikedUser-Post').where({
            UserID: reqUserID,
            PostID: reqPostID
        }).del();
        res.status(200).send('User was successfully deleted');
    } catch (err) {
        res.send(err);
    }
});