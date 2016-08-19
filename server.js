var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var index = require('./routes/index');
var salesforce = require('./routes/salesforce2.js');
var verticleResponse = require('./routes/verticleResponse.js');
var email = require('./routes/email.js');
var app = express();
var request = require('request');
var fs = require('fs');
var mongoose = require('mongoose');
var donor = require('./routes/donor');
var User = require('./models/users');


//parse request
app.use(bodyParser.json());
//serve static files
app.use(express.static('public'));

app.use(session({
  secret: 'mmmbutter',
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: {maxage: 600000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use('local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function(username, password, done) {
  User.findAndComparePassword(username, password, function(err, isMatch, user){
    if (err) {
      return done(err);
    }

    if (isMatch) {
      // successfully auth the user
      return done(null, user);
    } else {
      done(null, false);
    }
  });
}));

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});

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

// User.create({username: 'admin', password: 'x1.f1v3' }, function(err){
//   if(err){
//     console.log('Create error', err);
//   } else {
//     console.log('Saved successfully');
//   }
// });

var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log("Listening on port", port);
});
