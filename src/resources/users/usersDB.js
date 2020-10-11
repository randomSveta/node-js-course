const User = require('./user.model');

const USERS = [
  new User({
    name: 'user-1',
    login: 'user-login-1',
    password: 'user-password-1'
  }),
  new User({
    name: 'user-2',
    login: 'user-login-2',
    password: 'user-password-2'
  }),
  new User({
    name: 'user-3',
    login: 'user-login-3',
    password: 'user-password-3'
  })
];

exports.USERS = USERS;
