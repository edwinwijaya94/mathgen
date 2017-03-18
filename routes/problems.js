var express = require('express');
var router = express.Router();

/* show create form */
router.get('/create', function(req, res, next) {
  res.render('problem/form', {title: 'Mathgen | Create Problem'});
});

/* show create form */
router.get('/problem', function(req, res, next) {
  res.render('problem/view', {title: 'Mathgen | Problems'});
});

module.exports = router;
