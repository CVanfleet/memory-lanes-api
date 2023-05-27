const router = require('express').Router();
const eventsController = require('../controllers/events');
const {createEventValidation, validateError} = require('../validation/validate');


// get
router.get('/', eventsController.getEvents);

// post
router.post('/', createEventValidation(), validateError, eventsController.createEvent);

// put 
router.put('/:id', eventsController.updateEvent);

// delete
router.delete('/:id', eventsController.deleteEvent);

module.exports = router;