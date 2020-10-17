function logRequest(req, res, next) {
  const date = new Date();

  // overwrite "id: undefined" for GET, POST params
  const parameters = {};
  for (const param in req.params) {
    if (req.params[param]) parameters[param] = req.params[param];
  }

  delete req.body.password; // remove sensitive data

  console.log(`
  ----- LOG -----
  TIME: ${date.toString()}
  TYPE: ${req.method}
  URL: ${req.originalUrl}
  PARAMS: ${JSON.stringify(parameters)}
  BODY: ${
    req.method === 'POST' || req.method === 'PUT'
      ? JSON.stringify(req.body)
      : `no body for ${req.method}`
  }
  CODE: ${res.statusCode}`);

  next();
}

function logError(error, req, res, next) {
  console.log(`
  ----- ERROR START-----`);
  logRequest(req, res, next);
  console.log(`  ERROR STATUS: ${error.status}
  ERROR MESSAGE: ${error.message}
  ERROR DETAILS:
  ${error.stack}
  ----- ERROR END-----
  `);

  next();
}

function logUnhandledRejection(err, promise) {
  console.log(`
  ----- ERROR START-----
  ERROR: ${err}
  `);
  console.log('ERROR PROMISE REJECTION DETAILS:', promise);
  console.log('----- ERROR END-----');
}

function logUncaughtException(err, origin) {
  console.log(`
  ----- ERROR START-----
  ERROR: ${err}
  ERROR TYPE: ${origin}
  ERROR DETAILS:
  ${err.stack}
  ----- ERROR END-----
  `);
}

module.exports = {
  logRequest,
  logError,
  logUnhandledRejection,
  logUncaughtException
};
