angular.module('App').factory('UserService', ['$http', function($http){

  var vm = this;

  var photosArray = {};
  var signaturesArray = {};
  var headersArray = {};

  function createPhotoArray(){
    $http.get('photos/createphotoarray').then(handlePhotoSuccess);
  }

  function handlePhotoSuccess(response){
     photosArray.photos = response.data;
    console.log('photosArray in userservice:', photosArray);
  }

  createPhotoArray();

  function createSignatureArray(){
    $http.get('photos/createsignaturearray').then(handleSignatureSuccess);
  }

  function handleSignatureSuccess(response){
    console.log(response.data);
    signaturesArray = response.data;
  }

  createSignatureArray();

  function createHeaderArray(){
    $http.get('photos/createheaderarray').then(handleHeaderSuccess);
  }

  function handleHeaderSuccess(response){
    console.log(response.data);
    headersArray = response.data;
  }

  // createHeaderArray();
var standardTemplate = { template: 1 };
  return {
    photosArray: photosArray,
    signaturesArray: signaturesArray,
    headersArray: headersArray,
    standardTemplate: standardTemplate
  };



}]);
