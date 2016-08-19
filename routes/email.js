var router = require('express').Router();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var accessToken = {};
var request = require('request');
var Hogan = require('hogan.js');
var fs = require('fs');
var nodemailer = require('nodemailer');



<<<<<<< HEAD
// var template = fs.readFileSync('./public/emails/email.hjs', 'utf-8');
// var compiledTemplate = Hogan.compile(template);

router.post('/sendMail/:id', function(request, response){
  var mailid = request.params.id;
  var mailData = request.body;
  console.log('ENV' , process.env.username);
  console.log(mailData.customer.customer_email);
=======


router.post('/sendMail', function(request, response){
  var data = request.body;
  console.log('sendMail request.body', request.body);

  var template = fs.readFileSync('./public/emails/template1.hjs', 'utf-8');
  var compiledTemplate = Hogan.compile(template);
  console.log('ENV' , process.env.emailusername);
  // console.log(mailData.customer.customer_email);


>>>>>>> 0d56e904ce0465ee2f924100252889b2600bbc5e
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'gusarewards@gmail.com',
      pass: 'golfusaadmin',
    }
  });
  var mailOptions = {
    from: 'CTI GROUP <gusarewards@gmail.com',
    to: 'justindoty12@gmail.com',
    subject: 'Thank You',
    text: 'Thank You for donating!',

    html: compiledTemplate.render({
    para1: data.p1,
    para2: data.p2,
    quote: data.q,
    // para3: chosenTemplate.p3,
    }),
};


  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log('There was an error', error);
      response.sendStatus(500);
    } else {
      console.log('Message Sent', info.response);
      response.sendStatus(200);
    }
  });
});






module.exports = router
