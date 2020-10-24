const router = require('express').Router();
const usersService = require('./user.service');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.getUser(req.params.id);
    if (user) res.status(200).send(user);
    else {
      const err = new Error('Not Found');
      err.status = 404;
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const user = await usersService.createUser(req.body);
    res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const user = await usersService.updateUser(req.params.id, req.body);
    if (user) res.status(200).send(user);
    else {
      const err = new Error('Not Found');
      err.status = 404;
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    /*     while (TASKS.findIndex(task => task.userId === req.params.id) + 1) {
      const index = TASKS.findIndex(task => task.userId === req.params.id);
      const newTask = Object.assign({}, TASKS[index]);
      newTask.userId = null;
      tasksService.updateTask(TASKS[index].boardId, TASKS[index].id, newTask);
    } */

    const message = await usersService.deleteUser(req.params.id);

    if (message) res.status(204).send(message);
    else {
      const err = new Error('Not Found');
      err.status = 404;
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
