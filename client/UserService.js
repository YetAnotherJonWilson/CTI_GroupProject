angular.module('App').factory('UserService', ['$http', function($http){

  var vm = this;

  var standardTemplate = { template: 'template1' };


  return {
    standardTemplate: standardTemplate
  };
}]);
