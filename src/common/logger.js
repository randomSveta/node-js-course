module.exports = function logger(req, res, next) {
  const date = new Date();
  console.log('----- LOGGER -----');
  console.log('time: ', date.toTimeString());
  console.log('request type: ', req.method);
  console.log('request url: ', req.originalUrl);
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('request body: ', req.body);
  }

  const parameters = {};
  for (const param in req.params) {
    if (req.params[param]) parameters[param] = req.params[param];
  }
  console.log('parameters: ', parameters);

  next();
};
