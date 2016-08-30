var router = require('express').Router();
var path = require('path');
var multer  = require('multer');
var uploadSig = multer({ dest: './sigfile/' });
var uploadHeader = multer({ dest: './headers/' });









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




router.post('/', upload.single('file'), function (req, res) {
  console.log('file uploaded:', req.file.path);
  res.send(req.file.path);
  // req.file is the `photo` file
  // req.body will hold the text fields, if there were any
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
  fs.readdir('./public/photos', function(err, files){
    if(!err){
      console.log(files);
      res.send(files);
    } else {
      console.log(err);
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
