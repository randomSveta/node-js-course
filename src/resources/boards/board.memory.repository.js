const { BOARDS } = require('./boardsDB');
const Board = require('./board.model');

const getAll = async () => {
  return BOARDS;
};

const createBoard = async board => {
  const createdBoard = new Board(board);
  BOARDS.push(createdBoard);
  return createdBoard;
};

const getBoard = async id => {
  const index = BOARDS.findIndex(board => board.id === id);
  if (index + 1) return BOARDS[index];
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
  const index = BOARDS.findIndex(board => board.id === id);
  if (index + 1) {
    BOARDS.splice(index, 1);
    return "Board and it's tasks have been deleted";
  }
};

module.exports = {
  getAll,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard
};
