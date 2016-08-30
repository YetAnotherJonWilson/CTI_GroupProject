angular.module('App').controller('OverviewController', ['$http', '$location', 'DonationService', function($http, $location, DonationService){
  var vm = this;

  vm.something = DonationService.object;
  // console.log('something', something);
}]);
