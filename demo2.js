/**
 * Created by lcom73 on 23/1/17.
 */

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');
var fs = require('fs');

var upload = multer({ dest: 'uploads/' });

var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb'); // connect to our database
var Img = require('./db/img');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

var imgPath = 'img1.jpg';

    var a = new Img();
    a.Img = fs.readFileSync(imgPath);
    a.contentType = 'image/jpg';
    a.save(function (err) {
    if (err) throw err;
});

    var server = app.listen(8085, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Server started at http://%s:%s", host, port)
});
