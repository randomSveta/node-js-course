const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { logAuth } = require('../../common/logger');

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

const addJWTtoken = async (body, users) => {
  for (const user of users) {
    const result = await compareAsync(body.password, user.password);
    if (result) {
      const token = jwt.sign(
        {
          userId: user.id,
          login: user.login
        },
        process.env.JWT_SECRET_KEY,
        { algorithm: 'HS256' },
        {
          expiresIn: '1h'
        }
      );
      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      logAuth(body.login, token, payload);
      return token;
    }
    const err = new Error('Incorrect password for given login!');
    err.status = 403;
    throw err;
  }
};

const authenticationJWT = (req, res, next) => {
  const header = req.headers.authorization;
  if (header) {
    const token = header.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        const error = new Error('Access token is missing or invalid');
        error.status = 401;
        return next(error);
      }
      req.user = user;
      req.token = token;
      return next();
    });
  } else {
    const error = new Error('Access token is missing or invalid');
    error.status = 401;
    return next(error);
  }
};

module.exports = {
  authenticationJWT,
  addJWTtoken
};
