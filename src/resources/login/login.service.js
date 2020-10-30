const loginRepo = require('./login.db.repository');

const getLoginPasswordUser = (login, password) =>
  loginRepo.getLoginPasswordUser(login, password);

module.exports = { getLoginPasswordUser };
