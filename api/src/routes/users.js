const router = require('express').Router();
const db = require('../services/db');

module.exports = router;

router.get('/', async (req, res) => {
    try {
        const users = await db.select().from('Users').orderBy('UserID');

        res.status(200).json(users);
    } catch (err) {
        res.send(err);
    }
});

router.get('/:UserID', async (req, res) => {
    try {
        const reqUserID = req.params.UserID;
        const user = await db.select().from('Users').where('UserID', reqUserID);

        res.status(200).json(user);
    } catch (err) {
        res.send(err);
    }
});

router.get('/:UserID/posts', async (req, res) => {
    try {
        const reqUserID = req.params.UserID;
        const user = await db.select().from('Posts').where('CreatorID', reqUserID);

        res.status(200).json(user);
    } catch (err) {
        res.send(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const reqBody = req.body;
        db.insert(reqBody).into('Users');
        res.status(200).send('New user has been successfully created');
    } catch (err) {
        res.send(err);
    }
});

router.put('/:UserID', async (req, res) => {
    try {
        const reqUserID = req.params.UserID;
        const reqBody = req.body;
        await db.select().from('Users').where('UserID', reqUserID).update(reqBody);
        res.status(200).send('User was successfully updated');
    } catch (err) {
        res.send(err);
    }
});

router.delete('/:UserID', async (req, res) => {
    try {
        const reqUserID = req.params.UserID;
        await db.select().from('Users').where('UserID', reqUserID).del();
        res.status(200).send('User was successfully deleted');
    } catch (err) {
        res.send(err);
    }
});