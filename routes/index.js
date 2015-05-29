var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '3M IPD 2015 Sales Contest' });
});

// route to test if the user is logged in or not
router.get('/loggedin', function(req, res) { res.send(req.isAuthenticated() ? req.user : '0'); });

module.exports = router;
