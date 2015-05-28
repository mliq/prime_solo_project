var express = require('express');
var xlsxj = require("xlsx-to-json");
var path = require('path');
var multer = require('multer');
var router = express.Router();

router.get('/upload', function(req,res,next) {
    res.render('upload', { title: 'XLSX Upload' });

    xlsxj({
        input: path.resolve(__dirname, "../public/data/data.xlsx"),
        output: path.resolve(__dirname, "../public/data/data.json")
    }, function(err, result) {
        if(err) {
            console.log(err);
        }else {
            console.log(result);

            res.sendFile(path.resolve(__dirname, '../public/data/data.json'));
        }
    });
});

router.post('/upload',[ multer({ dest: './uploads/', rename: function(){return 'data'}}), function(req, res){
    console.dir(req.files);
    console.log(req.body) // form fields
    console.log(req.files) // form files
    res.status(204).end()
}]);


router.get('/json', function(req,res,next) {
    res.sendFile(path.resolve(__dirname, '../public/data/data.json'));
});

module.exports = router;