var express = require('express');
var xlsxj = require("xlsx-to-json");
var path = require('path');
var multer = require('multer');
var router = express.Router();

router.get('/upload', function(req,res,next) {
    if (req.isAuthenticated() == true) {
        if(req.user.group==="admin"){
            res.render('upload', { title: 'XLSX Upload',messages: req.flash('fileUpload') });
        } else {
            res.render('login', { title: '3M IPD 2015 Sales Contest',messages: req.flash('loginMessage') });
        }
    } else {
        res.render('login', { title: '3M IPD 2015 Sales Contest',messages: req.flash('loginMessage') });
    }
});

router.post('/upload',[ multer({
    dest: './uploads/',
    rename: function(){return 'data'}}),
    function(req, res){
    console.dir(req.files);
    console.log(req.body); // form fields
    console.log(req.files); // form files
    xlsxj({
        input: path.resolve(__dirname, "../uploads/data.xlsx"),
        output: path.resolve(__dirname, "../public/data/data.json")
    }, function(err, result) {
        if(err) {
            console.log(err);
        }else {
            console.log(result);
        }
    });
    req.flash('fileUpload', 'Success');
    res.redirect('/data/upload');
    res.status(204).end()
}]);

router.get('/json', function(req,res,next) {
    if (req.isAuthenticated() == true) {
            res.sendFile(path.resolve(__dirname, '../public/data/data.json'));
    } else {
        res.render('login', { title: '3M IPD 2015 Sales Contest',messages: req.flash('loginMessage') });
    }
});

module.exports = router;