var router = require('express').Router();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var accessToken = {};
var request = require('request');
var Hogan = require('hogan.js');
var fs = require('fs');
var nodemailer = require('nodemailer');



var image1 = "https://dl.dropboxusercontent.com/u/566253206/sampleimage.jpg";
var image2 = "https://dl.dropboxusercontent.com/u/566253206/sampleimage2.jpg";
var image3 = "https://dl.dropboxusercontent.com/u/566253206/sampleimage3.jpg";
var image4 = "https://dl.dropboxusercontent.com/u/566253206/sampleimage4.jpg";
var image5 = "https://dl.dropboxusercontent.com/u/566253206/ + {{image}}sampleimage5.jpg";

var template1 = './public/emails/customTemplate1.hjs';
var template2 = './public/emails/customTemplate2.hjs';
var template3 = './public/emails/customTemplate3.hjs';
var template4 = './public/emails/customTemplate4.hjs';
var template5 = './public/emails/customTemplate5.hjs';


router.post('/sendMail', function(request, response){
  var data = request.body;
  console.log('sendMail request.body', request.body);

  var template = fs.readFileSync(template1, 'utf-8');
  var compiledTemplate = Hogan.compile(template);
  console.log('ENV' , process.env.emailusername);
  // console.log(mailData.customer.customer_email);

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.emailuser,
      pass: process.env.emailpass,
    }
  });
  var mailOptions = {
    from: 'CTI GROUP <ctithankyou@gmail.com',
    to: 'ctithankyou@outlook.com',
    subject: 'Thank You',
    text: 'Thank You for donating!',

    html: compiledTemplate.render({
    para1: data.p1,
    para2: data.p2,
    quote: data.q,
    image: image2,
    imageL: image1,
    imageR: image5
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
