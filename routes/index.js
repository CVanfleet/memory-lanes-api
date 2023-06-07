const router = require('express').Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

// @desc    Dashboard
// @route   GET /
router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard')
})

router.use('/events', require('./events'));

module.exports = router;