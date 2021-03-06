var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: '3M IPD 2015 Sales Contest',messages: req.flash('loginMessage') });
});

router.get('/svg', function(req, res, next) {
    res.render('svgSmall', {});
});

router.get('/svgSmallTemplate.html', function(req, res, next) {
    res.sendFile(path.resolve(__dirname,'../views','svgSmallTemplate.html'), {});
});

// passport.authenticate is specifying our ‘local’ strategy that we created, and specifies a failure and success redirect.
router.post('/', passport.authenticate('local', {
        successRedirect: '/users',
        failureRedirect: '/',
        failureFlash: 'Invalid username or password.'
    })
);

/* Handle Logout */
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;