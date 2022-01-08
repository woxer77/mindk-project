const express = require('express');

const config = require('./services/config');
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const likesRoutes = require('./routes/likes');
const commentsRoutes = require('./routes/comments');

const app = express();
const port = config.appPort;

app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);
app.use('/likes', likesRoutes);
app.use('/comments', commentsRoutes);

app.get('/', (req, res) => {
    res.send('Hi');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});