var express = require('express');
var router = express.Router();
var Users = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.isAuthenticated() == true) {
        if(req.user.group==="admin"){
            res.render('admin', {title: '3M IPD 2015 Sales Contest'});
        } else {
            res.render('index', {title: '3M IPD 2015 Sales Contest'});
        }
    } else {
        res.json(req.isAuthenticated());
    }
});

/* GET users list. */
router.get('/list', function (req, res, next) {
    if (req.isAuthenticated() == true && req.user.group==='admin') {
        Users.find(function (err, users) {
            if (err) return next(err);
            res.json(users);
        });
    } else {
        res.json(req.isAuthenticated());
    }
});

module.exports = router;
