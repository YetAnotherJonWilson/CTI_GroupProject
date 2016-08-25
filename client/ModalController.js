angular.module('App').controller('ModalController', ['$http', '$location', '$uibModal', 'DataService', 'TemplateService', 'EmailService', function($http, $location, $uibModal, DataService, TemplateService, EmailService) {

	var vm = this;

	vm.currentTemplate = TemplateService.currentTemplate;
  vm.imagesArray = TemplateService.imagesObject.images;

  vm.setCurrentImg = function(img){
    TemplateService.setCurrentImg(img);
  }

}]);
