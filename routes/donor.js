var router = require('express').Router();

var Donor = require('../models/donor');

// router.get('/', function(request, response){
//     Donor.find({}, function(err, donors){
//         if(err){
//             console.log(err);
//             response.sendStatus(500);
//         } else {
//             response.send(donors);
//         }
//     })
// });

router.get('/findWithId/:id', function(request, response){
    console.log(request.params.id);
    // response.sendStatus(200);

    Donor.findById(request.params.id, function(err, donor){
        if(err){
            console.log(err);
            response.sendStatus(500);
        } else {
            response.send(donor);
        }
    })

});


router.get('/createData', function(){
    console.log('Creating data');
    // var data = request.body;
    // //Part 1
    // var createdDonor = new Donor({
    //     orgName: data.organizationName,
    //     formalGreeting: data.formalGreeting,
    //     informalGreeting: data.informalGreeting,
    //     mailSreet: data.mailSreet,
    //     mailCity: data.mailCity,
    //     mailState: data.mailState,
    //     mailZip: data.mailZip,
    //     amount: data.amount,
    //     giftDate: data.giftDate,
    //     closeDate: data.closeDate,
    //     recognition: data.recognition,
    //     primaryEmail: data.primaryEmail,
    //     primaryCampaignSource: data.primaryCampaignSource,
    //     giftType: data.giftType,
    //     writtenDesignation: data.writtenDesignation,
    //     honorMemorialType: data.honorMemorialType,
    //     honoreeName: data.honoreeName,
    //     stockName: data.stockName,
    //     numberOfShares: data.numberOfShares
    // });
    //
    // //Part 2
    // createdDonor.save();

    Donor.create({orgName: 'Jon Wilson', formalGreeting: 'Mr. Jon Wilson, Esq.', informalGreeting: 'Jonny Boy', mailStreet: '1060 W. Addison St.'}, function(err){
      if(err){
        console.log('Create error', err);
      } else {
        console.log('Saved successfully');
      }
    });

    response.sendStatus(200);
});

router.put('/editWithId/:id/:name?', function(request, response){

    var id = request.params.id;
    var name = request.params.name;

    Donor.findById(request.params.id, function(err, donor){
        if(err){
            console.log(err);
            response.sendStatus(500);
        } else {

            donor.firstName = name;

            donor.save(function(err){
                if(err){
                    console.log('There was an issue saving', err);
                    response.sendStatus(500);
                } else {
                    console.log('Saved with no problems, sweet!');
                    response.sendStatus(200);
                }
            });

        }
    })

});

router.delete('/removeWithId/:id', function(request, response){
    var id = request.params.id;

    Donor.findById(id, function(err, donor){
        if(err){
            console.log(err);
            response.sendStatus(500);
        } else {

            employee.remove(function(err){
                if(err){
                    console.log(err);
                }
            });

            console.log('User deleted');
            response.sendStatus(200);
        }
    })
});

module.exports = router;
