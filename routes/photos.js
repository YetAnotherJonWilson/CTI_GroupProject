var router = require('express').Router();
var path = require('path');
var multer  = require('multer');
var uploadSig = multer({ dest: './sigfile/' });
var uploadHeader = multer({ dest: './headers/' });
var bodyParser = require('body-parser');
var fs = require('fs');





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







module.exports = router;
