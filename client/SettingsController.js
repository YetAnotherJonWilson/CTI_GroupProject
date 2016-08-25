angular.module('App').controller('SettingsController', ['$http', '$location', 'DataService', 'Upload', '$timeout', function($http, $location, DataService, Upload, $timeout){

var vm = this;
var sendData = {};

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
    }


}]);
