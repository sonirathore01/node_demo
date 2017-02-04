/**
 * Created by lcom73 on 28/1/17.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var Emp = require('../models/emp');
var State = require('../models/state');
var City = require('../models/city');

//get all records
router.get('/get', function (req, res) {
    Emp.find({}, {__v: 0}, function (err, data) {
        if (err)
            return res.send(err);

        return res.json(data);
    });
});

//get state
router.get('/getstate', function (req, res) {

    State.find({}, {__v: 0}, function (err, data) {
        if (err)
            return res.send(err);

        return res.json(data);
    });
});

//get city
router.get('/getcity/:id', function(req, res) {

    City.find({ State_id : {$eq: req.params.id}}).exec(function(err, cities) {
        if (err)
            res.send(err)

        res.json(cities);
    });
});

// //add state
// router.post('/addstate', function (req, res) {
//
//     var state = new State();
//     state.State_Name = req.body.State_Name;
//
//     state.save(function (err) {
//         if (err)
//             res.send(err);
//         res.send("State added!!");
//     });
// });

//add city
// router.post('/addcity', function (req, res) {
//     console.log("state:",req.body.State_id);
//     var city = new City();
//     city.City_Name = req.body.City_Name;
//     city.State_id = req.body.State_id;
//
//     city.save(function (err) {
//         if (err)
//             res.send(err);
//         res.send("City added!! ");
//     });
// });

/*
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        req.body.path = "../uploads/";
        callback(null, '../uploads');
    },
    filename: function (req, file, callback) {
        var file1=file.originalname.split(".");
        req.body.file = file1[0]+"_"+Date.now()+"."+file1[file1.length -1];
        console.log("file:"+req.body.file);
        callback(null,req.body.file);
        //  callback(null, file.originalname)
    }
});
*/

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.split(".") + '-' + Date.now() + '.png')
    }
});

var upload = multer({storage: storage}).single('file');

//register employee details
router.post('/register', multer({ dest: './uploads/'}).single('file'), function (req, res) {

    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.gender);
    console.log(req.body.dob);
    console.log(req.body.status);
    console.log(req.body.state.State_Name);
    console.log(req.body.city.City_Name);
    console.log(req.body.file);

    if (req.body.name == null || req.body.name == undefined)
        return res.status(400).send({error: 'Name is required'});

    if (req.body.email == null || req.body.email == undefined)
        return res.status(400).send({error: 'Email is required'});

    if (req.body.gender == null || req.body.gender == undefined)
        return res.status(400).send({error: 'Gender is required'});

    if (req.body.state == null || req.body.state == undefined)
        return res.status(400).send({error: 'State is required'});

    if (req.body.city == null || req.body.city == undefined)
        return res.status(400).send({error: 'City is required'});


    var emp = new Emp();      // create a new instance of the emp model
    emp.name = req.body.name;
    emp.email = req.body.email;
    emp.gender = req.body.gender;
    emp.dob = req.body.dob;
    emp.status = req.body.status;
    emp.state = req.body.state.State_Name;
    emp.city = req.body.city.City_Name;
    emp.profileimg = req.body.file;

    emp.save(function (err) {
        if (err)
            return res.status(409).send(err);
        return res.json({message: 'employee registered successfully !!!'});
    });
});

//update employee details
router.put('/update/:id', function (req, res) {

    if (!req.body.name)
        return res.status(400).send({error: 'Name is required'});

    Emp.findById(req.params.id, function (err, data) {

        if (err)
            return res.send(err);

        data.name = req.body.name;  // update the bears info
        data.email = req.body.email;
        data.gender = req.body.gender;
        emp.dob = req.body.dob;
        data.status = req.body.status;
        data.state = req.body.state.State_Name;
        data.city = req.body.city.City_Name;
        data.profileimg = req.body.file;

        data.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: 'Employee Information updated!'});
        });
    });
});

//delete employee details
router.delete('/delete/:id', function (req, res) {
    Emp.remove({
        _id: req.params.id
    }, function (err, data) {
        if (err)
            res.send(err);

        res.json({message: 'Successfully deleted'});
    });
});

module.exports = router;