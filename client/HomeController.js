angular.module('App').controller('HomeController', ['$http', '$location', 'DataService', 'RouteService', 'orderByFilter', '$uibModal', 'TemplateService', 'EmailService', 'UserService', function($http, $location, DataService, RouteService, orderBy, $uibModal, TemplateService, EmailService, UserService) {


	var vm = this;

	vm.donorList = [];
	vm.currentDonor;
	vm.editedDonorsArray = [];

	vm.homeRoute = function() {
		RouteService.homeRoute();
	}
	vm.editRoute = function() {
		RouteService.editRoute();
	}
	vm.settingsRoute = function() {
		RouteService.settingsRoute();
	}

	//Creates donorList from DonarService and adds the standard template text.
	function buildDonorList() {

		var tempStandardTemplate = TemplateService.templatesObject['template' + UserService.standardTemplate.template]

		var tempDonorList = DataService.donorObject.donors;

		for (var i = 0; i < tempDonorList.length; i++) {
			tempDonorList[i].template = Object.assign({}, tempStandardTemplate);
		}
		vm.donorList = tempDonorList;
		console.log('donorList after build:', vm.donorList);
	}



	//////////EDIT VIEW/////////

	vm.templatesObject = TemplateService.templatesObject;
	vm.currentTemplate = TemplateService.currentTemplate;
	vm.savedEmails = TemplateService.savedEmails;
	vm.imagesArray = TemplateService.imagesObject.images;

	vm.fieldId = '';



vm.setCurrentEditView = function(id) {

	// console.log('set current view');
	var tempDonor;
	var tempIndex;
	var editedTempIndex;

	if (vm.currentDonor) {
		console.log('If vm.currentDonor');
		var isInArray;

		//check if this donor is in editedDonorsArray.
		for (var i = 0; i < vm.editedDonorsArray.length; i++) {
			if (vm.editedDonorsArray[i].Id == vm.currentDonor.Id) {
				isInArray = true;
				editedTempIndex = i;
			}
		}

		//if the donor is in editedDonorsArray, replace it with the current edit.
		//Else add it to the edited array
		if (isInArray) {
			console.log('if isInArray');
			vm.editedDonorsArray[editedTempIndex] = vm.currentDonor;
		} else {
			console.log('if isInArray else statement');
			vm.editedDonorsArray.push(vm.currentDonor);
		}
	}

	//if there are edited donors, check that list first to get current donor info and put it in tempDonor
	if (vm.editedDonorsArray > 0) {
		console.log('if vm.editedDonorsArray > 0');
		for (var i = 0; i < vm.editedDonorsArray.length; i++) {
			if (vm.editedDonorsArray[i].Id == id) {
				tempDonor = vm.editedDonorsArray[i];
				tempIndex = i;
			}
		}
	}

	//If there was no match in the edited Array, then find the donor info in the donorList
	if (!tempDonor) {
		console.log('if !tempDonor');
		for (var i = 0; i < vm.donorList.length; i++) {
			if (vm.donorList[i].Id == id) {
				tempDonor = vm.donorList[i];
				tempIndex = i;
			}
		}
	}

	updateCurrentDonor(tempDonor);
	getCurrentDonor();
	console.log('editedDonorsArray:', vm.editedDonorsArray);
}

function getCurrentDonor() {
	vm.currentDonor = TemplateService.currentDonor.donor[0].donor;
}

function updateCurrentDonor(donor) {
	TemplateService.updateCurrentDonor(donor);
}




//Dropdown menu to choose different templates
vm.templates = [{
	name: 'Template 1',
	url: 'emails/template1EditView.html'
}, {
	name: 'Template 2',
	url: 'emails/template2EditView.html'
}, {
	name: 'Template 3',
	url: 'emails/template3EditView.html'
}, {
	name: 'Template 4',
	url: 'emails/template4EditView.html'
}, {
	name: 'Template 5',
	url: 'emails/template5EditView.html'
}];

vm.template = vm.templates[0];


//Pop up modal for editing text
vm.editModal = function(id) {
	console.log('currentTemplate:', vm.currentTemplate);

	vm.fieldId = id;
	// vm.currentTemplate.currentField = id;
	vm.currentDonor.template.currentField = id;
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


vm.propertyName = 'Amount';
vm.reverse = true;
vm.donors = vm.donorList;
vm.dropDownName = 'Donation';

vm.sortBy = function(propertyName) {
	console.log('donorList:', vm.donors);
	console.log('sortBy propertyName:', propertyName);
	vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
	vm.propertyName = propertyName;

	switch (propertyName) {
		case "lastName":
			vm.dropDownName = "Name";
			break;
		case "Amount":
			vm.dropDownName = "Donation";
			break;
		case "date":
			vm.dropDownName = "Date";
			break;
	}
};


buildDonorList();
}]);
