/**
 * Created by lcom73 on 23/1/17.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var img_schema   = new Schema({
    img: {data: Buffer,contentType: String }
});

module.exports = mongoose.model('Img', img_schema);
