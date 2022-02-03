const router = require('express').Router();
const usersService = require('../services/store/users.service');
const upload = require('../services/multer');
const path = require('path');

module.exports = router;

router.get('/', async (req, res) => {
    try {
        res.status(200).json(await usersService.getAllUsers());
    } catch (err) {
        res.send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        res.status(200).json(await usersService.getUserById(req.params.id));
    } catch (err) {
        res.send(err);
    }
});

router.get('/:id/posts', async (req, res) => {
    try {
        res.status(200).json(await usersService.getUserPosts(req.params.id));
    } catch (err) {
        res.send(err);
    }
});

router.get('/:id/avatar', async (req, res) => {
    try {
        const userAvatar = await usersService.getUserAvatar(req.params.id);

        res.status(200).sendFile(`${userAvatar[0].avatar}`, {root: path.dirname('')});
    } catch (err) {
        res.send('File not found');
    }
});

router.post('/:id/avatar', upload.single('avatar'), async (req, res) => {
    try {
        if (req.file) {
            await usersService.uploadUserAvatar(req.params.id, req.file.path);
            res.status(200).send('Avatar was successfully uploaded');
        }
        else {
            res.send('File cannot be loaded');
        }
    } catch (err) {
        res.send(err);
    }
});

router.post('/', async (req, res) => {
    try {
        await usersService.createNewUser(req.body);
        res.status(200).send('New user has been successfully created');
    } catch (err) {
        res.send(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        await usersService.updateUser(req.params.id, req.body);
        res.status(200).send('User was successfully updated');
    } catch (err) {
        res.send(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await usersService.deleteUser(req.params.id);
        res.status(200).send('User was successfully deleted');
    } catch (err) {
        res.send(err);
    }
});