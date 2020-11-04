const checkUserRole = (req, res, next) => {
  const login = req.user.login;
  if (!login) {
    const error = new Error('Access token is missing or invalid');
    error.status = 401;
    return next(error);
  }
  if (login && login !== 'admin') {
    const error = new Error('User is not an admin');
    error.status = 403;
    return next(error);
  }
  return next();
};

module.exports = { checkUserRole };
