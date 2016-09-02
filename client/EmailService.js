angular.module('App').factory('EmailService', ['$http', '$location', function($http, $location){
  var vm = this;
  var email = {};


  function sendMail(donor, num) {
    var sendData = {};
    console.log(donor);
    sendData.p1 = donor["template"+num].p1;
    sendData.p2 = donor["template"+num].p2;
    sendData.p3 = donor["template"+num].p3;
    sendData.p4 = donor["template"+num].p4;
    sendData.q = donor["template"+num].quote;
    sendData.ps = donor["template"+num].ps;
    sendData.img = "";
    sendData.img2 = "";
    sendData.img3 = "";
    sendData.img4 = "";
    sendData.template = donor["template"+num].temp;
    sendData.senderName = donor["template"+num].senderName;
    sendData.senderTitle = donor["template"+num].senderTitle;
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
