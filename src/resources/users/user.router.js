const router = require('express').Router();
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');
const User = require('./user.model');
const { TASKS } = require('../tasks/tasksDB');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUser(req.params.id);
  if (user) res.status(200).send(User.toResponse(user));
  else res.status(404).end('Not found');
});

router.route('/').post(async (req, res) => {
  const user = await usersService.createUser(req.body);
  res.status(200).send(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.updateUser(req.params.id, req.body);
  res.status(200).send(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  while (TASKS.findIndex(task => task.userId === req.params.id) + 1) {
    const index = TASKS.findIndex(task => task.userId === req.params.id);
    const newTask = Object.assign({}, TASKS[index]);
    newTask.userId = null;
    tasksService.updateTask(TASKS[index].boardId, TASKS[index].id, newTask);
  }

  const message = await usersService.deleteUser(req.params.id);

  if (message) res.status(204).send(message);
  else res.status(404).end('Not found');
});

module.exports = router;
