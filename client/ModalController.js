angular.module('App').controller('ModalController', ['$http', '$location', '$uibModal', 'DataService', 'TemplateService', 'EmailService', function($http, $location, $uibModal, DataService, TemplateService, EmailService) {

	var vm = this;
	// console.log('temp service.currentTemplate, in modal ctrl', TemplateService.data.currentTemplate);
	vm.currentTemplate = TemplateService.awesome();
	// console.log('shit', shit);
	vm.currentDonor = vm.currentTemplate;
	vm.currentField = vm.currentTemplate.currentField;
	// vm.currentTemplate = TemplateService.currentTemplate;
	// console.log("modal", vm.currentTemplate);
	vm.imagesArray = TemplateService.imagesObject.images;

	vm.updateCurrentDonorKey = function(key, value) {
		// console.log('key and the value', key, value);
		// console.log('modal.currentDonor:', vm.currentDonor);
		// console.log('modal TemplateService.currentDonor:', TemplateService.currentDonor);
		var num = vm.currentTemplate.temp;
		// console.log('modal updatecurrentkey:', key, value);
		TemplateService.updateCurrentDonorKey(key, value, num);
	}

	// vm.setCurrentImg = function(img){
	//   TemplateService.setCurrentImg(img);
	// }


	// vm.uploadPic = function(pic) {
	// 	console.log('Uploading Pic', pic);
	// 	TemplateService.uploadPic(pic);
	// 	TemplateService.createPhotoArray();
	// }



}]);
