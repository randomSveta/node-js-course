const loginRepo = require('./login.db.repository');

const getLoginPasswordUsers = login => loginRepo.getLoginPasswordUsers(login);

module.exports = { getLoginPasswordUsers };
