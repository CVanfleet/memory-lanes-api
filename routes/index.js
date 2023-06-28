const router = require('express').Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login')
})

// @desc    Dashboard
// @route   GET /
router.get('/dashboard', ensureAuth, (req, res) => {
    // Create model for events, use mongoose to retrieve all events for the current user req.user etc..
    res.render('main', {
        body: '../dashboard'
    })
})

router.use('/events', require('./events'));

module.exports = router;