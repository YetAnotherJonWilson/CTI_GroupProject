angular.module('App').controller('SettingsController', ['$http', '$location', 'DataService', 'UserService', 'Upload', '$timeout', '$uibModal', function($http, $location, DataService, UserService, Upload, $timeout, $uibModal){

var vm = this;

    vm.unhidePhotos = false;
    vm.unhideSignatures = false;
    vm.unhideHeaders = false;


    // console.log(UserService.photosArray);


    vm.deletePhoto = function(photo) {
      deletePhoto = {};
      id = 12345;
      console.log('photo.id', photo.id);
      deletePhoto.id = photo.id;
      // console.log('delete pushed' , deletePhoto);
      $http.post('/photos/deletePhoto', deletePhoto).then(handleDeleteSuccess, handleDeleteFailure);
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

    vm.templatesList;
    vm.currentTemplate = 1;

    function buildTemplateObject(){
      var tempTemplateList = TemplateService.templatesObject;
      vm.templatesList = Object.assign({}, tempTemplateList)
    }



    //Pop up modal for editing text
  	vm.editModal = function(id) {
  		console.log('templatesList:', vm.templatesList);

  		vm.fieldId = id;
  		// vm.currentDonor.template.currentField = id;
  		$uibModal.open({
  			animation: true,
  			ariaLabelledBy: 'edit text modal',
  			ariaDescribedBy: 'edit text',
  			templateUrl: 'emails/edit_modal.html',
  			controller: 'ModalController',
  			controllerAs: 'modal',
  			size: 'md'
  		});
  	};

  	//Pop up modal for choosing images
  	vm.imageModal = function(id) {
  		// vm.currentDonor.template.currentField = id;
  		$uibModal.open({
  			animation: true,
  			ariaLabelledBy: 'image modal',
  			ariaDescribedBy: 'pick an image',
  			templateUrl: 'emails/image_modal.html',
  			controller: 'ModalController',
  			controllerAs: 'modal',
  			size: 'md',
  			windowClass: 'imageModalClass'
  		});
  	};


    //Dropdown menu to choose different templates
    vm.templates = [{
      name: 'Template 1',
      url: 'emails/template1SettingsView.html'
    }, {
      name: 'Template 2',
      url: 'emails/template2SettingsView.html'
    }, {
      name: 'Template 3',
      url: 'emails/template3SettingsView.html'
    }, {
      name: 'Template 4',
      url: 'emails/template4SettingsView.html'
    }, {
      name: 'Template 5',
      url: 'emails/template5SettingsView.html'
    }];

    vm.selectedTemplate = vm.templates[0];

// DataService.getTemplates();
buildTemplateObject();

}]);
