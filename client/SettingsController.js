angular.module('App').controller('SettingsController', ['$http', '$location', 'DataService' , function($http, $location, DataService){

var vm = this;

vm.complete = function(content) {
    console.log(content); // process content
}


}]);
