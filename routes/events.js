const router = require('express').Router();
const eventsController = require('../controllers/events');

// get
router.get('/', eventsController.getEvents);

// post
router.post('/', eventsController.createEvent);

module.exports = router;