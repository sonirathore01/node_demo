/**
 * Created by lcom73 on 31/1/17.
 */
var express = require('express');
    var router = express.Router();
var Emp = require('../models/emp');

router.get('/get', function (req, res) {
    Emp.find({}, {__v: 0}, function (err, data) {
        if (err)
            return res.send(err);

        return res.json(data);
    });
});

router.get('/get/:id',function (req, res) {
    Emp.findById(req.params.id, function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
});


router.post('/signup', function (req, res) {

    if (req.body.name == null || req.body.name == undefined )
        return res.status(400).send({error: 'Name is required'});
    if (req.body.username == null || req.body.username == undefined )
        return res.status(400).send({error: 'Username is required'});
    if (req.body.password == null || req.body.password == undefined )
        return res.status(400).send({error: 'Password is required'});

    var emp = new Emp();      // create a new instance of the emp model
    emp.name = req.body.name;
    emp.username = req.body.username;
    emp.password = req.body.password;
    emp.save(function (err) {
        if (err)
            return res.status(409).send(err);
            return res.json({message: 'employee signed up successfully !!!'});
    });
});

router.post('/signin', function (req, res) {

    if (req.body.username == null || req.body.username == undefined )
        return res.status(400).send({error: 'Username is required'});
    if (req.body.password == null || req.body.password == undefined )
        return res.status(400).send({error: 'Password is required'});

    Emp.find({"username": req.body.username}, function (err, data) {
        if (err) {
            return res.send(err);
        } else {
            if (data.length == 0) {
                res.status(400).send({error:"Emloyee not registered..!!"});
            } else {
                if (data[0].password == req.body.password) {
                    //var token = jwt.sign({username: data[0].username}, router.get('token'), {expiresIn: 60});
                    res.send(data);
                } else {
                    res.status(400).send({message: "Signin failed..!!"});
                }
            }
        }
    });
});

router.put('/update/:id', function (req, res) {

    if (!req.body.name)
        return res.status(400).send({error: 'Name is required'});

    Emp.findById(req.params.id, function (err, data) {

        if (err)
            return res.send(err);

        data.name = req.body.name;  // update the bears info
        data.department = req.body.department;
        data.username = req.body.username;
        data.password = req.body.password;
        data.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: 'User updated!'});
        });
    });
});

router.delete('/delete/:id', function (req, res) {
    Emp.remove({
        _id: req.params.id
    }, function (err, stud) {
        if (err)
            res.send(err);

        res.json({message: 'Successfully deleted'});
    });
});

module.exports = router;
