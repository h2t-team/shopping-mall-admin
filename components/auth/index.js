const express = require('express');
const passport = require('../../auth/passport');
const authController = require('./authController');

const router = express.Router();

// authenication

// login
router.get('/login', authController.loginPage);
router.post('/login', passport.authenticate('local', { 
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true 
    })
);

// logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login');
});

module.exports = router;