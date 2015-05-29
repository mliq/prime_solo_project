var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: '3M IPD 2015 Sales Contest',messages: req.flash('loginMessage') });

});

// passport.authenticate is specifying our ‘local’ strategy that we created, and specifies a failure and success redirect.
router.post('/', passport.authenticate('local', {
        successRedirect: '/users',
        failureRedirect: '/',
        failureFlash: 'Invalid username or password.'
    })
);

module.exports = router;