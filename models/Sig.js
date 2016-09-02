var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var signatureSchema = new Schema({
    img: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Signature', signatureSchema);
