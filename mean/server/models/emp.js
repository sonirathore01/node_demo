/**
 * Created by lcom73 on 28/1/17.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var empSchema   = new Schema({
    emp_id: {type:Number,unique:true},
    name: String,
    department: String,
    username: String,
    password: String
});

module.exports = mongoose.model('Empl', empSchema);