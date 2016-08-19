angular.module('App').factory('RouteService', ['$location', function ($location){

function loginRoute(){
  $location.path('/');
}
function homeRoute(){
  $location.path('/home');
}
function editRoute(){
  $location.path('/edit');
}
function settingsRoute(){
  $location.path('/settings');
}


return {
  loginRoute: loginRoute,
  homeRoute: homeRoute,
  editRoute: editRoute,
  settingsRoute: settingsRoute
}
}])
