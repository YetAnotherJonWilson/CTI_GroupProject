angular.module('App').controller('MainController', ['$http', '$location', 'DataService' , function($http, $location, DataService){

    var vm = this;

    vm.message = "CTI Thank You Email System";

  

    vm.sendMail = function(){
      EmailService.sendMail();
    }

}]);
