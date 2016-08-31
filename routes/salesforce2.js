const router = require('express').Router();
const path = require('path');
require('dotenv').config();
const jsforce = require('jsforce');
var request = require('request');
var rp = require('request-promise');
var mongoose = require('mongoose');
var Donor = require('../models/donor');
var opportunities=[];
var contacts=[];
var accounts =[];
var households=[];
var everything=[];
var opportunitiesOverview = [];
var contactsOverview = [];
var accountsOverview = [];
var householdsOverview = [];
var overview = [];
var dbDonors = {};
var version= '';

router.get('/data', function(request, response){
  everything=[opportunities, contacts, accounts, households];
  response.send(everything);
});

router.get('/oauth2/auth', function(request, response){
  getStartUrl();
  console.log("hellos");
  getSentDbStuff('/sentDonors');
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
    request.session.accessToken = conn.accessToken;
    request.session.instanceUrl = conn.instanceUrl;
    console.log('work please');

    getOpps(request.session.accessToken, request.session.instanceUrl).then(function(everything){
      // everything = everything;
      console.log('great success');
      // response.redirect('/gettingdata');
      response.redirect('/home');
    });
  });
  // response.redirect('/home');
});

function getStartUrl(){
 console.log('here');
 request("https://cti.my.salesforce.com/services/data", function(err, response, body){
   if(err){console.log('err', err);}
   else{
     var stuff=JSON.parse(response.body);
    //  console.log(stuff);
     version=stuff[stuff.length-1].url;
     console.log(version);
   }
 });
}

function getOpps(accessToken, instanceUrl){
   opportunities=[];
   contacts=[];
   accounts =[];
   households=[];
  var requestObj = {
    // url: instanceUrl + '/services/data/v37.0/limits',
    // url: instanceUrl + version + '/sobjects/Contact/003d0000037X5yoAAC',
    url: instanceUrl + version + "/query/?q=SELECT+Id+,Name+,npe01__Is_Opp_From_Individual__c+,Amount+,CloseDate+,Primary_Contact__c+,npe01__Contact_Id_for_Role__c+,AccountId+from+Opportunity+where+Recognition__c+=+'Email'+AND+CreatedDate+>+2016-08-20T21:04:49Z",
    headers: {
      Authorization: 'Bearer ' + accessToken
    },
    json: true
  }
  return rp(requestObj).then(function(response){
    // if(err){console.log('err 76', err);}
    // else{

      // var stuff = JSON.parse(response);
      var stuff = response;
      // console.log(stuff.records.length);

      for(var i=0; i<stuff.records.length; i++){
        for(var j = 0; j < dbDonors.length; j++){
          if(dbDonors[j].opportunityId == stuff.records[i].Id){
            stuff.records.splice(i, 1);
            j = -1;
          }
        }
        opportunities.push(stuff.records[i]);
        getContact(accessToken, instanceUrl, stuff.records[i]);
        getAccount(accessToken, instanceUrl, stuff.records[i].AccountId);
        // everything=[opportunities, contacts, accounts, households];

      }
      return stuff;
      // return everything;
      // done=true;
    // }
  }).catch(function(response){
    console.log('dumb error', response);
  });
}
function getContact(accessToken, instanceUrl, record){
  var requestObj = {
    url: instanceUrl + version + "/query/?q=SELECT+Id+,Name+,Phone+,Email+,AccountId+,Greeting__c+,Professional_Suffix__c+,Gender__c+,Salutation+,MailingAddress+,npo02__Household__c+from+Contact+where+Id+=+'"+record.Primary_Contact__c+"'",
    headers: {
      Authorization: 'Bearer ' + accessToken
    },
    json: true
  }
  return rp(requestObj).then(function(response){
    // if(err){console.log('err 5', err);}
    // else{
      var stuff = response;
      // console.log(stuff);
      contacts.push(stuff.records[0]);
      getHousehold(accessToken, instanceUrl, stuff.records[0].npo02__Household__c);
      return contacts;
    // }
  }).catch(function(err){
    console.log('another err', err);
  });
}
function getHousehold(accessToken, instanceUrl, household){
  var requestObj = {
    url: instanceUrl + version + "/query/?q=SELECT+Id+,Name+,npo02__Addressee__c+,npo02__Formula_MailingAddress__c+,npo02__HouseholdEmail__c+,npo02__HouseholdPhone__c+,npo02__Formal_Greeting__c+,npo02__Informal_Greeting__c+from+npo02__Household__c+where+Id+=+'"+household+"'",
    headers: {
      Authorization: 'Bearer ' + accessToken
    },
    json: true
  }
  return rp(requestObj).then(function(response){
    // if(err){console.log('err 6', err);}
    // else{
      var stuff = response;
      // console.log(stuff);
      households.push(stuff.records[0]);
      return households;
    // }
  }).catch(function(err){
    console.log('wtf another one');
  });
}
function getAccount(accessToken, instanceUrl, AccountId){
  var requestObj = {
    url: instanceUrl + version + "/query/?q=SELECT+Id+,Name+,BillingAddress+,Phone+,npe01__LifetimeDonationHistory_Amount__c+,npe01__LifetimeDonationHistory_Number__c+,npo02__AverageAmount__c+,Formal_Salutation__c+,Informal_Greeting__c+,Main_Contact__c+,Organization_Email__c+from+Account+where+Id+=+'"+AccountId+"'",
    headers: {
      Authorization: 'Bearer ' + accessToken
    },
    json: true
  }
  return rp(requestObj).then(function(response){
    // if(err){console.log('err 7', err);}
    // else{
      var stuff = response;
      // console.log(stuff);
      accounts.push(stuff.records[0]);
      return accounts;
    // }
  }).catch(function(err){
    console.log('ran out of words');
  });
}

router.post('/overview', function(request, response, callback){
  var donors = {};
  console.log('access token', request.session.accessToken);
  console.log('request url', request.session.instanceUrl);
  accessToken = request.session.accessToken;
  instanceUrl = request.session.instanceUrl;

  var donors = request.body.donors;
  console.log('donors from db', donors);
  var array = [];
  for(var i = 0; i < donors.length; i++){
    array.push(overviewInfo(accessToken, instanceUrl, donors[i]));
  }
  Promise.all(array).then(function(overview){
    console.log('promise', overview);
    response.send(overview);
  })
});

function overviewInfo(accessToken, instanceUrl, donor){
  var Id = donor.opportunityId;
  var requestObj = {
    // url: instanceUrl + version + "/query/?q=SELECT+Id+,Name+,npe01__Is_Opp_From_Individual__c+,Amount+,CloseDate+,Primary_Contact__c+,npe01__Contact_Id_for_Role__c+,AccountId+from+Opportunity+where+Id+=+includes+('" + Id + "'+,'" + Id2 + "'+,'" + Id3 + "')",
  url: instanceUrl + version + "/query/?q=SELECT+Id+,Name+,npe01__Is_Opp_From_Individual__c+,Amount+,CloseDate+,Primary_Contact__c+,npe01__Contact_Id_for_Role__c+,AccountId+,+Account.Name+,Account.npe01__LifetimeDonationHistory_Number__c+,Account.npe01__LifetimeDonationHistory_Amount__c+,Account.Organization_Email__c+,Account.Main_Contact__c+,Account.npo02__AverageAmount__c+from+Opportunity+where+Id+=+'" + Id + "'",
    headers: {
      Authorization: 'Bearer ' + accessToken
    },
    json: true
  }
  return rp(requestObj).then(function(response){
    var stuff = response;
    // console.log('opp response', stuff);
    return contactOverview(accessToken, instanceUrl, stuff.records[0]);
  }).catch(function(err){
    console.log('opp overview err', err);
  });
}

function contactOverview(accessToken, instanceUrl, record){
  contactId = record.Primary_Contact__c;
  var requestObj = {
    url: instanceUrl + version + "/query/?q=SELECT+Id+,Name+,Email+,npo02__AverageAmount__c+,npe01__Type_of_Account__c+,npo02__Household__r.Name+,npo02__Household__r.npo02__HouseholdEmail__c+from+Contact+where+Id+=+'" + contactId + "'",
    headers: {
      Authorization: 'Bearer ' + accessToken
    },
    json: true
  }

  return rp(requestObj).then(function(response){
    var stuff = response;
    // console.log('contact stuff', stuff);
    record.Contact = stuff.records[0];

    return record;
  }).catch(function(err){
    console.log('contact overview err', err);
  });
}

function getSentDbStuff(){
  dbDonors = {};
  Donor.find({}, function(err, donors){
    if(err){
      console.log('err getting sent donors', err);
      return err;
    }
    else{
      // console.log('sent donors from db', donors);
      dbDonors = donors;
      return donors;
    }
  });
}


module.exports = router;
