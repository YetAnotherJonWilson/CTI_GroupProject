var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var donorSchema = new Schema({
    orgName: String,
    formalGreeting: String,
    informalGreeting: String,
    mailStreet: String,
    mailCity: String,
    mailState: String,
    mailZip: Number,
    amount: Number,
    giftDate: Date,
    closeDate: Date,
    recognition: String,
    primaryEmail: String,
    primaryCampaignSource: String,
    giftType: String,
    writtenDesignation: String,
    honorMemorialType: String,
    honoreeName: String,
    stockName: String,
    numberOfShares: Number
    });

var Donor = mongoose.model('Donor', donorSchema);

module.exports = Donor;