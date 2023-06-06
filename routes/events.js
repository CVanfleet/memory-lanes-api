const router = require('express').Router();
const eventsController = require('../controllers/events');
const {createEventValidation, updateEventValidation, validateError, eventIdValidation} = require('../validation/validate');


// get
router.get('/', eventsController.getEvents);
router.get('/:id', eventIdValidation(), validateError, eventsController.getEventById)

// post
router.post('/', createEventValidation(), validateError, eventsController.createEvent);

// put 
router.put('/:id', updateEventValidation(), eventIdValidation(), validateError, eventsController.updateEvent);

// delete
router.delete('/:id', eventIdValidation(), validateError, eventsController.deleteEvent);

module.exports = router;