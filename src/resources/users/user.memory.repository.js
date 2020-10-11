const { USERS } = require('./usersDB');
const { TASKS } = require('../tasks/tasksDB');
const User = require('./user.model');

const getAll = async () => {
  return USERS;
};

const createUser = async user => {
  const createdUser = new User(user);
  USERS.push(createdUser);
  return createdUser;
};

const getUser = async id => {
  const index = USERS.findIndex(user => user.id === id);
  if (index + 1) return USERS[index];
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
  deleteUser
};
