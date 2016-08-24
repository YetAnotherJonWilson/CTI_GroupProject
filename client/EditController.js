angular.module('App').controller('EditController', ['$http', '$location', '$uibModal', 'DataService', 'TemplateService', 'EmailService', function($http, $location, $uibModal, DataService, TemplateService, EmailService) {

	var vm = this;

	vm.templatesObject = TemplateService.templatesObject;


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
	}];

	vm.template = vm.templates[0];



  vm.editModal = function(){

  }

	vm.animationsEnabled = true;
	vm.items = ['item1', 'item2', 'item3'];

	vm.editModal = function() {
		console.log('Clickety Click');

		var modalInstance = $uibModal.open({
			animation: vm.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			// template: '<div class="paragraph1">' +
			// 	'<label for="paragraph1">Paragraph 1</label>' +
			// 	'<textarea type="text" ng-model="edit.templatesObject.template1.p1"' + 'id="paragraph1"></textarea>' +
			// 	'</div>',
      templateUrl: 'emails/p1.html',
			controller: 'EditController',
			controllerAs: 'edit',
			size: 'lg',
			resolve: {
				items: function() {
					return vm.items;
				}
			}
		});
	}


	vm.sendMail = function(p1, q, p2) {
		console.log('You cliked me');
		EmailService.sendMail(p1, q, p2);
	}


	// createEditObject();

}]);
