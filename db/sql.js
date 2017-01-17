var mysql = require('mysql');
var connection = require("./database");

exports.executeSql = function (sql, callback) {
    var connect = mysql.createConnection(connection.dbconfig);
    connect.connect(function (err) {
        if (!err) {
            connect.query(sql, function (err, data) {
                if (!err) {
                    connect.end();
                    callback(null, data);
                }
                else {
                    connect.end();
                    console.log(err);
                    err.status = 500;
                    callback(err, null);
                }
            });

        }
        else {
            connect.end();
            console.log(err);
            err.status = 500;
        }
    });
};
