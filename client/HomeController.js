angular.module('App').controller('HomeController', ['$http', '$location', 'DataService', 'RouteService', 'orderByFilter', '$uibModal', 'TemplateService', 'EmailService', 'UserService', '$route','DonationService', function($http, $location, DataService, RouteService, orderBy, $uibModal, TemplateService, EmailService, UserService, $route, DonationService) {

	var vm = this;


	vm.donorList = [];
	vm.currentDonor;
	vm.editedDonorsArray = [];
	vm.editedEmails = {};
	vm.standardTemplate = UserService.standardTemplate.template;
	TemplateService.bleh();
	// vm.todaysDate = moment(new Date(), 'MM-DD-YYYY');

	vm.homeRoute = function() {
		RouteService.homeRoute();
	}
	vm.editRoute = function() {
		RouteService.editRoute();
	}
	vm.settingsRoute = function() {
		RouteService.settingsRoute();
	}

	//Creates donorList from DonorService and adds the standard template text.
	function buildDonorList() {

		// var tempStandardTemplate = TemplateService.templatesObject['template' + UserService.standardTemplate.template]
		var tempStandardTemplate = TemplateService.templatesObject['template' + vm.standardTemplate];

		var tempDonorList = DataService.donorObject.donors;
		// var tempDonorList = DataService.sortedObject.sorted;

		for (var i = 0; i < tempDonorList.length; i++) {
			tempDonorList[i].template = Object.assign({}, tempStandardTemplate);
			// tempDonorList[i].template.templateNum = tempStandardTemplate.temp;
		}
		vm.donorList = tempDonorList;
		console.log('donorList after build:', vm.donorList);
		console.log('DataService.templatesObject:', TemplateService.templatesObject);
	}



	//////////EDIT VIEW/////////

	vm.templatesObject = TemplateService.templatesObject;
	vm.currentTemplate = TemplateService.currentTemplate;
	vm.savedEmails = TemplateService.savedEmails;
	vm.imagesArray = TemplateService.imagesObject.images;

	vm.fieldId = '';



	//Check if there is a current donor.  If there is, replace that donor in the donorList.  Pull the new donor into the currentDonor.
	vm.setCurrentEditView = function(id) {

		console.log('selectedTemplate:', vm.selectedTemplate);

		var tempIndex;
		var tempDonor;

		if (vm.currentDonor) {
			updateCurrentDonorTemplate(vm.selectedTemplate.name);

			for (var i = 0; i < vm.donorList.length; i++) {
				if (vm.donorList[i].Id == vm.currentDonor.Id) {
					tempIndex = i;
				}
			}
			vm.donorList[tempIndex] = vm.currentDonor;
		}

		for (var i = 0; i < vm.donorList.length; i++) {
			if (vm.donorList[i].Id == id) {
				tempDonor = vm.donorList[i];
			}
		}

		updateCurrentDonor(tempDonor);
		getCurrentDonor();
		setSelectedTemplate(vm.currentDonor.template.temp);
	}

	function setSelectedTemplate(templateNum){
		vm.selectedTemplate = vm.templates[templateNum - 1];
	}

	// vm.setCurrentEditView1 = function(id) {
	// 	console.log('donor id', id);
	// 	// console.log('set current view');
	// 	var tempDonor;
	// 	var tempIndex;
	// 	var editedTempIndex;
	//
	// 	if (vm.currentDonor) {
	// 		console.log('If vm.currentDonor');
	// 		var isInArray;
	//
	// 		//check if this donor is in editedDonorsArray.
	// 		for (var i = 0; i < vm.editedDonorsArray.length; i++) {
	// 			if (vm.editedDonorsArray[i].Id == vm.currentDonor.Id) {
	// 				isInArray = true;
	// 				editedTempIndex = i;
	// 			}
	// 		}
	//
	// 		//if the donor is in editedDonorsArray, replace it with the current edit.
	// 		//Else add it to the edited array
	// 		if (isInArray) {
	// 			console.log('if isInArray');
	// 			vm.editedDonorsArray[editedTempIndex] = vm.currentDonor;
	// 		} else {
	// 			console.log('if isInArray else statement');
	// 			vm.editedDonorsArray.push(vm.currentDonor);
	// 		}
	// 	}
	//
	// 	//if there are edited donors, check that list first to get current donor info and put it in tempDonor
	// 	if (vm.editedDonorsArray > 0) {
	// 		console.log('if vm.editedDonorsArray > 0');
	// 		for (var i = 0; i < vm.editedDonorsArray.length; i++) {
	// 			if (vm.editedDonorsArray[i].Id == id) {
	// 				tempDonor = vm.editedDonorsArray[i];
	// 				tempIndex = i;
	// 			}
	// 		}
	// 	}
	//
	// 	//If there was no match in the edited Array, then find the donor info in the donorList
	// 	if (!tempDonor) {
	// 		console.log('if !tempDonor');
	// 		for (var i = 0; i < vm.donorList.length; i++) {
	// 			if (vm.donorList[i].Id == id) {
	// 				tempDonor = vm.donorList[i];
	// 				tempIndex = i;
	// 			}
	// 		}
	// 	}
	//
	// 	updateCurrentDonor(tempDonor);
	// 	getCurrentDonor();
	// 	console.log('editedDonorsArray:', vm.editedDonorsArray);
	// }

	function getCurrentDonor() {
		vm.currentDonor = TemplateService.currentDonor.donor[0].donor;
	}

	function updateCurrentDonor(donor) {
		TemplateService.updateCurrentDonor(donor);
	}

	function updateCurrentDonorTemplate(template){
		console.log('template name:', template);
		var splitTemplate = template.split(' ');
		var templateNum = splitTemplate[1];
		TemplateService.updateCurrentDonorTemplate(templateNum);
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

	vm.selectedTemplate = vm.templates[0];

	vm.updateTemplateNum = function(){
		console.log('You clicked the template');
	}


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
		vm.currentDonor.template.currentField = id;
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


	vm.saveEditedEmail = function(p1, p2, p3, p4, q, ps, img, img2, img3, img4) {
		vm.editedEmails.p1 = p1;
		vm.editedEmails.p2 = p2;
		vm.editedEmails.p3 = p3;
		vm.editedEmails.p4 = p4;
		vm.editedEmails.ps = ps;
		vm.editedEmails.img = img;
		vm.editedEmails.img2 = img2;
		vm.editedEmails.img3 = img3;
		vm.editedEmails.img4 = img4;
	}


	vm.sendMail = function(donor) {
		console.log('You cliked me');
		updateCurrentDonorTemplate(vm.selectedTemplate.name);
		var template = vm.currentDonor.template.temp;
		EmailService.sendMail(donor);
		DonationService.saveEmail(donor);
	};

	buildDonorList();
}]);
