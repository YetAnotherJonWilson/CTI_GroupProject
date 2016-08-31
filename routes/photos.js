var router = require('express').Router();
var path = require('path');
var multer  = require('multer');
var uploadSig = multer({ dest: './sigfile/' });
var uploadHeader = multer({ dest: './headers/' });
var bodyParser = require('body-parser');
var fs = require('fs');
var Img = require('../models/image');


router.use(bodyParser.json());


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/photos/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
    console.log(file.mimetype);
  }
})

var upload = multer({ storage: storage });

router.post('/deletePhoto', function(req, res) {
  console.log('trying to delete');
  console.log('req.body' , req.body.photo );
  var filePath = "public/photos/" + req.body.photo;
  fs.unlinkSync(filePath);
  res.sendStatus(200);
});



router.post('/', upload.single('file'), function (req, res) {
  var image = new Img;
  imgPath = req.file.path;
  image.img.data = fs.readFileSync(imgPath);
  image.img.contentType = 'image/png';
  image.save(function(err, image){
    if(err){
      console.log('error saving image', err);
    }
    else{
      console.log('success saving image to mongdb');
    }
  });
  console.log('file uploaded:', req.file.path);
  res.send(req.file.path);
  // req.file is the `photo` file
  // req.body will hold the text fields, if there were any
});

router.get('/getDbImages', function(req, res, next){
  var base64 = [];
  Img.find({}, function(err, doc){
    if(err){
      return next(err);
    }
    else{
      console.log('doc', doc);
      for(var i = 0; i < doc.length; i++){
        base64.push('data:image/jpeg;base64,' + doc[i].img.data.toString('base64'));
      }
      res.contentType(doc[0].img.contentType);
      res.send(base64);
    }
  });
});

router.post('/sigfile', uploadSig.single('file'), function (req, res) {
  console.log('file uploaded:', res.file);
  res.sendStatus(200);
  // req.file is the `photo` file
  // req.body will hold the text fields, if there were any
});
router.post('/headers', uploadHeader.single('file'), function (req, res) {
  console.log('file uploaded:', res.file);
  res.sendStatus(200);
  // req.file is the `photo` file
  // req.body will hold the text fields, if there were any
});
router.get('/createphotoarray', function(req, res) {
  // fs.readdir('./public/photos', function(err, files){
  //   if(!err){
  //     console.log(files);
  //     res.send(files);
  //   } else {
  //     console.log(err);
  //   }
  // });
  Img.find({}, function(err, doc){
    if(err){
      return next(err);
    }
    else{
      var photos = [];
      console.log('doc', doc);
      for(var i = 0; i < doc.length; i++){
        photos.push('data:image/jpeg;base64,' + doc[i].img.data.toString('base64'));
      }
      res.contentType(doc[0].img.contentType);
      res.send(photos);
    }
  });
});

router.get('/createsignaturearray', function(req, res) {
  fs.readdir('./public/sigfile', function(err, files){
    if(!err){
      console.log(files);
      res.send(files);
    } else {
      console.log(err);
    }
  });
});

router.get('/createheaderarray', function(req, res) {
  fs.readdir('./public/headers', function(err, files){
    if(!err){
      console.log(files);
      res.send(files);
    } else {
      console.log(err);
    }
  });
});








module.exports = router;
