const router = require('express').Router();
const boardService = require('./board.service');
const { Board } = require('./board.model');
const { authenticationJWT } = require('../login/authentication');
const { checkUserRole } = require('../login/authorization');

router
  .route('/')
  .get(authenticationJWT, checkUserRole, async (req, res, next) => {
    try {
      const boards = await boardService.getAll();
      return res.status(200).send(boards.map(board => Board.toResponse(board)));
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/:id')
  .get(authenticationJWT, checkUserRole, async (req, res, next) => {
    try {
      const board = await boardService.getBoard(req.params.id);
      if (board) return res.status(200).send(Board.toResponse(board));

      const err = new Error('Not Found');
      err.status = 404;
      return next(err);
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/')
  .post(authenticationJWT, checkUserRole, async (req, res, next) => {
    try {
      const board = await boardService.createBoard(req.body);
      return res.status(200).send(Board.toResponse(board));
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/:id')
  .put(authenticationJWT, checkUserRole, async (req, res, next) => {
    try {
      const board = await boardService.updateBoard(req.params.id, req.body);
      return res.status(200).send(Board.toResponse(board));
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/:id')
  .delete(authenticationJWT, checkUserRole, async (req, res, next) => {
    try {
      const message = await boardService.deleteBoard(req.params.id);
      if (message) return res.status(204).send(message);

      const err = new Error('Not Found');
      err.status = 404;
      return next(err);
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
