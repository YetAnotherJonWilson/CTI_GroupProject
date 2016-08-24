angular.module('App').controller('EditController', ['$http', '$location', '$uibModal', 'DataService', 'TemplateService', 'EmailService', function($http, $location, $uibModal, DataService, TemplateService, EmailService) {

	var vm = this;

	vm.templatesObject = TemplateService.templatesObject;
	vm.currentTemplate = TemplateService.currentTemplate;
	vm.savedEmails = TemplateService.savedEmails;

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
		name: 'template_1.html',
		url: 'emails/template1EditView.html'
	}, {
		name: 'template2.html',
		url: 'emails/customTemplate1.html'
	}];

	vm.template = vm.templates[0];



	vm.animationsEnabled = true;
	vm.items = ['item1', 'item2', 'item3'];


	vm.editModal = function(id) {
		console.log('currentTemplate:', vm.currentTemplate);

		vm.fieldId = id;
		vm.currentTemplate.currentField = id;
		$uibModal.open({
			animation: vm.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
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
