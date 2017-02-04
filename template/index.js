/**
 * Created by lcom73 on 4/2/17.
 */
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var path = require('path');
var multer = require('multer');
var routes = require('./routes1/routes1');

mongoose.connect('mongodb://localhost:27017/empdb'); // connect to our database

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, '..', 'client')))
app.use(cors());
app.use(routes);

var settings = require('./public/setting');

app.use('../client/controllers/EmpController', express.static(__dirname + '../client/controllers/EmpController'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(express.static(__dirname + '../client'));

app.set('views', __dirname + '../client');


var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Server started at http://%s:%s", host, port)
});