var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session');
var LocalStrategy = require('passport-local');
var index = require('./routes/index');
var salesforce = require('./routes/salesforce.js');
var app = express();

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




var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log("Listening on port", port);
});
