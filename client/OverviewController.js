angular.module('App').controller('OverviewController', ['$http', '$location', 'DonationService', 'RouteService', 'orderByFilter', '$uibModal', 'TemplateService', 'UserService', function($http, $location, DonationService, RouteService, orderByFilter, $uibModal, TemplateService, UserService){
  var vm = this;

  vm.donorList = DonationService.donorObject;
  vm.currentDonor;
  vm.sfDonor = DonationService.overview;
  console.log('db donor list', vm.donorList);
  console.log('sf donor list', vm.sfDonor);

  vm.homeRoute = function() {
		RouteService.homeRoute();
	}
	vm.editRoute = function() {
		RouteService.editRoute();
	}
	vm.settingsRoute = function() {
		RouteService.settingsRoute();
	}

  vm.bleh = function(){
    console.log('do it');
    console.log('Db donor list', vm.donorList);
    console.log('sf donor list', vm.sfDonor);
  }
}]);
