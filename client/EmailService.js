angular.module('App').factory('EmailService', ['$http', '$location', function($http, $location){
  var vm = this;
  var email = {};



  function sendMail(p1, q, p2) {
    var sendData = {};

    sendData.p1 = p1;
    sendData.p2 = p2;
    sendData.q = q;

    console.log('sendData = ', sendData);

      $http.post('/email/sendMail', sendData).then(function(response) {
          console.log('Button Pressed');
          console.log('send email', response);
      });
      $location.path('/');
      return;
  }

return {
  sendMail: sendMail
}
}]);
