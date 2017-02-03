/**
 * Created by lcom73 on 2/2/17.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var stateSchema   = new Schema({
    State_Name: String
});

module.exports = mongoose.model('State', stateSchema);