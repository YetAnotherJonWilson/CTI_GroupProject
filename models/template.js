var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var templateSchema = new Schema({
  p1: String,
  p2: String,
  p3: String,
  p4: String,
  p5: String,
  quote: String,
});

module.exports = mongoose.model('Template', templateSchema);
