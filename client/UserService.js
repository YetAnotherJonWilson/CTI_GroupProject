angular.module('App').factory('UserService', ['$http', function($http){

  var vm = this;

  var standardTemplate = { template: 1 };


  return {
    standardTemplate: standardTemplate
  };
}]);
