const router = require('express').Router();
const loginService = require('./login.service');
const { addJWTtoken } = require('../login/authentication');

router.route('/').get(async (req, res, next) => {
  try {
    return res.status(200).send('Login page');
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const users = await loginService.getLoginPasswordUsers(req.body.login);

    if (users.length > 0 && req.body.login && req.body.password) {
      const token = await addJWTtoken(req.body, users);

      if (token) return res.status(200).send({ token });

      const error = new Error('Access token is missing or invalid');
      error.status = 401;
      return next(error);
    }
    const err = new Error("Login doesn't exist in DB!");
    err.status = 401;
    return next(err);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
