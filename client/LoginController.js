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

    var vm = this;

    vm.username = '';
    vm.password = '';
    vm.error = false;
    vm.errorMessage = 'Sorry, Wrong Username/Password';

    vm.login = function(){
        console.log('Username', vm.username);
        console.log('Password', vm.password);

        var sendData = {};

        sendData.username = vm.username;
        sendData.password = vm.password;

        $http.post('/login', sendData).then(handleSuccess, handleFailure);
    };

    function handleSuccess(response){
        console.log('Success', response);
        $location.path('/success');
    }

    function handleFailure(response){
        console.log('Failure', response);
        $location.path('/');
        vm.error = true;
    }



}]);
