/**
 * Created by lcom73 on 31/1/17.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var empSchema   = new Schema({
    name: String,
    username: String,
    password: String
});

module.exports = mongoose.model('Employee', empSchema);
