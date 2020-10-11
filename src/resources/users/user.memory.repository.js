const DB = require('../db');
const DB_DATA = DB.addDataToDB(3);
const USERS = DB_DATA.USERS;
const User = require('./user.model');

const BOARDS = DB_DATA.BOARDS;
const TASKS = DB_DATA.TASKS;

const getAll = async () => {
  return USERS;
};

const createUser = async user => {
  const createdUser = new User(user);
  USERS.push(createdUser);
  return createdUser;
};

const getUser = async id => {
  return USERS.filter(user => user.id === id)[0];
};

const updateUser = async (id, updatedUser) => {
  USERS.map(user => {
    if (user.id === id) {
      if (updatedUser.name !== user.name) user.name = updatedUser.name;
      if (updatedUser.login !== user.login) user.login = updatedUser.login;
      if (updatedUser.password !== user.password) {
        user.password = updatedUser.password;
      }
    }
    return user;
  });
  return USERS.filter(user => user.id === id)[0];
};

const deleteUser = async id => {
  const index = USERS.findIndex(user => user.id === id);

  if (index + 1) {
    TASKS.forEach(task => {
      if (task.userId === id) task.userId = null;
    });
    return 'User and user tasks have been deleted';
  }
};

module.exports = {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  USERS,
  BOARDS,
  TASKS
};
