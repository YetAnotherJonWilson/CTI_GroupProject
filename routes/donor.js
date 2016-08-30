var router = require('express').Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var Donor = require('../models/donor');


router.get('/sentDonors', function(request, response){
  Donor.find({}, function(err, donors){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      // console.log('donors', donors);
      response.send(donors);
    }
  })
});

router.post('/createData', function(request, response, next){
  console.log('Creating data');
  var data = request.body;
  console.log('request.body', request.body);
  // //Part 1
  // var createdDonor = new Donor({
  // // opportunityId: data.donor.opportunityId,
  // opportunityId: data.opportunityId,
  // // contactId: data.donor.Primary_Contact__c,
  // contactId: data.contactId,
  // // accountId: data.donor.AccountId,
  // accountId: data.accountId,
  // // closeDate: data.donor.CloseDate,
  // closeDate: data.closeDate,
  // sentDate: new Date(),
  // // householdId: data.donor.householdId,
  // householdId: data.householdId,
  // // paragraph1: data.p1,
  // paragraph1: data.paragraph1,
  // // paragraph2: data.p2,
  // paragraph2: data.paragraph2,
  // // paragraph3: data.p3,
  // paragraph3: data.paragraph32,
  // // paragraph4: data.p4,
  // paragraph4: data.paragraph4,
  // // paragraph5: data.p5,
  // paragraph5: data.paragraph5,
  // // quote: data.q,
  // quote: data.quote,
  // picture1: data.picture1,
  // picture2: data.picture2,
  // picture3: data.picture3,
  // picture4: data.picture4,
  // letterhead: data.letterhead,
  // signature: data.signature
  // });
  Donor.create({
    // opportunityId: '006d000000r6egeAAA',
    // contactId: '003d0000037X61sAAC',
    // accountId: '001d0000025MImRAAW',
    // closeDate: '2016-08-22',
    // sentDate: new Date(),
    // householdId: 'a00d000000mOdn5AAC',
    // paragraph1: 'paragraph 1, fjkdlas; k fdlas;j kfjl klsd kd kls lka jkasl jfla fjdsl lsa jaflsk f',
    // paragraph2: 'paragraph 2, fjkdal;jfdklsjafkldjsa jfdkslaj fklds jfdslk jkldsaj klfd kldfsa lksa; jkflds kfsla kldf jklfsa ;klafld;ksaldksa lk;a lksd alsdkfa',
    // paragraph3: 'paragraph 3 jfkls  eruwio reiuow uwioe uriewoqpo oq  jfiopiq qiro w',
    // paragraph4: 'paragraph 4 jfj  eiowu ewoiu r rweio ew ruopa epoiru  p ioerap a cnm, x',
    // paragraph5: 'paragraph 5',
    // quote: 'some sweet quote',
    // picture1: 'path for pic 1',
    // picture2: 'path for pic 2',
    // picture3: 'path for pic 3',
    // picture4: 'path for picture4',
    // letterhead: 'path for letterhead',
    // signature: 'path for signature'
    opportunityId: data.opportunityId,
    // contactId: data.donor.Primary_Contact__c,
    contactId: data.contactId,
    // accountId: data.donor.AccountId,
    accountId: data.accountId,
    // closeDate: data.donor.CloseDate,
    closeDate: data.closeDate,
    sentDate: new Date(),
    // householdId: data.donor.householdId,
    householdId: data.householdId,
    // paragraph1: data.p1,
    paragraph1: data.paragraph1,
    // paragraph2: data.p2,
    paragraph2: data.paragraph2,
    // paragraph3: data.p3,
    paragraph3: data.paragraph3,
    // paragraph4: data.p4,
    paragraph4: data.paragraph4,
    // paragraph5: data.p5,
    paragraph5: data.paragraph5,
    // quote: data.q,
    quote: data.quote,
    picture1: data.picture1,
    picture2: data.picture2,
    picture3: data.picture3,
    picture4: data.picture4,
    letterhead: data.letterhead,
    signature: data.signature
  }, function(err){
    if(err){
      console.log('donor create error', err);
    }
    else{
      console.log('create donor success');
    }
  });
  //
  // //Part 2
  // createdDonor.save();

  // Donor.save(createdDonor, function(err){
  //   if(err){
  //     console.log('Create error', err);
  //   } else {
  //     console.log('Saved successfully');
  //   }
  // });

  response.sendStatus(200);
});

// router.put('/editWithId/:id/:name?', function(request, response){
//
//     var id = request.params.id;
//     var name = request.params.name;
//
//     Donor.findById(request.params.id, function(err, donor){
//         if(err){
//             console.log(err);
//             response.sendStatus(500);
//         } else {
//
//             donor.firstName = name;
//
//             donor.save(function(err){
//                 if(err){
//                     console.log('There was an issue saving', err);
//                     response.sendStatus(500);
//                 } else {
//                     console.log('Saved with no problems, sweet!');
//                     response.sendStatus(200);
//                 }
//             });
//
//         }
//     })
//
// });

// router.delete('/removeWithId/:id', function(request, response){
//     var id = request.params.id;
//
//     Donor.findById(id, function(err, donor){
//         if(err){
//             console.log(err);
//             response.sendStatus(500);
//         } else {
//
//             employee.remove(function(err){
//                 if(err){
//                     console.log(err);
//                 }
//             });
//
//             console.log('User deleted');
//             response.sendStatus(200);
//         }
//     })
// });

module.exports = router;
