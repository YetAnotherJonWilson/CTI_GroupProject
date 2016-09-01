angular.module('App').controller('SettingsController', ['$http', '$location', 'DataService', 'UserService', 'Upload', '$timeout', function($http, $location, DataService, UserService, Upload, $timeout){

var vm = this;

    vm.unhidePhotos = false;
    vm.unhideSignatures = false;
    vm.unhideHeaders = false;


    // console.log(UserService.photosArray);


    vm.deletePhoto = function(photo) {
      swal({title: "Are you sure?",   text: "You will not be able to recover this image!",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Yes, delete it!",   closeOnConfirm: false }, function(){   swal("Deleted!", "Your image has been deleted.", "success");
      deletePhoto = {};
      id = 12345;
      console.log('photo.id', photo.id);
      deletePhoto.id = photo.id;
      // console.log('delete pushed' , deletePhoto);
      $http.post('/photos/deletePhoto', deletePhoto).then(handleDeleteSuccess, handleDeleteFailure);
      });
    }
    function handleDeleteSuccess(response){
        console.log('Photo Deleted', response);
        createPhotoArray();
    }
    function handleDeleteFailure(response){
        console.log('Failed to delete' , response);
    }

    function createPhotoArray(){
        $http.get('photos/createphotoarray').then(handlePhotoSuccess);
    }
    function handlePhotoSuccess(response){
        console.log(response.data);
        vm.photos = response.data;
    }

    createPhotoArray();

    function createSignatureArray(){
        $http.get('photos/createsignaturearray').then(handleSignatureSuccess);
    }

    function handleSignatureSuccess(response){
        console.log('What is this!!!!!!!!!' ,response.data);
        vm.signatures = response.data;
    }

    createSignatureArray();

    function createHeaderArray(){
        $http.get('photos/createheaderarray').then(handleHeaderSuccess);
    }

    function handleHeaderSuccess(response){
        console.log(response.data);
        vm.headers = response.data;
    }

    createHeaderArray();


    vm.photos = UserService.photosArray;
    vm.signatures = UserService.signaturesArray;
    vm.headers = UserService.headersArray;



    vm.uploadPic = function(file) {

        file.upload = Upload.upload({
            url: '/photos',
            arrayKey: '', // default is '[i]'
            data: {file: file}
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
                createPhotoArray();
            });
        }, function (response) {
            if (response.status > 0)
                vm.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    };

    vm.uploadSig = function(file) {

        file.upload = Upload.upload({
            url: '/photos/sigfile',
            arrayKey: '', // default is '[i]'
            data: {file: file}
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                vm.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    };

    vm.uploadHeader = function(file) {

        file.upload = Upload.upload({
            url: '/photos/headers',
            arrayKey: '', // default is '[i]'
            data: {file: file}
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                vm.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    };

    // vm.showPhotos = function(){
    //     vm.unhidePhotos = !vm.unhidePhotos;
    // };
    //
    // vm.showSignatures = function(){
    //     vm.unhideSignatures = !vm.unhideSignatures;
    // };
    //
    // vm.showHeaders = function(){
    //     vm.unhideHeaders = !vm.unhideHeaders;
    // }
    // function getTemplates(){
    //   $http.get('/template/getTemplates').then(getTemplateSuccess, getTemplateFailure);
    // }
    // function getTemplateSuccess(res){
    //   console.log('templates', res);
    // }
    // function getTemplateFailure(res){
    //   console.log('template retrieval failure');
    // }
    // getTemplates();

    vm.settingsClick = function(id){
      vm.showSettings.photo = false;
      vm.showSettings.template = false;
      vm.showSettings.signature = false;
      vm.showSettings.header = false;
      vm.showSettings[id] = true;
      console.log("this is the id", id);
      console.log("vm.showSettings", vm.showSettings);
      console.log("vm.showSettings[id]" , vm.showSettings[id]);
    }

    vm.showSettings = {
      photo: false,
      template: false,
      signature: false,
      header: false
    }


}]);
