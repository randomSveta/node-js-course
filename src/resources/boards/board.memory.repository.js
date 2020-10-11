const boardsDB = require('./boardsDB');
const BOARDS = boardsDB.addBoardsToDB();
const Board = require('./board.model');
// const Column = require('./column.model');

const getAll = async () => {
  return BOARDS;
};

const createBoard = async board => {
  const createdBoard = new Board(board);
  BOARDS.push(createdBoard);
  return createdBoard;
};

const getBoard = async id => {
  return BOARDS.filter(board => board.id === id)[0];
};

const updateBoard = async (id, updatedBoard) => {
  BOARDS.map(board => {
    if (board.id === id) {
      if (updatedBoard.title !== board.title) board.title = updatedBoard.title;
      if (
        JSON.stringify(updatedBoard.columns) !== JSON.stringify(board.columns)
      ) {
        board.columns = [...updatedBoard.columns];
      }
    }
    return board;
  });
  return BOARDS.filter(board => board.id === id)[0];
};

const deleteBoard = async id => {
  BOARDS.forEach((board, index, array) => {
    if (board.id === id) array.splice(index, 1);
  });
  return 'The board has been deleted';
};

module.exports = {
  getAll,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  BOARDS
};
