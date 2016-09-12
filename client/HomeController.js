angular.module('App').controller('HomeController', ['$http', '$location', 'DataService', 'RouteService', 'orderByFilter', '$uibModal', 'TemplateService', 'EmailService', 'UserService', '$route', 'DonationService', function($http, $location, DataService, RouteService, orderBy, $uibModal, TemplateService, EmailService, UserService, $route, DonationService) {


	var vm = this;

	vm.donorList = [];
	vm.currentDonor;
	vm.editedEmails = {};
	vm.messageSent = false;
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

		// var tempStandardTemplate = TemplateService.templatesObject['template' + vm.standardTemplate];

		var tempDonorList = DataService.donorObject.donors;
		// var tempDonorList = DataService.sortedObject.sorted;

		for (var i = 0; i < tempDonorList.length; i++) {
			tempDonorList[i].template1 = Object.assign({},TemplateService.templatesObject.template1);
			tempDonorList[i].template2 = Object.assign({},TemplateService.templatesObject.template2);
			tempDonorList[i].template3 = Object.assign({},TemplateService.templatesObject.template3);
			tempDonorList[i].template4 = Object.assign({},TemplateService.templatesObject.template4);
			tempDonorList[i].template5 = Object.assign({},TemplateService.templatesObject.template5);
			tempDonorList[i].templateNum = vm.standardTemplate;
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
	vm.setCurrentEditView = function(donor) {
		console.log(donor);
		console.log('selectedTemplate:', vm.selectedTemplate);

		var tempIndex;
		var tempDonor;

		if (vm.currentDonor) {
			for (var i = 0; i < vm.donorList.length; i++) {
				if (vm.donorList[i].Id == vm.currentDonor.Id) {
					tempIndex = i;
				}
			}
			vm.donorList[tempIndex] = vm.currentDonor;
		}

		// for (var i = 0; i < vm.donorList.length; i++) {
		// 	if (vm.donorList[i].Id == donor.id) {
		// 		tempDonor = vm.donorList[i];
		// 	}
		// }
		var num= donor.templateNum;
		updateCurrentDonor(donor);
		vm.currentDonor = donor;
		setSelectedTemplate(donor["template"+num].temp);
		vm.setTemplateHighlight(num);
	}

	function setSelectedTemplate(templateNum) {
		vm.selectedTemplate = vm.templates[templateNum - 1];
	}

	//
	// function getCurrentDonor() {
	// 	vm.currentDonor = TemplateService.currentDonor.donor[0].donor;
	// }

	function updateCurrentDonor(donor) {
		TemplateService.updateCurrentDonor(donor);
	}

	function updateCurrentDonorTemplate(template) {
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

	vm.setCurrentTemplate = function(template) {
		setSelectedTemplate(template);
		// TemplateService.updateCurrentDonorTemplate(template);
		console.log(vm.currentDonor.templateNum);
		vm.currentDonor.templateNum = template;
		console.log("vm.current tempnum", vm.currentDonor.templateNum);
		// console.log('currentTemplate:', vm.currentTemplate);
		// console.log('template selected:', template);
	}


	//Pop up modal for editing text
	vm.editModal = function(id, num) {
		vm.fieldId = id;
		// vm.currentTemplate.currentField = id;
		vm.currentDonor["template"+num].currentField = id;
		console.log('about to update current donor template');

		TemplateService.updateCurrentDonorTemplate(num)
		// .then(function(response){
		console.log('finished updating current donor template');

			// console.log('response', response);
			$uibModal.open({
				animation: true,
				ariaLabelledBy: 'edit text modal',
				ariaDescribedBy: 'edit text',
				templateUrl: 'emails/edit_modal.html',
				controller: 'ModalController',
				controllerAs: 'modal',
				size: 'md'
			});
			console.log('finished updating current donor template');

		// });

	};

	//Pop up modal for choosing images
	vm.imageModal = function(id, num) {
		vm.currentDonor["template"+num].currentField = id;
		// console.log('about to update current donor template');
		TemplateService.updateCurrentDonorTemplate(num);
		// .then(function(response){
		console.log('opening modal');
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
	// });
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


	vm.sendMail = function(donor) {
		console.log('You cliked me', vm.selectedTemplate);
		// updateCurrentDonorTemplate(vm.selectedTemplate.name);
		// var template = vm.currentDonor.template.temp;
		var templateNum = donor.templateNum;
		EmailService.sendMail(donor, templateNum);
		DonationService.saveEmail(donor, templateNum);
		removeDonor(donor);
	};

	function removeDonor(donor) {
		var index = vm.donorList.indexOf(donor);
		vm.donorList.splice(index, 1);
		vm.currentDonor = undefined;
		vm.messageSent = true;
	}

	vm.sendAll = function() {
		swal({
			title: "Are you sure?",
			text: "Do You Want to Send Messages With current formats?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, Send Messages",
			closeOnConfirm: false
		}, function() {
			for (var i = 0; i < vm.donorList.length; i++) {
				var num = vm.donorList[i].templateNum;
				EmailService.sendMail(vm.donorList[i], num);
				DonationService.saveEmail(vm.donorList[i], num);
				vm.messageSent = true;
			}
			vm.currentDonor = undefined;
			vm.donorList = [];
			swal("Sent!", "Your Messages Have Been Sent", "success");
		});
	}

	vm.isActive = function(id) {
		if(vm.currentDonor){
			return id === vm.currentDonor.Id;
		}
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

	buildDonorList();


}]);
