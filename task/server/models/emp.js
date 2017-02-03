/**
 * Created by lcom73 on 2/2/17.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var empSchema   = new Schema({
    name: String,
    email: String,
    gender: String,
    status: Boolean,
    state: String,
    city: String,
    profileimg: String,
});

module.exports = mongoose.model('Employee', empSchema);