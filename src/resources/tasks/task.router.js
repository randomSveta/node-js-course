const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:taskId').get(async (req, res) => {
  const task = await tasksService.getTask(
    req.params.boardId,
    req.params.taskId
  );
  if (task) res.status(200).send(Task.toResponse(task));
  else res.status(404);
});

router.route('/').post(async (req, res) => {
  req.body.boardId = req.params.boardId;
  const task = await tasksService.createTask(req.body);
  res.status(200).send(Task.toResponse(task));
});

router.route('/:taskId').put(async (req, res) => {
  const task = await tasksService.updateTask(
    req.params.boardId,
    req.params.taskId,
    req.body
  );
  res.status(200).send(Task.toResponse(task));
});

router.route('/:taskId').delete(async (req, res) => {
  const message = await tasksService.deleteTask(
    req.params.boardId,
    req.params.taskId
  );

  if (message) res.status(204);
  else res.status(404);
});

module.exports = router;
