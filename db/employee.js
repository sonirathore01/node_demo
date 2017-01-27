/**
 * Created by lcom73 on 27/1/17.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var empSchema   = new Schema({
    name: String,
    department: String,
    username: String,
    password: String
});

module.exports = mongoose.model('Empl', empSchema);
