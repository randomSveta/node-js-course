const router = require('express').Router();
const boardService = require('./board.service');
const taskService = require('../tasks/task.service');
const Board = require('./board.model');
const { TASKS } = require('../tasks/tasksDB');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const board = await boardService.getBoard(req.params.id);
  if (board) res.status(200).send(Board.toResponse(board));
  else res.status(404).end('Not found');
});

router.route('/').post(async (req, res) => {
  const board = await boardService.createBoard(req.body);
  res.status(200).send(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
  const board = await boardService.updateBoard(req.params.id, req.body);
  res.status(200).send(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res) => {
  while (TASKS.findIndex(task => task.boardId === req.params.id) + 1) {
    const index = TASKS.findIndex(task => task.boardId === req.params.id);
    taskService.deleteTask(req.params.id, TASKS[index].id);
  }

  const message = await boardService.deleteBoard(req.params.id);
  if (message) res.status(204).send(message);
  else res.status(404).end('Not found');
});

module.exports = router;
