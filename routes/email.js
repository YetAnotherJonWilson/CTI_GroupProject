var router = require('express').Router();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var accessToken = {};
var request = require('request');
var Hogan = require('hogan.js');
var fs = require('fs');
var nodemailer = require('nodemailer');



// var template = fs.readFileSync('./public/emails/email.hjs', 'utf-8');
// var compiledTemplate = Hogan.compile(template);

router.post('/sendMail/:id', function(request, response){
  var mailid = request.params.id;
  var mailData = request.body;
  console.log('ENV' , process.env.username);
  console.log(mailData.customer.customer_email);
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.username,
      pass: process.env.password,
    }
  });
  var mailOptions = {
    from: 'Golf Usa <gusarewards@gmail.com',
    to: mailData.customer.customer_email,
    subject: 'Rewards Info',
    text: 'Thank you for your purchase ' + mailData.customer.customer_FirstName + ".\n" + "Punches = " + mailData.customer.punches + ".\n" + "Rewards = " + mailData.customer.rewards + ".",
    html: compiledTemplate.render({
    firstName: mailData.customer.customer_FirstName,
    lastName: mailData.customer.customer_LastName,
    punches: mailData.customer.punches,
    rewards: mailData.customer.rewards}),
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
