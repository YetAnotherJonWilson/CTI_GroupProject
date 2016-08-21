angular.module('App').factory('DataService', ['$http', function($http, DataService){
  var vm = this;

  function getDonors(){

  }

  function getContactInfo(){
    
  }

  return {
    getDonors: getDonors,
    getContactInfo: getContactInfo
  };
}]);
