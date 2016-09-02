angular.module('App').controller('SettingsModalController', ['$http', '$location', '$uibModal', 'DataService', 'TemplateService', 'EmailService', 'SettingsService', function($http, $location, $uibModal, DataService, TemplateService, EmailService, SettingsService) {

	var vm = this;
console.log('on settingsmodal');
	vm.currentTemplate = SettingsService.currentTemplate.template[0].template;
	vm.currentField = SettingsService.currentTemplate.template[0].template.currentField;
	// vm.currentField = TemplateService.currentDonor == true ? TemplateService.currentDonor.donor[0].donor.template.currentField : null;
	// vm.currentTemplate = TemplateService.currentTemplate;
	vm.imagesArray = TemplateService.imagesObject.images;

	vm.updateCurrentTemplateKey = function(key, value) {
		console.log('settingsmodal.currentTemplate:', vm.currentTemplate);
		console.log('settingsmodal SettingsService.currentTemplate:', SettingsService.currentTemplate);
		var num = vm.currentTemplate.temp;
		// console.log('modal updatecurrentkey:', key, value);
		TemplateService.updateCurrentTemplateKey(key, value, num);
	}


}]);
