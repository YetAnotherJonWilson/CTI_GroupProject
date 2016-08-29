var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var index = require('./routes/index');
var salesforce = require('./routes/salesforce2.js');
var verticleResponse = require('./routes/verticleResponse.js');
var email = require('./routes/email.js');
var app = express();
var path = require('path');
var request = require('request');
var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: './public/photos/' });
var uploadSig = multer({ dest: './sigfile/' });
var uploadHeader = multer({ dest: './headers/' });



var index = require('./routes/index');
var donor = require('./routes/donor');
var email = require('./routes/email');
var User = require('./models/users');
var login = require('./routes/login');
var photos = require('./routes/photos');
var salesforce = require('./routes/salesforce2');
var verticleResponse = require('./routes/verticleResponse');
var Donor = require('./models/donor');
var donor = require('./routes/donor');

var app = express();
require('dotenv').config();
//parse request
app.use(bodyParser.json());
//serve static files
app.use(express.static('public'));


// process.env.MONGODB_URI will only be defined if you
// are running on Heroku
if(process.env.MONGODB_URI != undefined) {
  // use the string value of the environment variable
  databaseURI = process.env.MONGODB_URI;
} else {
  // use the local database server
  databaseURI = 'mongodb://localhost:27017/donorCollection';
}


app.use(session({
  secret: 'mmmbutter',
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: {maxage: 600000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/', index);
app.use('/index', index);
app.use('/salesforce', salesforce);
app.use('/donor', donor);
app.use('/email', email);
app.use('/verticleResponse', verticleResponse);
app.use('/login', login);
app.post('/photos', upload.single('file'), function (req, res) {
  console.log('file uploaded:', res.file);
  res.sendStatus(200);
  // req.file is the `photo` file
  // req.body will hold the text fields, if there were any
});
app.post('/sigfile', uploadSig.single('file'), function (req, res) {
  console.log('file uploaded:', res.file);
  res.sendStatus(200);
  // req.file is the `photo` file
  // req.body will hold the text fields, if there were any
});
app.post('/headers', uploadHeader.single('file'), function (req, res) {
  console.log('file uploaded:', res.file);
  res.sendStatus(200);
  // req.file is the `photo` file
  // req.body will hold the text fields, if there were any
});

app.get('/createphotoarray', function(req, res) {
  fs.readdir('./public/photos', function(err, files){
    if(!err){
      console.log(files);
      res.send(files);
    } else {
      console.log(err);
    }
  });
});

var db = mongoose.connect(databaseURI).connection;

db.on('error', function(err){
  console.log('mongodb connection error', err);
});

db.once('open', function() {
  console.log('Connected to MongoDB');
});


passport.use('local', new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'username'
  // ,
  // passwordField: 'password'
}, function(request, username, password, done) {
  // User.findAndComparePassword(username, password, function(err, isMatch, user){
  //   if (err) {
  //     return done(err);
  //   }
  //
  //   if (isMatch) {
  //     // successfully auth the user
  //     return done(null, user);
  //   } else {
  //     done(null, false);
  //   }
  // });
  console.log('server login');
  User.findOne({username: username}, function(err, user){
    if(err){
      console.log('server User.findOne err');
      return err;
    }
    if(!user){
      console.log('server User.findOne !user');
      return done(null, false, {message: 'Incorrect username and password.'});
    }
    console.log('found user now for password');
    user.comparePassword(password, function(err, isMatch){
      if(err){
        console.log('server User.comparePassword err');
        return err;
      }
      if(isMatch){
        return done(null, user);
      }
      else{
        return done(null, false, {messsage: 'Incorrect username and password.'});
      }
    });
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



// User.create({username: 'admin', password: 'x1.f1v3' }, function(err){
//   if(err){
//     console.log('Create error', err);
//   } else {
//     console.log('Saved successfully');
//   }
// });
app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

var server = app.listen(process.env.PORT || 3000, function() {
  var port = server.address().port;
  console.log("Listening on port", port);
});

