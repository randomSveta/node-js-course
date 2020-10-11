const User = require('./user.model');

function addUsersToDB() {
  const users = [];

  for (let i = 0; i < 3; i++) {
    const createdUser = new User({
      name: `user-${i}`,
      login: `user-login-${i}`,
      password: `user-password-${i}`
    });
    users.push(createdUser);
  }

  return users;
}

module.exports = {
  addUsersToDB
};
