/**
 * Created by lcom73 on 28/1/17.
 */
var express = require('express');
    var router = express.Router();

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/mydb'); // connect to our database
var Emp = require('../models/emp');

router.get('/get', function (req, res) {
    Emp.find({}, {_id: 0, __v: 0}, function (err, data) {
        if (err)
            return res.send(err);

        return res.json(data);
    });
});

router.post('/register', function (req, res) {

    if (req.body.name == null || req.body.name == undefined )
        return res.status(400).send({error: 'Name is required'});
    if (req.body.department == null || req.body.department == undefined )
        return res.status(400).send({error: 'Department is required'});
    if (req.body.username == null || req.body.username == undefined )
        return res.status(400).send({error: 'Username is required'});
    if (req.body.password == null || req.body.password == undefined )
        return res.status(400).send({error: 'Password is required'});

    var emp = new Emp();      // create a new instance of the emp model
    emp.name = req.body.name;
    emp.department = req.body.department;
    emp.username = req.body.username;
    emp.password = req.body.password;
    emp.save(function (err) {
        if (err)
            return res.status(409).send(err);
            return res.json({message: 'employee registered successfully !!!'});
    });
});

router.post('/login', function (req, res) {

    if (req.body.userid == null || req.body.userid == undefined )
        return res.status(400).send({error: 'Username is required'});
    if (req.body.pwd == null || req.body.pwd == undefined )
        return res.status(400).send({error: 'Password is required'});

    Emp.find({"username": req.body.userid}, function (err, data) {

        if (err) {
            return res.send(err);
        } else {
            if (data.length == 0) {
                res.send("Emloyee not registered!!!");
            } else {
                if (data[0].password == req.body.pwd) {
                    //var token = jwt.sign({username: data[0].username}, router.get('token'), {expiresIn: 60});
                    res.send({message: "successfully logged in"});
                } else {
                    res.send({message: "authentication failed"});
                }
            }
        }
    });
});

module.exports = router;