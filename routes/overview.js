var router = require('express').Router();
var path = require('path');

// router.get('/', function(request, response){
//   response.redirect('/donor/sentDonors');
// });
//
// router.get('/donations', function(request, response){
//   response.send(path.join(__dirname, '../public/views/overview.html'));
// });

router.get('/', function(request, response){
  response.send(path.join(__dirname, '../public/views/overview.html'));
});

module.exports = router;
