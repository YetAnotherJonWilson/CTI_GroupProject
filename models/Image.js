var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// var ImageSchema = new Schema({
//   image: String;
// });
//
//
// module.exports = mongoose.model('Image', ImageSchema);

var imageSchema = new Schema({
  img: {
    data: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model('Image', imageSchema);
