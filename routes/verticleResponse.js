var router = require('express').Router();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var accessToken = {};
var request = require('request');

//Authentication
router.get('/' , function(req, res){
  var code = req.query.code;
  console.log('this is the code' , code);
  if(code == undefined) {
    res.redirect('/');
  } else {
    request({
      url: 'https://vrapi.verticalresponse.com/api/v1/oauth/access_token',
      qs: {
        client_id : 'prsyeu8hbmh4f56ht6jctw5w',
        client_secret: 'panntGZgGdPGQT3P8hrKHtPC',
        redirect_uri: 'http://localhost:3000/email',
        code: code
      },
      json: true
    }, function(err, message, body){
      console.log('Err' , err);
      console.log('body' , typeof body);
      accessToken = body.access_token;
      console.log('accessToken', accessToken);
      if(body.access_token == undefined) {
        res.redirect('/');
      } else {
        res.redirect('/');
      }
    });
  }
});

// //creatContact
// router.post('/createcontact', function(req, res){
//   var email = req.body;
//   console.log(email);
//
//   request({
//     url: 'https://vrapi.verticalresponse.com/api/v1/messages/emails/18691697686504',
//     headers: {
//       'Authorization': 'Bearer ' + accessToken,
//       'Content-Type: application/json'
//     },
//     data: {
//       "email": 'justindoty12@gmail.com',
//     }
// });
// });

// qs: {
//   name: "Testing",
//   subject: "Does This Work?",
//   company: "Prime",
//   from_address: "justindoty12@gmail.com",
//   from_label: "Prime",
//   message: "This Sucks!",
//   postal_address: "1234 main street"
// }
module.exports = router;
