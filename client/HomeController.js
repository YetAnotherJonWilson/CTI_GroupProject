angular.module('App').controller('HomeController', ['$http', '$location', 'DataService', 'RouteService', 'orderByFilter', '$uibModal', 'TemplateService', 'EmailService', function($http, $location, DataService, RouteService, orderBy, $uibModal, TemplateService, EmailService) {

// DataService.getData();

	var vm = this;

	// vm.donorList = DataService.sortedObject.sorted;
  vm.donorList = DataService.donorObject.donors;
  console.log(vm.donorList);


	vm.homeRoute = function() {
		RouteService.homeRoute();
	}
	vm.editRoute = function() {
		RouteService.editRoute();
	}
	vm.settingsRoute = function() {
		RouteService.settingsRoute();
	}


	vm.propertyName = 'Amount';
	vm.reverse = true;
	vm.donors = vm.donorList;
	vm.dropDownName = 'Donation';

	vm.sortBy = function(propertyName) {
		console.log('donorList:', vm.donors);
		console.log('sortBy propertyName:', propertyName);
		vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
		vm.propertyName = propertyName;

		switch(propertyName) {
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





	};


	//////////EDIT VIEW/////////


	vm.templatesObject = TemplateService.templatesObject;
	vm.currentTemplate = TemplateService.currentTemplate;
	vm.savedEmails = TemplateService.savedEmails;
	vm.imagesArray = TemplateService.imagesObject.images;

	vm.fieldId = '';



	vm.currentDonor = {};

	vm.setCurrentEditView = function(id) {
		var tempDonor;
		var tempIndex;

		for (var i = 0; i < vm.donorList.length; i++) {
			if (vm.donorList[i].Id == id) {
				tempDonor = vm.donorList[i];
				tempIndex = i;
			}
		}

		vm.currentDonor = tempDonor;
	}

	//if it's been edited, pull from the temp array of edited emails
	//get selected template
	//get edited paragraphs
	//get saved donor info
	//else pull fresh from DataService
	//get user standard template.html
	//get standard template paragraphs
	//get donor information









vm.editObject = {};

// vm.user = UserService.user;
// //template
// vm.donor = DonorService.donor;
// //name
// //email
// //amount
// //donate_date
// //informal_greeting
// vm.template = TemplateService.template;
// //template1
// //template2
// //template3
//
// vm.paragraph0 = "";


function createEditObject() {

	vm.editObject.name = vm.donor.name;
	vm.editObject.email = vm.donor.email;
	vm.editObject.amount = vm.donor.amount;
	vm.editObject.donate_date = vm.donor.donate_date;
	vm.editObject.informal_greeting = vm.donor.informal_greeting;
	vm.editObject.template = vm.user.template;
	vm.editObject.templateContents = vm.template[vm.editObject.template];
}

function chooseTemplate() {}



vm.templates = [{
	name: 'Template 1',
	url: 'emails/template1EditView.html'
}, {
	name: 'Template 2',
	url: 'emails/template2EditView.html'
}, {
	name: 'Template 3',
	url: 'emails/template3EditView.html'
}];

vm.template = vm.templates[0];



vm.editModal = function(id) {
	console.log('currentTemplate:', vm.currentTemplate);

	vm.fieldId = id;
	vm.currentTemplate.currentField = id;
	$uibModal.open({
		animation: true,
		ariaLabelledBy: 'edit text modal',
		ariaDescribedBy: 'edit text',
		templateUrl: 'emails/edit_modal.html',
		controller: 'ModalController',
		controllerAs: 'modal',
		size: 'md',
		// resolve: {
		// 	items: function() {
		// 		return vm.items;
		// 	}
		// }
	});

	//
	// 	modalInstance.result.then(function(selectedItem) {
	// 		vm.selected = selectedItem;
	// 	}, function() {
	// 		$log.info('Modal dismissed at: ' + new Date());
	// 	});
};


vm.imageModal = function(id) {

	// vm.fieldId = id;
	// vm.currentTemplate.currentField = id;
	$uibModal.open({
		animation: true,
		ariaLabelledBy: 'image modal',
		ariaDescribedBy: 'pick an image',
		templateUrl: 'emails/image_modal.html',
		controller: 'ModalController',
		controllerAs: 'modal',
		size: 'md'
	});
};


vm.sendMail = function(p1, p2, p3, p4, q, ps, donorInfo) {
  console.log('You cliked me');
  EmailService.sendMail(p1, p2, p3, p4, q, ps, donorInfo);
}

vm.saveEditedEmail = function(p1, p2, p3, p4, q, ps) {
	TemplateService.saveEditedEmail(p1, p2, p3, p4, q, ps)
}

function getCurrentTemplate(templateNum) {
	console.log('Im getting the current template');
	TemplateService.getCurrentTemplate(templateNum);
}


getCurrentTemplate(1);


}]);
