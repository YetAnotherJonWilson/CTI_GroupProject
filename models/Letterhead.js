var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var letterheadSchema = new Schema({
    img: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Letterhead', letterheadSchema);
