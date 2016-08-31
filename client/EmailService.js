angular.module('App').factory('EmailService', ['$http', '$location', function($http, $location){
  var vm = this;
  var email = {};



  function sendMail(p1,p2, p3, p4, q, ps, img, img2, img3, img4, template) {
    var sendData = {};

    sendData.p1 = p1;
    sendData.p2 = p2;
    sendData.p3 = p3;
    sendData.p4 = p4;
    sendData.q = q;
    sendData.ps = ps;
    sendData.img = img;
    sendData.img2 = img2;
    sendData.img3 = img3;
    sendData.img4 = img4;
    sendData.template = template;

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
