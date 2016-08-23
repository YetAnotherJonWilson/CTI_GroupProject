angular.module('App').controller('HomeController', ['$http', '$location', 'DataService', 'RouteService', 'orderByFilter', function($http, $location, DataService, RouteService, orderBy) {

	var vm = this;

	vm.donorList = DataService.donorObject.donors

	vm.homeRoute = function() {
		RouteService.homeRoute();
	}
	vm.editRoute = function() {
		RouteService.editRoute();
	}
	vm.settingsRoute = function() {
		RouteService.settingsRoute();
	}
	


	vm.propertyName = 'donationAmount';
	vm.reverse = true;
	vm.donors = vm.donorList;

	vm.sortBy = function(propertyName) {
		console.log('donorList:', vm.donors);
		console.log('sortBy propertyName:', propertyName);
		vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
		vm.propertyName = propertyName;
	};




}]);
