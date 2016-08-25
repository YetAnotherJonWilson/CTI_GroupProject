angular.module('App').controller('HomeController', ['$http', '$location', 'DataService', 'RouteService', 'orderByFilter', '$uibModal', 'TemplateService', 'EmailService', function($http, $location, DataService, RouteService, orderBy, $uibModal,TemplateService,EmailService) {



	var vm = this;

	vm.donorList = DataService.donorObject.donors;


	vm.homeRoute = function() {
		RouteService.homeRoute();
	}
	vm.editRoute = function() {
		RouteService.editRoute();
	}
	vm.settingsRoute = function() {
		RouteService.settingsRoute();
	}



	vm.propertyName = 'donationAmount';
	vm.reverse = true;
	vm.donors = vm.donorList;

	vm.sortBy = function(propertyName) {
		console.log('donorList:', vm.donors);
		console.log('sortBy propertyName:', propertyName);
		vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
		vm.propertyName = propertyName;
	};

//////////EDIT VIEW/////////


vm.templatesObject = TemplateService.templatesObject;
vm.currentTemplate = TemplateService.currentTemplate;
vm.savedEmails = TemplateService.savedEmails;
vm.imagesArray = TemplateService.imagesObject.images;

vm.fieldId = '';


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


vm.sendMail = function(p1, q, p2) {
  console.log('You cliked me');
  EmailService.sendMail(p1, q, p2);
}

vm.saveEditedEmail = function(p1, p2, p3, p4, q){
  TemplateService.saveEditedEmail(p1, p2, p3, p4, q)
}

function getCurrentTemplate(templateNum) {
  console.log('Im getting the current template');
  TemplateService.getCurrentTemplate(templateNum);
}

getCurrentTemplate(1);




}]);
