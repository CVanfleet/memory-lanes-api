const router = require('express').Router();

// @desc    Login/Landing page
// @route   GET /
router.get('/', (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

// @desc    Dashboard
// @route   GET /
router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

router.use('/events', require('./events'));

module.exports = router;