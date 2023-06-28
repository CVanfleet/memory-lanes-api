const router = require('express').Router();
const eventsController = require('../controllers/events');
const { ensureAuth } = require('../middleware/auth');
const {createEventValidation, updateEventValidation, validateError, eventIdValidation, userIdValidation} = require('../validation/validate');


// get
router.get('/', ensureAuth, eventsController.getEvents);
router.get('/:id', ensureAuth, eventIdValidation(), validateError, eventsController.getEventById);
router.get('/user/:userId', ensureAuth, userIdValidation(), validateError, eventsController.getEventsByUser);
// post
router.post('/', ensureAuth, createEventValidation(), validateError, eventsController.createEvent);

// put 
router.put('/:id', ensureAuth, updateEventValidation(), eventIdValidation(), validateError, eventsController.updateEvent);

// delete
router.delete('/:id', ensureAuth, eventIdValidation(), validateError, eventsController.deleteEvent);

module.exports = router;