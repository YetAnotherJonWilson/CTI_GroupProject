angular.module('App').controller('GettingDataController',['DataService', 'TemplateService', function(DataService, TemplateService){
  DataService.getData();
  TemplateService.getTemplates();
}]);
