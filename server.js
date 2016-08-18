var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session');
var LocalStrategy = require('passport-local');
var index = require('./routes/index');
var app = express();

//parse request
app.use(bodyParser.json());
//serve static files
app.use(express.static('public'));
//routes
app.use('/', index);


var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log("Listening on port", port);
});
