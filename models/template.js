var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var templateSchema = new Schema({
  p1: String,
  p2: String,
  p3: String,
  p4: String,
  quote: String,
  img: String,
  img2: String,
  img3: String,
  img4: String,
  temp: String,
  ps: String,
  senderName: String,
  senderTitle: String
});

module.exports = mongoose.model('Template', templateSchema);
