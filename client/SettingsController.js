angular.module('App').controller('SettingsController', ['$http', '$location', 'DataService', 'UserService', 'Upload', '$timeout', '$uibModal', 'SettingsService', 'TemplateService', function($http, $location, DataService, UserService, Upload, $timeout, $uibModal, SettingsService, TemplateService) {

	var vm = this;

	TemplateService.bleh();
	vm.unhidePhotos = false;
	vm.unhideSignatures = false;
	vm.unhideHeaders = false;
	vm.templateSaved = false;


	// console.log(UserService.photosArray);


	vm.deletePhoto = function(photo) {
		swal({
			title: "Are you sure?",
			text: "You will not be able to recover this image!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, delete it!",
			closeOnConfirm: false
		}, function() {
			swal("Deleted!", "Your image has been deleted.", "success");
			deletePhoto = {};
			id = 12345;
			console.log('photo.id', photo.id);
			deletePhoto.id = photo.id;
			// console.log('delete pushed' , deletePhoto);
			$http.post('/photos/deletePhoto', deletePhoto).then(handleDeleteSuccess, handleDeleteFailure);
		});
	}

	function handleDeleteSuccess(response) {
		console.log('Photo Deleted', response);
		createPhotoArray();
	}

	function handleDeleteFailure(response) {
		console.log('Failed to delete', response);
	}

	function createPhotoArray() {
		$http.get('photos/createphotoarray').then(handlePhotoSuccess);
	}

	function handlePhotoSuccess(response) {
		vm.photos = response.data;
		TemplateService.imagesObject.images = response.data;
	}

	createPhotoArray();

	function createSignatureArray() {
		$http.get('photos/createsignaturearray').then(handleSignatureSuccess);
	}

	function handleSignatureSuccess(response) {
		vm.signatures = response.data;
		// console.log('too many logs ', vm.signatures);
		TemplateService.data.signatures = vm.signatures;
		// console.log('tempalteservice.data.signatures', TemplateService.data.signatures);
	}

	createSignatureArray();

	function createHeaderArray() {
		$http.get('photos/createheaderarray').then(handleHeaderSuccess);
	}

	function handleHeaderSuccess(response) {
		vm.headers = response.data;
		TemplateService.data.headers = vm.headers;
		console.log('templateservice.data.headers', TemplateService.data.headers);
	}


	createHeaderArray();


	vm.photos = UserService.photosArray;
	vm.signatures = UserService.signaturesArray;
	vm.headers = UserService.headersArray;



	vm.uploadPic = function(file) {

		file.upload = Upload.upload({
			url: '/photos',
			arrayKey: '', // default is '[i]'
			data: {
				file: file
			}
		});

		file.upload.then(function(response) {
			$timeout(function() {
				file.result = response.data;
				createPhotoArray();
			});
		}, function(response) {
			if (response.status > 0)
				vm.errorMsg = response.status + ': ' + response.data;
		}, function(evt) {
			// Math.min is to fix IE which reports 200% sometimes
			file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
		});
	};

	vm.uploadSig = function(file) {

		file.upload = Upload.upload({
			url: '/photos/sigfile',
			arrayKey: '', // default is '[i]'
			data: {
				file: file
			}
		});

		file.upload.then(function(response) {
			$timeout(function() {
				file.result = response.data;
				// createSignatureArray();
			});
			if(response.status == 200){
				createSignatureArray();
			}
		}, function(response) {
			console.log('response fjklasjflsajklsa', response);
			if (response.status > 0){
				vm.errorMsg = response.status + ': ' + response.data;
			}
		}, function(evt) {
			// Math.min is to fix IE which reports 200% sometimes
			file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			console.log('1', file.progress);
		});
	};

	vm.uploadHeader = function(file) {

		file.upload = Upload.upload({
			url: '/photos/headers',
			arrayKey: '', // default is '[i]'
			data: {
				file: file
			}
		});

		file.upload.then(function(response) {
			$timeout(function() {
				file.result = response.data;
			});
			if(response.status == 200){

				createHeaderArray();
			}
		}, function(response) {
			if (response.status > 0)
				vm.errorMsg = response.status + ': ' + response.data;
		}, function(evt) {
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


	//Sets view of menu item and highlights that item
	vm.settingsClick = function(id) {
		vm.showSettings.photo = false;
		vm.showSettings.template = false;
		vm.showSettings.signature = false;
		vm.showSettings.header = false;
		vm.showSettings[id] = true;

		vm.menuHighlight.photo = '',
		vm.menuHighlight.template = '',
		vm.menuHighlight.signature = '',
		vm.menuHighlight.header = '',
		vm.menuHighlight[id] = 'menu-highlight'
		console.log('showsettings:', vm.showSettings);
		console.log('menuHighlight:', vm.menuHighlight);
	}

	vm.showSettings = {
		photo: true,
		template: false,
		signature: false,
		header: false
	}

	vm.menuHighlight = {
		photo: 'menu-highlight',
		template: '',
		signature: '',
		header: ''
	}



	vm.templatesList;
	vm.currentTemplate = SettingsService.currentTemplate.template[0].template;
	vm.fieldId = '';

	function buildTemplateObject() {
		var tempTemplateList = TemplateService.templatesObject;
		vm.templatesList = Object.assign({}, tempTemplateList)
		console.log('vm.currentTemplate:', vm.currentTemplate);
	}

	function getCurrentTemplate() {
		vm.currentTemplate = SettingsService.currentTemplate.template[0].template;
	}



	//Pop up modal for editing text
	vm.editModal = function(id) {
		console.log('SettingsService.currentTemplate:', SettingsService.currentTemplate);
		console.log('vm.currentTemplate:', vm.currentTemplate);

		vm.fieldId = id;
		vm.currentTemplate.currentField = id;
		$uibModal.open({
			animation: true,
			ariaLabelledBy: 'edit text modal',
			ariaDescribedBy: 'edit text',
			templateUrl: 'emails/edit_settings_modal.html',
			controller: 'SettingsModalController',
			controllerAs: 'settingsModal',
			size: 'md'
		});
	};

	//Pop up modal for choosing images
	vm.imageModal = function(id) {
		vm.fieldId = id;
		vm.currentTemplate.currentField = id;
		$uibModal.open({
			animation: true,
			ariaLabelledBy: 'image modal',
			ariaDescribedBy: 'pick an image',
			templateUrl: 'emails/image_settings_modal.html',
			controller: 'SettingsModalController',
			controllerAs: 'settingsModal',
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

	vm.setCurrentTemplate = function(template) {
		vm.selectedTemplate = vm.templates[template - 1];
		// vm.currentTemplate = vm.templatesList['template' + template];
		SettingsService.currentTemplate.template[0].template = vm.templatesList['template' + template];
		getCurrentTemplate();
		vm.templateSaved = false;

		console.log('currentTemplate:', vm.currentTemplate);
		console.log('template selected:', template);
	}



	vm.saveAllTemplates = function() {
		console.log('save all templates:', vm.templatesList);
	}

	function setTemplateOnLoad() {
		SettingsService.currentTemplate.template[0].template = vm.templatesList['template1'];
		console.log('SettingsService.currentTemplate.template[0].template:', SettingsService.currentTemplate.template[0].template);
	}

  vm.templateHighlight = {
    template1: 'orange-highlight',
    template2: '',
    template3: '',
    template4: '',
    template5: ''
  }

	vm.setTemplateHighlight = function(id) {
		vm.templateHighlight.template1 = '';
		vm.templateHighlight.template2 = '';
		vm.templateHighlight.template3 = '';
		vm.templateHighlight.template4 = '';
		vm.templateHighlight.template5 = '';
		vm.templateHighlight['template' + id] = 'orange-highlight';
	}
	vm.saveTemplate = function(template){
		console.log(template);
		TemplateService.saveTemplate(template);
		vm.templateSaved= true;
	}

	vm.isActive = function(route) {
			return route === $location.path();
	}

	// DataService.getTemplates();
	buildTemplateObject();
	setTemplateOnLoad();
	getCurrentTemplate();

}]);
