const BoardsRepo = require('./board.memory.repository');

const getAll = () => BoardsRepo.getAll();

const createBoard = Board => BoardsRepo.createBoard(Board);
const getBoard = id => BoardsRepo.getBoard(id);
const updateBoard = (id, updatedBoard) =>
  BoardsRepo.updateBoard(id, updatedBoard);
const deleteBoard = id => BoardsRepo.deleteBoard(id);

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
