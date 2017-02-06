/**
 * Created by lcom73 on 31/1/17.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var custSchema   = new Schema({

    name: {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Custlist'
    },
    parent: String,
    profile: String
});

module.exports = mongoose.model('cust', custSchema);
