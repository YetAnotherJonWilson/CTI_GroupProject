angular.module('App').factory('SettingsService', ['$location', 'Upload', '$timeout', '$http', function($location, Upload, $timeout, $http) {

	var currentTemplate = {
		template: [{
			template: {}
		}]
	}


	return {
		currentTemplate: currentTemplate
	}

}]);
