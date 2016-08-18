const router = require('express').Router();
const path = require('path');
require('dotenv').config();
const jsforce = require('jsforce');

router.get('/oauth2/auth', function(request, response){
  response.redirect(oauth2.getAuthorizationUrl({}));
});

const oauth2 = new jsforce.OAuth2({
  clientId : process.env.SF_CLIENT_ID,
  clientSecret : process.env.SF_CLIENT_SECRET,
  redirectUri : process.env.SF_CALLBACK_URL
})

console.log({clientId : process.env.SF_CLIENT_ID,
  clientSecret : process.env.SF_CLIENT_SECRET,
  redirectUri : process.env.SF_CALLBACK_URL});

router.get('/oauth2/callback', function(request, response){
  var conn = new jsforce.Connection({oauth2: oauth2});
  var code = request.param('code');
  conn.authorize(code, function(err, userInfo){
    if(err){
      return console.log(err);
    }

    console.log('accessToken: ' + conn.accessToken);
    console.log('connRefreshToken' + conn.refreshToken);
    console.log('Instance url: ' + conn.instanceUrl);
    console.log('user id: ' + userInfo.id);
    console.log('org id: ' + userInfo.organizationId);
    // request.session.accessToken = conn.accessToken;
    // request.sesion.instanceUrl = conn.instanceUrl;
    response.send('it works');
  });
});

module.exports = router;
