angular.module('rewardsApp').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl: '/views/home.html',
      controller: 'IndexController',
      controllerAs: 'index'
    })
    .when('/login', {
      templateUrl: '/views/login.html',
      controller: "LoginController",
      controllerAs: "login"
    })
    .when('/edit', {
      templateUrl: '/views/edit.html',
      controller: 'EditController',
      controllerAs: 'edit'
    })
    .when('/settings' , {
      templateUrl: '/views/settings.html',
      controller: 'SettingsController',
      controllerAs: 'settings'
    })
    

    .otherwise({redirectTo:'/'});

  $locationProvider.html5Mode(true);
}]);
