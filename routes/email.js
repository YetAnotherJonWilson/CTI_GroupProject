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
var image5 = "https://dl.dropboxusercontent.com/u/566253206/sampleimage5.jpg";


var template1 = './public/emails/customTemplate1.hjs';
var template2 = './public/emails/customTemplate2.hjs';
var template3 = './public/emails/customTemplate3.hjs';
var template4 = './public/emails/customTemplate4.hjs';
var template5 = './public/emails/customTemplate5.hjs';


router.post('/sendMail', function(request, response){
  var data = request.body;
  console.log('sendMail request.body', request.body);

  // var template = fs.readFileSync(template1, 'utf-8');
  var temp = data.template;
  var template = fs.readFileSync('./public/emails/customTemplate'+temp+'.hjs', 'utf-8');
  console.log(template);
  var compiledTemplate = Hogan.compile(template);
  console.log('ENV' , process.env.emailuser);
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
    to: "ctithankyou@outlook.com",
    subject: 'Thank You',
    text: 'Thank You for donating!',

    html: compiledTemplate.render({
    p1: data.p1,
    p2: data.p2,
    p3: data.p3,
    p4: data.p4,
    quote: data.q,
    img1: data.img,
    img2: data.img2,
    img3: data.img3,
    img4: data.img4,
    ps: data.ps,
    senderName: data.senderName,
    senderTitle: data.senderTitle,
    name: data.firstName,
    amount: data.amount,
    date: data.date
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
