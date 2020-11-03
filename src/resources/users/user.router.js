const router = require('express').Router();
const { User } = require('./user.model');
const usersService = require('./user.service');
const bcrypt = require('bcryptjs');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.status(200).json(users.map(user => User.toResponse(user)));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.getUser(req.params.id);
    if (user) res.status(200).send(User.toResponse(user));
    else {
      const err = new Error('Not Found');
      err.status = 404;
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const existingUsers = await User.find({ login: req.body.login });
    if (existingUsers.length > 0) {
      const compareAsync = (bodyPassword, userPassword) => {
        return new Promise((resolve, reject) => {
          bcrypt.compare(bodyPassword, userPassword, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      };
      for (const existingUser of existingUsers) {
        const result = await compareAsync(
          req.body.password,
          existingUser.password
        );
        if (result) {
          const error = new Error(
            'User with the same login and password already exists, try to change any of them'
          );
          error.status = 403;
          return next(error);
        }
      }
    }
    const user = await usersService.createUser(req.body);
    res.status(200).send(User.toResponse(user));
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const user = await usersService.updateUser(req.params.id, req.body);
    if (user) res.status(200).send(User.toResponse(user));
    else {
      const err = new Error('Not Found');
      err.status = 404;
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const message = await usersService.deleteUser(req.params.id);

    if (message) res.status(204).send(message);
    else {
      const err = new Error('Not Found');
      err.status = 404;
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
