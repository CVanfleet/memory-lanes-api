const router = require('express').Router()
const passport = require('passport')

// @desc    Login/Landing page
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/'}), 
(req, res) => {
    res.redirect('/dashboard')
})

module.exports = router