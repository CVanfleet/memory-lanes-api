const router = require('express').Router();

router.use('/events', require('./events'));

module.exports = router;