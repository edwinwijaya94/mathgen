var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mathgen | Home' });
});

router.use('/users', require('./users'));
router.use('/problems', require('./problems'));

module.exports = router;
