/**
 * Created by lcom73 on 23/1/17.
 */

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var app = express();
//var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb'); // connect to our database
var Emp = require('./db/emp');

app.set('token','1234 ');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/get', function (req, res) {
    Emp.find({}, {_id: 0, __v: 0}, function (err, data) {
        if (err)
            res.send(err);

        res.json(data);
    });
})

app.post('/register', function (req, res) {

    var emp = new Emp();      // create a new instance of the emp model

    emp.name = req.body.name;
    emp.department = req.body.department;
    emp.username = req.body.username;
    emp.password = req.body.password;

    Emp.find(function (err, data) {
        if (err) {
            res.send(err);
        } else {
            if (data.length > 0) {
                emp.emp_id = data.length + 1;
            } else {
                emp.emp_id = 1;
            }
            emp.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'employee registered successfully !!!'});
            });
        }
    });
})

app.post('/login', function (req, res) {
    console.log("data:",req.body.username);

    Emp.find({"username": req.body.username}, function (err, data) {
        console.log("data:",data);
        if (err) {
            res.send(err);
        } else {
            if (data.length == 0) {
                res.send("Emloyee not registered!!!");
            } else {
                if (data[0].password == req.body.password) {
                    var token = jwt.sign({username:data[0].username}, app.get('token'), {expiresIn: 60});
                    res.send({success: true, message: "successfully logged in", token: token});
                } else {
                    res.send({success: false, message: "authentication failed"});
                }
            }
        }
    });
})


var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Server started at http://%s:%s", host, port)
});

