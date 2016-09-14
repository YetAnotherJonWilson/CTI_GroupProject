angular.module('App').factory('EmailService', ['$http', '$location', function($http, $location){
  var vm = this;
  var email = {};


  function sendMail(donor, num) {
    var sendData = {};
    console.log('home controller send mail', donor);
    sendData.p1 = donor["template"+num].p1;
    sendData.p2 = donor["template"+num].p2;
    sendData.p3 = donor["template"+num].p3;
    sendData.p4 = donor["template"+num].p4;
    sendData.q = donor["template"+num].quote;
    sendData.ps = donor["template"+num].ps;
    if(donor.templateNum == 1){
      console.log('justins log', donor.template1.img);
      sendData.img = donor.template1.img.id;
      sendData.header = donor.template1.header.id;
      sendData.sig = donor.template1.sig.id;
    }
    if(donor.templateNum == 2){
      sendData.img = donor.template2.img.id;
      sendData.header = donor.template2.header.id;
      // sendData.sig = '';
    }
    if(donor.templateNum == 3){
      sendData.img = donor.template3.img.id;
      sendData.img2 = donor.template3.img2.id;
      sendData.header = donor.template3.header.id;
      // sendData.sig = '';
    }
    if(donor.templateNum == 4){
      sendData.img = donor.template4.img.id;
      sendData.img2 = donor.template4.img2.id;
      sendData.img3 = donor.template4.img3.id;
      sendData.img4 = donor.template4.img4.id;
      sendData.header = donor.template4.header.id;
      // sendData.sig = '';
    }
    if(donor.templateNum == 5){
      sendData.img = donor.template5.img.id;
      sendData.img2 = donor.template5.img2.id;
      sendData.img3 = donor.template5.img3.id;
      sendData.img4 = donor.template5.img4.id;
      sendData.header = donor.template5.header.id;
      // sendData.sig = '';
    }
    // sendData.img = "";
    // sendData.img2 = "";
    // sendData.img3 = "";
    // sendData.img4 = "";
    sendData.template = donor["template"+num].temp;
    sendData.senderName = donor["template"+num].senderName;
    sendData.senderTitle = donor["template"+num].senderTitle;
    // sendData.header = '';
    // sendData.sig = '';
    sendData.email = donor.email;
    sendData.firstName = donor.firstName;
    sendData.amount = donor.Amount;
    sendData.date = donor.date;

    console.log('sendData = ', sendData);

      $http.post('/email/sendMail', sendData).then(function(response) {
          console.log('Button Pressed');
          console.log('send email', response);
          // $http.post('/donor/createdDonor', sendData).then(function(response){
          //  console.log('success adding donor data to db', response);
          // }, function(err){
          //   console.log('failed adding donor data to mongo', err);
          //   repsonse.sendStatus(500);
          // });
      });
      $location.path('/home');
      return;
  }

  return {
    sendMail: sendMail
  }
}]);
