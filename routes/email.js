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

function GetFormattedDate() {
    var todayTime = new Date();
    var month = todayTime .getMonth() + 1;
    var day = todayTime .getDate();
    var year = todayTime .getFullYear();
    return month + "/" + day + "/" + year;
}


router.post('/sendMail', function(request, response){
  var data = request.body;
  var sendDate = GetFormattedDate();
  console.log('sendMail request.body ------', data);

  // var template = fs.readFileSync(template1, 'utf-8');
  var temp = data.template;
  console.log('email template', temp);
  var template = fs.readFileSync('./public/emails/customTemplate'+temp+'.hjs', 'utf-8');
  // console.log(template);
  var compiledTemplate = Hogan.compile(template);
  console.log('ENV email user' , process.env.emailuser);
  // console.log(mailData.customer.customer_email);

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.emailuser,
      pass: process.env.emailpass
    }
  });

  // console.log('img1', 'https://ctithankyou.herokupp.com/photos/' + data.img);
  // console.log('img2', data.img2);
  // console.log('img3', data.img3);
  // console.log('img4', data.img4);
  console.log('paragreaphs in emails???', data.p1, data.p2, data.p3, data.ps, data.qoute);
  // console.log('sig?????', data);

  var mailOptions = {
    from: 'CTI GROUP <ctithankyou@gmail.com',
    to: request.body.email,
    subject: 'Thank You',
    text: 'Thank You for donating!',

    html: compiledTemplate.render({
    header: 'https://ctithankyou.herokuapp.com/photos/header/' + data.header,
    sig: 'https://ctithankyou.herokuapp.com/photos/sig/' + data.sig,
    p1: data.p1,
    p2: data.p2,
    p3: data.p3,
    p4: data.p4,
    quote: data.q,
    img1: 'https://ctithankyou.herokuapp.com/photos/' + data.img,
    img2: 'https://ctithankyou.herokuapp.com/photos/' + data.img2,
    img3: 'https://ctithankyou.herokuapp.com/photos/' + data.img3,
    img4: 'https://ctithankyou.herokuapp.com/photos/' + data.img4,
    ps: data.ps,
    senderName: data.senderName,
    senderTitle: data.senderTitle,
    name: data.firstName,
    amount: data.amount,
    date: data.date,
    sendDate: sendDate
    })
};
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log('There was an error', error);
      response.sendStatus(500);
    } else {
      console.log('senddate', sendDate);
      console.log('Message Sent', info.response);
      response.sendStatus(200);
    }
  });
});






module.exports = router;
