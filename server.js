var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session');
var LocalStrategy = require('passport-local');
var index = require('./routes/index');
var salesforce = require('./routes/salesforce2.js');
var verticleResponse = require('./routes/verticleResponse.js');
var email = require('./routes/email.js');
var app = express();
var request = require('request');
var fs = require('fs');
var mongoose = require('mongoose');
var donor = require('./routes/donor');


//parse request
app.use(bodyParser.json());
//serve static files
app.use(express.static('public'));

app.use(session({
  secret: 'secret',
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: {maxage: 600000, secure: false}
}));

//routes
app.use('/', index);
app.use('/salesforce', salesforce);
app.use('/donor', donor);
app.use('/email', email);
app.use('/verticleResponse', verticleResponse);


var db = mongoose.connect('mongodb://localhost/donorCollection').connection;

db.once('open', function() {
  console.log('Connected to MongoDB');
});

var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log("Listening on port", port);
});
