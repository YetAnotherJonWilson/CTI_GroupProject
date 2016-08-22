angular.module('App').controller('HomeController', ['$http', '$location', 'DataService', 'RouteService' , function($http, $location, DataService, RouteService){

   var vm = this;

   vm.donorlist = DonorService.donorlist

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
