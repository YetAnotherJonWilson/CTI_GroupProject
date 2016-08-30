angular.module('App').controller('ModalController', ['$http', '$location', '$uibModal', 'DataService', 'TemplateService', 'EmailService', function($http, $location, $uibModal, DataService, TemplateService, EmailService) {

	var vm = this;

	vm.currentDonor = TemplateService.currentDonor.donor[0];
	vm.currentField = TemplateService.currentDonor.donor[0].donor.template.currentField;
	vm.currentTemplate = TemplateService.currentTemplate;
  vm.imagesArray = TemplateService.imagesObject.images;

	//
	// vm.updateCurrentDonorKey = function(key, value) {
	// 	console.log('modal.currentDonor:', vm.currentDonor);
	// 	console.log('modal TemplateService.currentDonor:', TemplateService.currentDonor);
	// 	// console.log('modal updatecurrentkey:', key, value);
	// 	TemplateService.updateCurrentDonorKey(key, value);
	// }

  vm.setCurrentImg = function(img){
    TemplateService.setCurrentImg(img);
		console.log('this is the img, modal controller' , img);
  }

	vm.uploadPic = function(pic) {
		console.log('Uploading Pic', pic);
		TemplateService.uploadPic(pic);
		TemplateService.createPhotoArray();
	}



}]);
