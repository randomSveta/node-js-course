const router = require('express').Router();
const boardService = require('./board.service');
const Board = require('./board.model');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const board = await boardService.getBoard(req.params.id);
  res.status(200).send(Board.toResponse(board));
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
  const message = await boardService.deleteBoard(req.params.id);
  res.status(204).send(message);
});

module.exports = router;
