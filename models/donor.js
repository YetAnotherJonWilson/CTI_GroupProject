var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var donorSchema = new Schema({
  opportunityId: String,
  contactId: String,
  accountId: String,
  closeDate:  Date,
  sentDate: Date,
  householdId: String,
  paragraph1: String,
  paragraph2: String,
  paragraph3: String,
  paragraph4: String,
  paragraph5: String,
  quote: String,
  picture1: String,
  picture2: String,
  picture3: String,
  picture4: String,
  letterhead: String,
  signature: String,
  template: String,
});


module.exports = mongoose.model('Donor', donorSchema);
