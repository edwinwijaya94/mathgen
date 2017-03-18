var express = require('express');
var router = express.Router();

router.use('/generator', require('./generator'));
router.use('/problem', require('./problem'));

module.exports = router;