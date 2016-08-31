angular.module('App').factory('TemplateService', ['$location', 'Upload', '$timeout', '$http', 'DataService', function($location, Upload, $timeout, $http, DataService) {

	var currentTemplate = {
		p1: '',
		p2: '',
		p3: '',
		p4: '',
		quote: '',
		ps: '',
		currentField: '',
		img: ''
	};

	var vm = this;

	var currentDonor = {
		donor: [{
			donor: {}
		}]
	}

	var templatesObject = DataService.templatesObject;

	function saveTemplate(template){
		var sendData= template;
		$http.post('/template/saveTemplate', sendData).then(saveTemplateSuccess, saveTemplateFailure);
	}
	function saveTemplateSuccess(res){
		console.log('temp save success', res);
	}
	function saveTemplateFailure(res){
		console.log('save temp failure', res);
	}
// 	function addStuff(){
// 		templatesObject.template1.templateNum='1';
// 	saveTemplate(templatesObject.template1);
// }
// addStuff();
	// function setCurrentImg(img){
	// 	currentTemplate.img = "photos/" + img;
	// 	console.log('currentTemplate.img' , currentTemplate.img);
	// };

	function setCurrentImg(img) {
		currentDonor.donor[0].donor.img = img;

	}

	function updateCurrentDonorKey(key, value) {
		currentDonor.donor[0].donor.template[key] = value;

		console.log('TemplateService updateCurrentDonorKey, currentDonor:', currentDonor.donor[0]);
	}

	function updateCurrentDonor(donor) {
		console.log('update current donor, donor:', donor);
		currentDonor.donor[0].donor = donor;
		console.log('Template current donor:', currentDonor.donor[0].donor);
	}





	var savedEmails = {
		emails: []
	};


	// var templatesObject = {
	// 	template1: {
	// 		p1: 'Thank you for believing in a world without hunger and poverty. And not just believing in such a world, but making it possible. Because of your generosity, communities around the world are gaining safe water and putting more food on the table.',
	// 		p2: 'It\'s clear that you see the value in helping people help themselves. But I want you to know what a profound impact your gift can have on someone\'s life. Read what Aissatou Ly, Senegalese farmer and business owner, told us:',
	// 		p3: 'Your gift helps women like Aissatou start businesses, earn an income, and send their kids to school-or go themselves. You make success stories like Aissatou\'s possible. And I can\'t thank you enough.',
	// 		p4: '',
	// 		q: "Six months ago I bought a CTI grinder. I provide grinding services to other women and grind about 10 kg of peanut butter a day and sell it at the weekly market. I'm proud, as a woman, to be a leader and have respect in my community. I'm proud that I don't need to ask for help.",
	// 		ps: 'P.S. Please get in touch with me if you have any questions about our programs or CTI in general (alexandra@compatibletechnology.org). And thanks again for your generosity and support!',
	// 		currentField: '',
	// 		img: 'assets/sampleimage3.jpg'
	// 	},
	// 	template2: {
	// 		p1: 'template2 Thank you for believing in a world without hunger and poverty. And not just believing in such a world, but making it possible. Because of your generosity, communities around the world are gaining safe water and putting more food on the table.',
	// 		p2: 'template2 It\'s clear that you see the value in helping people help themselves. But I want you to know what a profound impact your gift can have on someone\'s life. Read what Aissatou Ly, Senegalese farmer and business owner, told us:',
	// 		p3: 'template2 Your gift helps women like Aissatou start businesses, earn an income, and send their kids to school-or go themselves. You make success stories like Aissatou\'s possible. And I can\'t thank you enough.',
	// 		p4: '',
	// 		q: "template2 Six months ago I bought a CTI grinder. I provide grinding services to other women and grind about 10 kg of peanut butter a day and sell it at the weekly market. I'm proud, as a woman, to be a leader and have respect in my community. I'm proud that I don't need to ask for help.",
	// 		ps: 'template2 P.S. Please get in touch with me if you have any questions about our programs or CTI in general (alexandra@compatibletechnology.org). And thanks again for your generosity and support!',
	// 		currentField: '',
	// 		img: 'assets/sampleimage3.jpg'
	// 	},
	// 	template3: {
	// 		p1: 'template3 Thank you for believing in a world without hunger and poverty. And not just believing in such a world, but making it possible. Because of your generosity, communities around the world are gaining safe water and putting more food on the table.',
	// 		p2: 'template3 It\'s clear that you see the value in helping people help themselves. But I want you to know what a profound impact your gift can have on someone\'s life. Read what Aissatou Ly, Senegalese farmer and business owner, told us:',
	// 		p3: 'template3 Your gift helps women like Aissatou start businesses, earn an income, and send their kids to school-or go themselves. You make success stories like Aissatou\'s possible. And I can\'t thank you enough.',
	// 		p4: '',
	// 		q: "template3 Six months ago I bought a CTI grinder. I provide grinding services to other women and grind about 10 kg of peanut butter a day and sell it at the weekly market. I'm proud, as a woman, to be a leader and have respect in my community. I'm proud that I don't need to ask for help.",
	// 		ps: 'template3 P.S. Please get in touch with me if you have any questions about our programs or CTI in general (alexandra@compatibletechnology.org). And thanks again for your generosity and support!',
	// 		currentField: '',
	// 		img: 'assets/sampleimage3.jpg'
	// 	}
	// }



	var imagesObject = {
		images: []
	}
	function createPhotoArray(){
			$http.get('photos/createphotoarray').then(handlePhotoSuccess);
	};
	function handlePhotoSuccess(response){
			imagesObject.images = response.data;

	}
	createPhotoArray();


	function uploadPic(file) {
			file.upload = Upload.upload({
					url: '/photos',
					arrayKey: '', // default is '[i]'
					data: {file: file}
			});
			file.upload.then(function (response) {
					$timeout(function () {
							file.result = response.data;
							createPhotoArray();
					});
			}, function (response) {
					if (response.status > 0)
							vm.errorMsg = response.status + ': ' + response.data;
			}, function (evt) {
					// Math.min is to fix IE which reports 200% sometimes
					file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
	};

	// function getCurrentTemplate(templateNum) {
	// 	currentTemplate.p1 = templatesObject['template' + templateNum].p1;
	// 	currentTemplate.p2 = templatesObject['template' + templateNum].p2;
	// 	currentTemplate.p3 = templatesObject['template' + templateNum].p3;
	// 	currentTemplate.p4 = templatesObject['template' + templateNum].p4;
	// 	currentTemplate.quote = templatesObject['template' + templateNum].quote;
	// 	currentTemplate.ps = templatesObject['template' + templateNum].ps;
	// 	currentTemplate.img = templatesObject['template' + templateNum].img;
	// }


	function saveEditedEmail(p1, p2, p3, p4, quote, ps) {
		savedEmails.emails.push({
			p1: p1,
			p2: p2,
			p3: p3,
			p4: p4,
			quote: quote,
			ps: ps
		})
	}

	return {
		currentDonor: currentDonor,
		currentTemplate: currentTemplate,
		// getCurrentTemplate: getCurrentTemplate,
		imagesObject: imagesObject,
		saveEditedEmail: saveEditedEmail,
		savedEmails: savedEmails,
		setCurrentImg: setCurrentImg,
		templatesObject: templatesObject,
		uploadPic: uploadPic,
		createPhotoArray: createPhotoArray,
		updateCurrentDonor: updateCurrentDonor,
		updateCurrentDonorKey: updateCurrentDonorKey
	}


}]);
