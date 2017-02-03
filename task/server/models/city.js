/**
 * Created by lcom73 on 2/2/17.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var citySchema   = new Schema({
    City_Name: String,
    State_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State'
    }
});
module.exports = mongoose.model('City', citySchema);
