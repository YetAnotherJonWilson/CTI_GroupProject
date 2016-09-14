var router = require('express').Router();
var passport = require('passport');
var path = require('path');

router.post('/', passport.authenticate('local'), function(request, response){
  // console.log('it worked? /routes/login/');
  response.sendStatus(200);
});

module.exports = router;
