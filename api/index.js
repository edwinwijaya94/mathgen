var express = require('express');
var router = express.Router();

router.use('/generator', require('./generator'));

module.exports = router;