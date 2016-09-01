var router = require('express').Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var Template = require('../models/template');


//original templates
  var template1= {
    p1: 'Thank you for believing in a world without hunger and poverty. And not just believing in such a world, but making it possible. Because of your generosity, communities around the world are gaining safe water and putting more food on the table.',
    p2: 'It\'s clear that you see the value in helping people help themselves. But I want you to know what a profound impact your gift can have on someone\'s life. Read what Aissatou Ly, Senegalese farmer and business owner, told us:',
    p3: 'Your gift helps women like Aissatou start businesses, earn an income, and send their kids to school-or go themselves. You make success stories like Aissatou\'s possible. And I can\'t thank you enough.',
    p4: '',
    q: "Six months ago I bought a CTI grinder. I provide grinding services to other women and grind about 10 kg of peanut butter a day and sell it at the weekly market. I'm proud, as a woman, to be a leader and have respect in my community. I'm proud that I don't need to ask for help.",
    ps: 'P.S. Please get in touch with me if you have any questions about our programs or CTI in general (alexandra@compatibletechnology.org). And thanks again for your generosity and support!',
    img: 'photos/getDbImages/57c731de4d518a43ce1bc04d',
    img2: '',
    img3: '',
    img4: '',
    temp: '1',
    ps: 'P.S. Please get in touch with me if you have any questions about our programs or CTI in general (alexandra@compatibletechnology.org). And thanks again for your generosity and support!',
    senderName:'Alexandra Spieldoch',
    senderTitle: 'Executive Director'
  };
  var template2= {
    p1: 'Thank you for believing in a world without hunger and poverty. And not just believing in such a world, but making it possible. Because of your generosity, communities around the world are gaining safe water and putting more food on the table.',
    p2: 'It\'s clear that you see the value in helping people help themselves. But I want you to know what a profound impact your gift can have on someone\'s life. Read what Aissatou Ly, Senegalese farmer and business owner, told us:',
    p3: 'Your gift helps women like Aissatou start businesses, earn an income, and send their kids to school-or go themselves. You make success stories like Aissatou\'s possible. And I can\'t thank you enough.',
    p4: '',
    q: "Six months ago I bought a CTI grinder. I provide grinding services to other women and grind about 10 kg of peanut butter a day and sell it at the weekly market. I'm proud, as a woman, to be a leader and have respect in my community. I'm proud that I don't need to ask for help.",
    ps: 'P.S. Please get in touch with me if you have any questions about our programs or CTI in general (alexandra@compatibletechnology.org). And thanks again for your generosity and support!',
    img: 'photos/getDbImages/57c731d54d518a43ce1bc04c"',
    img2: '',
    img3: '',
    img4: '',
    temp: '2',
    ps: 'P.S. Please get in touch with me if you have any questions about our programs or CTI in general (alexandra@compatibletechnology.org). And thanks again for your generosity and support!',
    senderName:'Alexandra Spieldoch',
    senderTitle: 'Executive Director'
  };
  var template3= {
    p1: 'Thank you for believing in a world without hunger and poverty. And not just believing in such a world, but making it possible. Because of your generosity, communities around the world are gaining safe water and putting more food on the table.',
    p2: 'It\'s clear that you see the value in helping people help themselves. But I want you to know what a profound impact your gift can have on someone\'s life. Read what Aissatou Ly, Senegalese farmer and business owner, told us:',
    p3: 'Your gift helps women like Aissatou start businesses, earn an income, and send their kids to school-or go themselves. You make success stories like Aissatou\'s possible. And I can\'t thank you enough.',
    p4: '',
    q: "Six months ago I bought a CTI grinder. I provide grinding services to other women and grind about 10 kg of peanut butter a day and sell it at the weekly market. I'm proud, as a woman, to be a leader and have respect in my community. I'm proud that I don't need to ask for help.",
    ps: 'P.S. Please get in touch with me if you have any questions about our programs or CTI in general (alexandra@compatibletechnology.org). And thanks again for your generosity and support!',
    img: 'photos/getDbImages/57c731de4d518a43ce1bc04d',
    img2: 'photos/getDbImages/57c731d54d518a43ce1bc04c',
    img3: '',
    img4: '',
    temp: '3',
    ps: 'P.S. Please get in touch with me if you have any questions about our programs or CTI in general (alexandra@compatibletechnology.org). And thanks again for your generosity and support!',
    senderName:'Alexandra Spieldoch',
    senderTitle: 'Executive Director'
  };
  var template4= {
    p1: 'Thank you for believing in a world without hunger and poverty. And not just believing in such a world, but making it possible. Because of your generosity, communities around the world are gaining safe water and putting more food on the table.',
    p2: 'It\'s clear that you see the value in helping people help themselves. But I want you to know what a profound impact your gift can have on someone\'s life. Read what Aissatou Ly, Senegalese farmer and business owner, told us:',
    p3: 'Your gift helps women like Aissatou start businesses, earn an income, and send their kids to school-or go themselves. You make success stories like Aissatou\'s possible. And I can\'t thank you enough.',
    p4: '',
    q: "Six months ago I bought a CTI grinder. I provide grinding services to other women and grind about 10 kg of peanut butter a day and sell it at the weekly market. I'm proud, as a woman, to be a leader and have respect in my community. I'm proud that I don't need to ask for help.",
    ps: 'P.S. Please get in touch with me if you have any questions about our programs or CTI in general (alexandra@compatibletechnology.org). And thanks again for your generosity and support!',
    img: 'photos/getDbImages/57c731d54d518a43ce1bc04c',
    img2: 'photos/getDbImages/57c731de4d518a43ce1bc04d',
    img3: 'photos/getDbImages/57c731d54d518a43ce1bc04c',
    img4: 'photos/getDbImages/57c731de4d518a43ce1bc04d',
    temp: '4',
    ps: 'P.S. Please get in touch with me if you have any questions about our programs or CTI in general (alexandra@compatibletechnology.org). And thanks again for your generosity and support!',
    senderName:'Alexandra Spieldoch',
    senderTitle: 'Executive Director'
  };
  var template5= {
    p1: 'Thank you for believing in a world without hunger and poverty. And not just believing in such a world, but making it possible. Because of your generosity, communities around the world are gaining safe water and putting more food on the table.',
    p2: 'It\'s clear that you see the value in helping people help themselves. But I want you to know what a profound impact your gift can have on someone\'s life. Read what Aissatou Ly, Senegalese farmer and business owner, told us:',
    p3: 'Your gift helps women like Aissatou start businesses, earn an income, and send their kids to school-or go themselves. You make success stories like Aissatou\'s possible. And I can\'t thank you enough.',
    p4: '',
    q: "Six months ago I bought a CTI grinder. I provide grinding services to other women and grind about 10 kg of peanut butter a day and sell it at the weekly market. I'm proud, as a woman, to be a leader and have respect in my community. I'm proud that I don't need to ask for help.",
    ps: 'P.S. Please get in touch with me if you have any questions about our programs or CTI in general (alexandra@compatibletechnology.org). And thanks again for your generosity and support!',
    img: 'photos/getDbImages/57c731ee4d518a43ce1bc04c',
    img2: 'photos/getDbImages/57c731ee4d518a43ce1bc04d',
    img3: 'photos/getDbImages/57c731d54d518a43ce1bc04c',
    img4: 'photos/getDbImages/57c731de4d518a43ce1bc04d',
    temp: '5',
    ps: 'P.S. Please get in touch with me if you have any questions about our programs or CTI in general (alexandra@compatibletechnology.org). And thanks again for your generosity and support!',
    senderName:'Alexandra Spieldoch',
    senderTitle: 'Executive Director'
  };
router.post('/addtemplates', function(request, response){
  var data = template1;
  var data2 = template2;
  var data3= template3;
  var data4 = template4;
  var data5 = template5;
  Template.create({
    p1: data.p1,
    p2: data.p2,
    p3: data.p3,
    p4: data.p4,
    quote: data.q,
    img: data.img,
    img2: data.img2,
    img3: data.img3,
    img4: data.img4,
    temp: data.temp,
    ps: data.ps,
    senderName: data.senderName,
    senderTitle: data.senderTitle
  }, function(err){
    if(err){
      console.log('add template err');
    }
    else{
      console.log('add template success');
    }
  });
  Template.create({
    p1: data2.p1,
    p2: data2.p2,
    p3: data2.p3,
    p4: data2.p4,
    quote: data2.q,
    img: data2.img,
    img2: data2.img2,
    img3: data2.img3,
    img4: data2.img4,
    temp: data2.temp,
    ps: data2.ps,
    senderName: data2.senderName,
    senderTitle: data2.senderTitle
  }, function(err){
    if(err){
      console.log('add template err');
    }
    else{
      console.log('add template success');
    }
  });
  Template.create({
    p1: data3.p1,
    p2: data3.p2,
    p3: data3.p3,
    p4: data3.p4,
    quote: data3.q,
    img: data3.img,
    img2: data3.img2,
    img3: data3.img3,
    img4: data3.img4,
    temp: data3.temp,
    ps: data3.ps,
    senderName: data3.senderName,
    senderTitle: data3.senderTitle
  }, function(err){
    if(err){
      console.log('add template err');
    }
    else{
      console.log('add template success');
    }
  });
  Template.create({
    p1: data4.p1,
    p2: data4.p2,
    p3: data4.p3,
    p4: data4.p4,
    quote: data4.q,
    img: data4.img,
    img2: data4.img2,
    img3: data4.img3,
    img4: data4.img4,
    temp: data4.temp,
    ps: data4.ps,
    senderName: data4.senderName,
    senderTitle: data4.senderTitle
  }, function(err){
    if(err){
      console.log('add template err');
    }
    else{
      console.log('add template success');
    }
  });
  Template.create({
    p1: data5.p1,
    p2: data5.p2,
    p3: data5.p3,
    p4: data5.p4,
    quote: data5.q,
    img: data5.img,
    img2: data5.img2,
    img3: data5.img3,
    img4: data5.img4,
    temp: data5.temp,
    ps: data5.ps,
    senderName: data5.senderName,
    senderTitle: data5.senderTitle
  }, function(err){
    if(err){
      console.log('add template err');
    }
    else{
      console.log('add template success');
    }
  });
  response.sendStatus(200);
});
router.get('/getTemplates', function(req, res){
  Template.find({}, function(err, templates){
    if(err){
      console.log('find templates err');
    }
    else{
      res.send(templates);
    }
  })
});
router.post('/saveTemplate', function(req, res){
  console.log(req.body);
  var id=req.body._id;
  var updateObj={};
  updateObj.p1=req.body.p1;
  updateObj.p2=req.body.p2;
  updateObj.p3= req.body.p3;
  updateObj.p4= req.body.p4;
  updateObj.quote = req.body.quote;
  updateObj.ps = req.body.ps;
  updateObj.img = req.body.img;
  updateObj.img2 = req.body.img2;
  updateObj.img3 = req.body.img3;
  updateObj.img4 = req.body.img4;
  updateObj.senderTitle = req.body.senderTitle;
  updateObj.senderName = req.body.senderName;
  console.log(updateObj);
  // res.sendStatus(200);
  Template.findByIdAndUpdate(id, {$set:{p1: updateObj.p1, p2: updateObj.p2, p3: updateObj.p3, p4: updateObj.p4, quote: updateObj.quote, ps:updateObj.ps, img: updateObj.img, img2: updateObj.img2, img3: updateObj.img3, img4: updateObj.img4, senderName: updateObj.senderName, senderTitle: updateObj.senderTitle}}, function(err, response){
    if(err){
      console.log('here', err);
    }else{
      res.sendStatus(200);
    }
  })
})
module.exports = router;
