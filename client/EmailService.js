angular.module('App').factory('EmailService', ['$http', function($http){
  var vm = this;
  var email = {};

  vm.createEmail = function(){
  $http.post('/createEmail').then(handleSuccess, handleFailure);
}

  function handleSuccess(response){
      console.log("Success");
  }
  function handleFailure(response){
      console.log('Failure');
  }
}]);

createEmail();
