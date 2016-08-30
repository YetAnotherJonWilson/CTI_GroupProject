angular.module('App').controller('SettingsController', ['$http', '$location', 'DataService', 'UserService', 'Upload', '$timeout', function($http, $location, DataService, UserService, Upload, $timeout){

var vm = this;

    vm.unhidePhotos = false;
    vm.unhideSignatures = false;
    vm.unhideHeaders = false;


    console.log(UserService.photosArray);

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

    vm.showPhotos = function(){
        vm.unhidePhotos = !vm.unhidePhotos;
    };

    vm.showSignatures = function(){
        vm.unhideSignatures = !vm.unhideSignatures;
    };

    vm.showHeaders = function(){
        vm.unhideHeaders = !vm.unhideHeaders;
    }
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


}]);
