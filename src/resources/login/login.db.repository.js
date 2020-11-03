const { User } = require('../users/user.model');

const getLoginPasswordUsers = async login => {
  const users = await User.find({ login });
  return users;
};

module.exports = {
  getLoginPasswordUsers
};
