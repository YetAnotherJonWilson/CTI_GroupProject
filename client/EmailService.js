angular.module('App').factory('EmailService', ['$http', '$location', function($http, $location){
  var vm = this;
  var email = {};


  function sendMail(donor) {
    var sendData = {};

    sendData.p1 = donor.template.p1;
    sendData.p2 = donor.template.p2;
    sendData.p3 = donor.template.p3;
    sendData.p4 = donor.template.p4;
    sendData.q = donor.template.quote;
    sendData.ps = donor.template.ps;
    sendData.img = donor.template.img;
    sendData.img2 = donor.template.img2;
    sendData.img3 = donor.template.img3;
    sendData.img4 = donor.template.img4;
    sendData.template = donor.template.temp;
    sendData.senderName = donor.template.senderName;
    sendData.senderTitle = donor.template.senderTitle;
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
