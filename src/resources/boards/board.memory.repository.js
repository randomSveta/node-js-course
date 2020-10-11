const DB_FROM_USER = require('../users/user.memory.repository');
const DB = require('../db');
const DB_DATA =
  DB_FROM_USER.USERS.length > 0 ? DB_FROM_USER : DB.addDataToDB(3);
const USERS = DB_DATA.USERS;
const BOARDS = DB_DATA.BOARDS;
const TASKS = DB_DATA.TASKS;
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
  USERS,
  BOARDS,
  TASKS
};
