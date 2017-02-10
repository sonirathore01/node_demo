/**
 * Created by lcom73 on 31/1/17.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');

var Cust = require('../models/customer');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        req.body.path = "./uploads/";
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        var file1=file.originalname.split(".");
        req.body.profile = file1[0]+"_"+Date.now()+"."+file1[file1.length -1];
        console.log("file:"+req.body.profile);
        callback(null,req.body.profile);
    }
});

var upload = multer({storage: storage}).single('profile');

router.get('/get', function (req, res) {
    Cust.find({}, {__v: 0}, function (err, data) {
        if (err)
            return res.send(err);

        return res.json(data);
    });
});

router.get('/getparent', function (req, res) {
    Cust.find({}, {__v: 0}, function (err, data) {
        if (err)
            return res.send(err);

        return res.json(data);
    });
});

router.get('/get/:id',function (req, res) {
    Cust.findById(req.params.id, function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
});

router.post('/custentry', upload, function (req, res) {

    if (req.body.name == null || req.body.name == undefined )
        return res.status(400).send({error: 'Name is required'});
   
    var cust = new Cust();      // create a new instance of the customer model
    cust.name = req.body.name;
    cust.parent = req.body.parent;
    cust.profile = req.body.profile;
   
    cust.save(function (err,data) {
        if (err)
            return res.status(409).send(err);
            return res.json(data);
    });
});

router.delete('/delete/:id', function (req, res) {
    Cust.remove({
        _id: req.params.id
    }, function (err, cust) {
        if (err)
            res.send(err);

        res.json({message: 'Successfully deleted'});
    });
});

module.exports = router;