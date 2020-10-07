const BOARDS = [
  { id: 1, title: 'Amy', columns: [{ title: 'A', order: 0 }] },
  { id: 2, title: 'Jess', columns: [{ title: 'A', order: 0 }] },
  { id: 3, title: 'Daria', columns: [{ title: 'A', order: 0 }] },
  {
    id: '29c08d12-d485-4b40-a304-7f4945e1b378',
    title: 'string',
    columns: [{ title: 'string', order: 0 }]
  }
];
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
  return BOARDS.filter(board => board.id.toString() === id)[0];
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

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
