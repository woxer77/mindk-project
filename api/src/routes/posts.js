const router = require('express').Router();
const db = require('../services/db');

module.exports = router;

router.get('/', async (req, res) => {
    try {
        const posts = await db.select().from('Posts').orderBy('PostID');

        res.status(200).json(posts);
    } catch (err) {
        res.send(err);
    }
});

router.get('/for_all', async (req, res) => {
    try {
        const postsForAll = await db.select().from('Posts').where('Availability', 'for all').orderBy('PostID');

        res.status(200).json(postsForAll);
    } catch (err) {
        res.send(err);
    }
});

router.get('/:PostID', async (req, res) => {
    try {
        const reqPostID = req.params.PostID;
        const post = await db.select().from('Posts').where('PostID', reqPostID);

        res.status(200).json(post);
    } catch (err) {
        res.send(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const reqBody = req.body;
        db.insert(reqBody).into('Posts');
        res.status(200).send('New post has been successfully created');
    } catch (err) {
        res.send(err);
    }
});

router.put('/:PostID', async (req, res) => {
    try {
        const reqPostID = req.params.PostID;
        const reqBody = req.body;
        await db.select().from('Posts').where('PostID', reqPostID).update(reqBody);
        res.status(200).send('User was successfully updated');
    } catch (err) {
        res.send(err);
    }
});

router.delete('/:PostID', async (req, res) => {
    try {
        const reqPostID = req.params.PostID;
        await db.select().from('Posts').where('PostID', reqPostID).del();
        res.status(200).send('User was successfully deleted');
    } catch (err) {
        res.send(err);
    }
});