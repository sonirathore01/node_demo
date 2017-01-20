// Modules
var express = require('express');
var bodyParser = require('body-parser');

// END modules

var app = express();
var server = require('http').Server(app);
var sql = require('./db');


//middleware
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
//end middleware


// define routes
app.get('/',function (req,res) {
    sql.executeSql("SELECT * FROM prod_details", function (err, data) {
      if(err){
          return res.send({error: err});
      }
      return res.send({data: data});
    })
});

app.post('/entry', function(req, res) {
    var query = "insert into prod_details (id,name,color,price) values("+req.body.id+",'"+ req.body.name +"','"+ req.body.color +"',"+ req.body.price +")";
    console.log(query);
    sql.executeSql(query, function (err, data) {
        if(err){
            return res.send({error: err});
        }
        return res.send({data : data});
    })
});

app.put('/update/:id', function(req, res) {
    sql.executeSql("update prod_details set name='"+req.body.name+"' where id="+ req.params.id +"", function (err, data) {
        if(err){
            return res.send({error: err});
        }
        return res.send({data : data});
    })
});

app.post('/delete', function(req, res) {
    var query = "delete from prod_details where id = "+req.query.id+"";
    sql.executeSql(query, function (err, data) {
        if(err){
            return res.send({error: err});
        }
        return res.send({data : data});
    })
});

//end routes
var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})

