const USERS = [
  { id: 1, name: 'Amy' },
  { id: 2, name: 'Jess' },
  { id: 3, name: 'Daria' }
];
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
  USERS.forEach((user, index, array) => {
    if (user.id === id) array.splice(index, 1);
  });
  return 'The user has been deleted';
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
