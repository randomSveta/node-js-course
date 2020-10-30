const router = require('express').Router();

router.route('/').post(async (req, res, next) => {
  try {
    console.log(req.body);
    res.status(200).send('ok');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
