angular.module('App').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl: '/views/login.html',
      controller: 'LoginController',
      controllerAs: 'login'
    })
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: "HomeController",
      controllerAs: "home"
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
