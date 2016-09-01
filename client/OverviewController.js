angular.module('App').controller('OverviewController', ['$http', '$location', 'DonationService', 'RouteService', 'orderByFilter', '$uibModal', 'TemplateService', 'UserService', function($http, $location, DonationService, RouteService, orderByFilter, $uibModal, TemplateService, UserService){
  var vm = this;

  vm.donorList = DonationService.donorObject;
  vm.currentDonor;
  vm.sfDonor = DonationService.overview;
  // vm.pic = '';
  vm.edit = true;
  // console.log('db donor list', vm.donorList);
  // console.log('sf donor list', vm.sfDonor);

  vm.homeRoute = function() {
		RouteService.homeRoute();
	}
	vm.editRoute = function() {
		RouteService.editRoute();
	}
	vm.settingsRoute = function() {
		RouteService.settingsRoute();
	}

  // vm.bleh = function(){
  //   console.log('do it');
  //   console.log('Db donor list', vm.donorList);
  //   console.log('sf donor list', vm.sfDonor);
  // }

  vm.bleh = function(){
    console.log('test');
  //   $http.get('/photos/getDbImages').then(function(response){
  //     console.log('found db images', response);
  //     vm.pics = response.data;
  //     vm.edit = !vm.edit;
  //     console.log('vm.edit', vm.edit);
  //   }, function(err){
  //     console.log('err getting db images', err);
  //   });
  // }
    var id = '57c6229c67c3eed5198b9e47';
    console.log('id', id);
    $http.post('photos/getDbImages/' + id).then(function(response){
      console.log('response', response);
    }, function(err){
      console.log('err', err);
    });
  }
}]);
