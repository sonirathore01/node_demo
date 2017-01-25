/**
 * Created by lcom73 on 24/1/17.
 */
var express = require('express');
var multer = require('multer');
var app = express();

/* Disk Storage engine of multer gives you full control on storing files to disk. The options are destination (for determining which folder the file should be saved) and filename (name of the file inside the folder) */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb'); // connect to our database
var Img = require('./db/img');

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        request.body.path = "./uploads/";
        callback(null, './uploads');
    },
    filename: function (request, file, callback) {
            console.log("file:"+file.originalname);
            file1=file.originalname.split(".");
            request.body.file = file1[0]+"_"+Date.now()+"."+file1[file1.length -1];
            callback(null,request.body.file);
          //  callback(null, file.originalname)
        }
});

/*Multer accepts a single file with the name photo. This file will be stored in request.file*/

//var upload = multer({storage: storage}).single('photo');
var upload = multer({storage: storage}).array('photo',5);

//Posting the file upload
app.post('/upload', function(request, response) {
    upload(request, response, function(err) {
        if(err) {
            console.log(err);
            return;
        }
        console.log(request.file);
        response.end('Your File Uploaded');
        console.log('Photo Uploaded');

        var img = new Img();      // create a new instance of the img model
        img.img_name = request.body.file;
        img.img_path = request.body.path+request.body.file;
        img.save(function (err,data) {
            if(err) {
                console.log(err);
            }else{
                console.log(data);
            }
        });
    })
});

var server = app.listen(8086, function () {

    var host = server.address().address;
    var port = server.address().port;
    console.log("Server started at http://%s:%s", host, port)
});
