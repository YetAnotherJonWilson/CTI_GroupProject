angular.module('App').controller('GettingDataController',['DataService', function(DataService){
  DataService.getData();
  DataService.getTemplates();
}]);
