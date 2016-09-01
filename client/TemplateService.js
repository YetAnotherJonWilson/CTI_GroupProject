angular.module('App').factory('TemplateService', ['$location', 'Upload', '$timeout', '$http', 'DataService', function($location, Upload, $timeout, $http, DataService) {

	var templatesObject = {};

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

	// var templatesObject = DataService.templatesObject;

	function saveTemplate(template) {
		var sendData = template;
		$http.post('/template/saveTemplate', sendData).then(saveTemplateSuccess, saveTemplateFailure);
	}

	function saveTemplateSuccess(res) {
		console.log('temp save success', res);
	}

	function saveTemplateFailure(res) {
		console.log('save temp failure', res);
	}
	// 	function addStuff(){
	// 		templatesObject.template1.img='1';
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
		// console.log('bjljfkldaskdf', currentDonor.donor[0].donor.template);
		currentDonor.donor[0].donor.template[key] = value;
		// console.log('bjljfkldaskdf', currentDonor.donor[0].donor.template);


		console.log('TemplateService updateCurrentDonorKey, currentDonor:', currentDonor.donor[0]);
	}

	function updateCurrentDonorTemplate(templateNum) {
		switch (templateNum) {
			case "1":
				currentDonor.donor[0].donor.template = templatesObject.template1;
				break;
			case "2":
				currentDonor.donor[0].donor.template = templatesObject.template2;
				break;
			case "3":
				currentDonor.donor[0].donor.template = templatesObject.template3;
				break;
			case "4":
				currentDonor.donor[0].donor.template = templatesObject.template4;
				break;
			case "5":
				currentDonor.donor[0].donor.template = templatesObject.template5;
				break;
		}
	}

	function updateCurrentDonor(donor) {
		console.log('update current donor, donor:', donor);
		currentDonor.donor[0].donor = donor;
		console.log('Template current donor:', currentDonor.donor[0].donor);
	}





	var savedEmails = {
		emails: []
	};


	var imagesObject = {
		images: []
	}

	function createPhotoArray() {
		return $http.get('photos/createphotoarray').then(handlePhotoSuccess);
	};

	function handlePhotoSuccess(response) {
		console.log('template service response.data', response.data);
		imagesObject.images = response.data;
		// bleh();

	}
	// createPhotoArray();

	function bleh() {
		console.log('bleh', templatesObject);
		console.log('images object', imagesObject);
		var templateImage = {};
		console.log('template service templatesObject.img', templatesObject.template1.img);
		templateImage.t1 = {};
		templateImage.t2 = {};
		templateImage.t3 = {};
		templateImage.t4 = {};
		templateImage.t5 = {};
		console.log('templatesObject.template1.img', templatesObject.template1.img);
		templateImage.t1.img = templatesObject.template1.img.split('/');
		templateImage.t2.img = templatesObject.template2.img.split('/');
		templateImage.t3.img = templatesObject.template3.img.split('/');
		templateImage.t3.img2 = templatesObject.template3.img2.split('/');
		templateImage.t4.img = templatesObject.template4.img.split('/');
		templateImage.t4.img2 = templatesObject.template4.img2.split('/');
		templateImage.t4.img3 = templatesObject.template4.img3.split('/');
		templateImage.t4.img4 = templatesObject.template4.img4.split('/');
		templateImage.t5.img = templatesObject.template5.img.split('/');
		templateImage.t5.img2 = templatesObject.template5.img2.split('/');
		templateImage.t5.img3 = templatesObject.template5.img3.split('/');
		templateImage.t5.img4 = templatesObject.template5.img4.split('/');
		for (i = 0; i < imagesObject.images.length; i++) {
			console.log('imagesObject.images', imagesObject.images);
			if (templateImage.t1.img[2] == imagesObject.images[i].id) {
				templatesObject.template1.img = imagesObject.images[i];
				break;
			}
		}
		for (j = 0; j < imagesObject.images.length; j++) {
			if (templateImage.t2.img[2] == imagesObject.images[j].id) {
				templatesObject.template2.img = imagesObject.images[j];
			}
		}
		console.log('template service templates object bleh', templatesObject);
		// return templatesObject;
		for (k = 0; k < imagesObject.images.length; k++) {
			if (templateImage.t3.img[2] == imagesObject.images[k].id) {
				templatesObject.template3.img = imagesObject.images[k];
			}
			if (templateImage.t3.img2[2] == imagesObject.images[k].id) {
				templatesObject.template3.img2 = imagesObject.images[k];
			}
		}
		for (m = 0; m < imagesObject.images.length; m++) {
			if (templateImage.t4.img[2] == imagesObject.images[m].id) {
				templatesObject.template4.img = imagesObject.images[m];
			}
			if (templateImage.t4.img2[2] == imagesObject.images[m].id) {
				templatesObject.template4.img2 = imagesObject.images[m];
			}
			if (templateImage.t4.img3[2] == imagesObject.images[m].id) {
				templatesObject.template4.img3 = imagesObject.images[m];
			}
			if (templateImage.t4.img4[2] == imagesObject.images[m].id) {
				templatesObject.template4.img4 = imagesObject.images[m];
			}
			if (templateImage.t5.img[2] == imagesObject.images[m].id) {
				templatesObject.template5.img = imagesObject.images[m];
			}
			if (templateImage.t5.img2[2] == imagesObject.images[m].id) {
				templatesObject.template5.img2 = imagesObject.images[m];
			}
			if (templateImage.t5.img3[2] == imagesObject.images[m].id) {
				templatesObject.template5.img3 = imagesObject.images[m];
			}
			if (templateImage.t5.img4[2] == imagesObject.images[m].id) {
				templatesObject.template5.img4 = imagesObject.images[m];
			}
		}
	}


	function uploadPic(file) {
		file.upload = Upload.upload({
			url: '/photos',
			arrayKey: '', // default is '[i]'
			data: {
				file: file
			}
		});
		file.upload.then(function(response) {
			$timeout(function() {
				file.result = response.data;
				createPhotoArray();
			});
		}, function(response) {
			if (response.status > 0)
				vm.errorMsg = response.status + ': ' + response.data;
		}, function(evt) {
			// Math.min is to fix IE which reports 200% sometimes
			file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
		});
	};

	var templatesArray = [];

	function getTemplates() {
		return $http.get('/template/getTemplates').then(getTemplateSuccess, getTemplateFailure);
	}

	function getTemplateSuccess(res) {
		console.log('templates data service', res);
		templatesArray = res.data;
		console.log('templates array', templatesArray);
		templatesObject.template1 = templatesArray[0];
		templatesObject.template2 = templatesArray[1];
		templatesObject.template3 = templatesArray[2];
		templatesObject.template4 = templatesArray[3];
		templatesObject.template5 = templatesArray[4];
		// console.log('templates object gettemplatesuccess', templatesObject);
		// bleh(templatesObject);
		// bleh();
	}

	function getTemplateFailure(res) {
		console.log('template retrieval failure');
	}

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
	// bleh();
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
		updateCurrentDonorKey: updateCurrentDonorKey,
		updateCurrentDonorTemplate: updateCurrentDonorTemplate,
		bleh: bleh,
		getTemplates: getTemplates,
		templatesObject: templatesObject
	}


}]);
