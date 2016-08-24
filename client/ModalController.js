angular.module('App').controller('ModalController', ['$http', '$location', '$uibModal', 'DataService', 'TemplateService', 'EmailService', function($http, $location, $uibModal, DataService, TemplateService, EmailService) {

	var vm = this;

	vm.currentTemplate = TemplateService.currentTemplate;

  console.log('modal controller currentTemplate:', vm.currentTemplate);

}]);
