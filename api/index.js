var express = require('express');
var router = express.Router();

router.use('/problem', require('./problem'));
router.use('/generator', require('./generator'));
router.use('/solver', require('./solver'));

module.exports = router;