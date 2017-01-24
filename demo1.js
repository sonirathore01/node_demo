/*** Created by lcom73 on 20/1/17. */

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
//var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb'); // connect to our database
var Stud = require('./db/stud');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// create a stud (accessed at POST http://localhost:8080/api/studs)

    app.get('/fetch',function (req, res) {
        Stud.find({},{_id:0,__v:0},function (err, data) {
            if (err)
                res.send(err);

            res.json(data);
        });
    })

    app.post('/insert',function (req, res) {

        var stud = new Stud();      // create a new instance of the stud model
        if(req.body.name != null || req.body.name != undefined || req.body.marks != null || req.body.marks != undefined ) {

            stud.name = req.body.name;  // set the bears name (comes from the request)
            stud.marks = req.body.marks;  // set the bears name (comes from the request)
            Stud.find(function (err,data) {
                if(err){
                    res.send("database error!");
                }else{
                    if(data.length > 0) {
                        stud.stu_id = data.length + 1;
                    }else{
                        stud.stu_id = 1;
                    }
                    stud.save(function (err) {
                        if (err)
                            res.send(err);

                        res.json({message: 'Bear created!'});
                    });
                }
            });
        }
        else
            res.json({message: 'all fields are required!'});
    })

//router.route('/studs/:sid')
// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    app.get('/fetch/:sid',function (req, res) {
        Stud.findById(req.params.sid, function (err, data) {
            if (err)
                res.send(err);
            res.json(data);
        });
    })

    app.put('/update/:sid',function (req, res) {
        // use our bear model to find the bear we want
        // var queary = {name : 'yash'};
        // Stud.update(queary,{name : 'dalal'});
        Stud.findById(req.params.sid, function (err, data) {

            if (err)
                res.send(err);
            data.name = req.body.name;  // update the bears info
            data.marks = req.body.marks;  // update the bears info


            // save the bear
            data.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'Bear updated!'});
            });
        });
    })

    app.delete('/delete/:sid',function (req, res) {
        Stud.remove({
            _id: req.params.sid
        }, function (err, stud) {
            if (err)
                res.send(err);

            res.json({message: 'Successfully deleted'});
        });
    })

var server = app.listen(8085, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Server started at http://%s:%s", host, port)
});
