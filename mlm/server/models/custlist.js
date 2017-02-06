/**
 * Created by lcom73 on 6/2/17.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

    var custSchema   = new Schema({

       name: String

});

module.exports = mongoose.model('Custlist', custSchema);