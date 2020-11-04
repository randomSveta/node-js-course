const router = require('express').Router();
const { User } = require('./user.model');
const usersService = require('./user.service');
const bcrypt = require('bcryptjs');
const { authenticationJWT } = require('../login/authentication');
const { checkUserRole } = require('../login/authorization');

router
  .route('/')
  .get(authenticationJWT, checkUserRole, async (req, res, next) => {
    try {
      const users = await usersService.getAll();
      return res.status(200).send(users.map(user => User.toResponse(user)));
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/:id')
  .get(authenticationJWT, checkUserRole, async (req, res, next) => {
    try {
      const user = await usersService.getUser(req.params.id);
      if (user) return res.status(200).send(User.toResponse(user));

      const err = new Error('Not Found');
      err.status = 404;
      return next(err);
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/')
  .post(authenticationJWT, checkUserRole, async (req, res, next) => {
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
      return res.status(200).send(User.toResponse(user));
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/:id')
  .put(authenticationJWT, checkUserRole, async (req, res, next) => {
    try {
      const user = await usersService.updateUser(req.params.id, req.body);
      if (user) return res.status(200).send(User.toResponse(user));

      const err = new Error('Not Found');
      err.status = 404;
      return next(err);
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/:id')
  .delete(authenticationJWT, checkUserRole, async (req, res, next) => {
    try {
      const message = await usersService.deleteUser(req.params.id);

      if (message) return res.status(204).send(message);

      const err = new Error('Not Found');
      err.status = 404;
      return next(err);
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
