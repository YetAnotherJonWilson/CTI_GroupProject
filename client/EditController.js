angular.module('App').controller('EditController', ['$http', '$location', 'DataService', 'TemplateService', 'EmailService', function($http, $location, DataService, TemplateService, EmailService) {

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
		name: 'template_1.html',
		url: 'emails/template1EditView.html'
	}, {
		name: 'template2.html',
		url: 'emails/customTemplate1.html'
	}];

	vm.template = vm.templates[0];


  vm.editModal = function(){

  }

	vm.sendMail = function(p1, q, p2) {
		console.log('You cliked me');
		EmailService.sendMail(p1, q, p2);
	}


	// createEditObject();

}]);
