angular.module('App').factory('UserService', ['$http', function($http){

  var vm = this;

  // var photosArray = {};
  // var signaturesArray = {};
  // var headersArray = {};

  function createPhotoArray(){
    $http.get('/createphotoarray').then(handlePhotoSuccess);
  }

  function handlePhotoSuccess(response){
    var photosArray = {photos: response.data};
    console.log('photosArray in userservice:', photosArray);
  }

  createPhotoArray();

  function createSignatureArray(){
    $http.get('/createsignaturearray').then(handleSignatureSuccess);
  }

  function handleSignatureSuccess(response){
    //console.log(response.data);
    signaturesArray = response.data;
  }

  createSignatureArray();

  function createHeaderArray(){
    $http.get('/createheaderarray').then(handleHeaderSuccess);
  }

  function handleHeaderSuccess(response){
    //console.log(response.data);
    headersArray = response.data;
  }

  createHeaderArray();

  return {
    photosArray: photosArray,
    signaturesArray: signaturesArray,
    headersArray: headersArray
  };

  var standardTemplate = { template: 1 };


  return {
    standardTemplate: standardTemplate
  };
}]);
