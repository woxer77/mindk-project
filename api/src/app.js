const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./services/db');

const config = require('./services/config');
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const likesRoutes = require('./routes/likes');
const commentsRoutes = require('./routes/comments');
const authRoutes = require('./routes/auth');
const passport = require('passport');

const loggingMiddleware = require('./middlewares/loggingMiddleware');
const errorHandler = require('./middlewares/errorHandler');
const registerStrategy = require('./services/google.strategy');

const app = express();
const port = config.appPort;

registerStrategy();

app.use(loggingMiddleware({
  db: db,
  dbTableName: config.logsDbTableName,
}));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);
app.use('/likes', likesRoutes);
app.use('/comments', commentsRoutes);
app.use('/auth', authRoutes);

app.use(errorHandler({
  db: db,
  dbTableName: config.logsDbTableName,
}));

app.get('/', (req, res) => {
  res.send('Hi');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});