var express = require('express');
var xlsxj = require("xlsx-to-json");
var path = require('path');
//var fs = require('fs');
var router = express.Router();

router.get('/', function(req,res,next) {
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

module.exports = router;