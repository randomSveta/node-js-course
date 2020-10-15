const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { logRequest, logError } = require('./common/logger');
const { handleErrors } = require('./common/error-handler');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

// logger
app.use(
  ['/users/:id?', '/boards/:boardId/tasks/:taskId?', '/boards/:id?'],
  logRequest
);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

// error logger and handler
app.use(
  ['/users/:id?', '/boards/:boardId/tasks/:taskId?', '/boards/:id?'],
  handleErrors,
  logError
);

module.exports = app;
