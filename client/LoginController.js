angular.module('App').controller('LoginController', ['$http', '$location', 'DataService', 'RouteService', function($http, $location, DataService, RouteService){

var vm = this;

vm.homeRoute = function(){
  RouteService.homeRoute();
}
vm.editRoute = function(){
  RouteService.editRoute();
}
vm.settingsRoute = function(){
  RouteService.settingsRoute();
}


}]);
