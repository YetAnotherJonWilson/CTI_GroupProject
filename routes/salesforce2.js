const router = require('express').Router();
const path = require('path');
require('dotenv').config();
const jsforce = require('jsforce');
var request = require('request');

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
  // console.log(code);
  conn.authorize(code, function(err, userInfo){
    if(err){
      return console.log(err);
    }

    console.log('accessToken: ' + conn.accessToken);
    // console.log('tokenSecret: ' + conn.tokenSecret);
    console.log('connRefreshToken' + conn.refreshToken);
    console.log('Instance url: ' + conn.instanceUrl);
    console.log('user id: ' + userInfo.id);
    console.log('org id: ' + userInfo.organizationId);
    request.session.accessToken = conn.accessToken;
    request.session.instanceUrl = conn.instanceUrl;

    // getStuff(conn.accessToken, conn.instanceUrl);

    console.log('work please');
    response.redirect('/salesforce/test');
  });
});

router.get('/test', function(request, response){
  getStuff(request.session.accessToken, request.session.instanceUrl);
});


function getStuff(accessToken, instanceUrl){
  var requestObj = {
    url: instanceUrl + '/services/data/v20.0',
    headers: {
      client_id: process.env.SF_CLIENT_ID,
      client_secret: process.env.SF_CLIENT_SECRET,
      Authorization: 'Bearer ' + accessToken
    }
  }
  request(requestObj, function(err, response, body){
    if(err){console.log('err', err);}
    else{console.log(response.body);}
  });
}

module.exports = router;
