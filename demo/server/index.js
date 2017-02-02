/**
 * Created by lcom73 on 31/1/17.
 */
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//var jwt = require('jsonwebtoken');
var cors = require('cors');
var path = require('path');
var routes = require('./routes/routes');
var app = express();

mongoose.connect('mongodb://localhost:27017/mydb'); // connect to our database

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, '..', 'client')));


app.use(cors());

//app.set('token', '1234 ');
app.use(routes);

var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Server started at http://%s:%s", host, port)
});
