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
  // var qstring= query: "SELECT Name, Amount, CloseDate, toLabel(Payment_Method__c), toLabel(StageName), RecordType.Name, Id, RecordTypeId, CreatedDate, LastModifiedDate, SystemModstamp FROM Opportunity WHERE RecordTypeId = '012d0000000b7UQ' ORDER BY Name ASC NULLS FIRST, Id ASC NULLS FIRST";
  // ?start=2010-01-25T00%3A00%3A00%2B00%3A00&end=2011-08-13T00%3A00%3A00%2B00%3A00
  // query/?q=SELECT+Name+from+Opportunity+where+CloseDate+<+2009-11-01
  // query/?q=SELECT+Name+from+Opportunity+where+CreatedDate+>+2012-04-03T21:04:49.000
  // sobjects/Opportunity/006d000000hTiXbAAK
  // 001d000000DfVkPAAV
  // npe01__Contact_Id_for_Role__c: '003d000000JJqG1AAL'
  var requestObj = {


    // url: instanceUrl + '/services/data/v37.0/sobjects/Contact/a00d0000007j6fAAAQ',
    // url: instanceUrl + '/services/data/v37.0/query/?q=SELECT+Name+,npe01__Is_Opp_from_Individual__c+,npe01__Contact_Id_for_Role__c+,AccountId+,Id+from+Opportunity+where+CreatedDate+>+2012-04-03T21:04:49Z',

    // url: instanceUrl + '/services/data/v37.0/process/rules',
    url: instanceUrl + "/services/data/v37.0/query/?q=SELECT+Id+,Name+,npe01__Is_Opp_from_Individual__c+,Amount+,CloseDate+,npe01__Contact_Id_for_Role__c+,AccountId+from+Opportunity+where+Recognition__c+=+'Email'+AND+CreatedDate+>+2016-08-20T21:04:49Z",

    headers: {
      // client_id: process.env.SF_CLIENT_ID,
      // client_secret: process.env.SF_CLIENT_SECRET,
      Authorization: 'Bearer ' + accessToken
    }
  }
  request(requestObj, function(err, response, body){
    if(err){console.log('err', err);}
    else{

      var stuff = JSON.parse(response.body);
      console.log(stuff);
      var records = stuff.records;
      for(var i=0; i<records.length; i++){
        getInfo(accessToken, instanceUrl, records[i]);
      }
    }

      //
      // var something = JSON.parse(response.body)
      // console.log(something);

  });
}
function getInfo(accessToken, instanceUrl, record){
  var requestObj = {
    url: instanceUrl + "/services/data/v37.0/query/?q=SELECT+Id+,Name+from+Contact+where+Id+=+'"+record.Primary_Contact__c+"'",
    // url: instanceUrl + '/services/data/v37.0/query/?q=SELECT+Name+,AccountId+from+Opportunity+where+CreatedDate+>+2012-04-03T21:04:49Z',
    headers: {
      // client_id: process.env.SF_CLIENT_ID,
      // client_secret: process.env.SF_CLIENT_SECRET,
      Authorization: 'Bearer ' + accessToken
    }
  }
  request(requestObj, function(err, response, body){
    if(err){console.log('err', err);}
    else{
      var stuff = JSON.parse(response.body);
      console.log(stuff);
    }
  });
}
module.exports = router;
