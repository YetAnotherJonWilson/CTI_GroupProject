angular.module('App').factory('TemplateService', ['$location', 'Upload', '$timeout', '$http', 'DataService', function($location, Upload, $timeout, $http, DataService) {

	// top level object that contains all service data
	var data = {};

	//TODO rename to data.templatesObject
	var templatesObject = {};
	// var currentTemplate = {
	// 	// p1: '',
	// 	// p2: '',
	// 	// p3: '',
	// 	// p4: '',
	// 	// quote: '',
	// 	// ps: '',
	// 	// currentField: '',
	// 	// img: ''
	// };

	var vm = this;
	data.signatures = {};
	data.headers = {};

	// TODO should hang off of data
	var currentDonor = {
		donor: [{
			donor: {}
		}]
	}

	// var templatesObject = DataService.templatesObject;


	function saveTemplate(template){
		var sendData= {};
		sendData.id = template._id;
		sendData.p1 = template.p1;
    sendData.p2 = template.p2;
    sendData.p3 = template.p3;
    sendData.p4 = template.p4;
    sendData.quote = template.quote;
		sendData.ps = template.ps;
    if(template.img != null | template.img != ''){
      sendData.img = 'photos/getDbImages/' + template.img.id;
    }
    if(template.img2 != null | template.img2 != ''){
      sendData.img2 = 'photos/getDbImages/' + template.img2.id;
    }
    if(template.img3 != null | template.img3 != ''){
      sendData.img3 = 'photos/getDbImages/' + template.img3.id;
    }
    if(template.img4 != null | template.img4 != ''){
      sendData.img4 = 'photos/getDbImages/' + template.img4.id;
    }
    sendData.template = template.temp;
		sendData.senderTitle = template.senderTitle;
		sendData.senderName = template.senderName;
		console.log('senddata',sendData);
		return $http.post('/template/saveTemplate', sendData).then(saveTemplateSuccess, saveTemplateFailure);
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

	function updateCurrentDonorKey(key, value, num) {
		console.log('key', key);
		console.log('vlaue', value);
		console.log('num', num);
		console.log('bjljfkldaskdf', currentDonor.donor[0].donor["template"+num]);
		currentDonor.donor[0].donor["template"+num][key] = value;
		// console.log('bjljfkldaskdf', currentDonor.donor[0].donor.template);

		console.log('TemplateService updateCurrentDonorKey, currentDonor:', currentDonor.donor[0]);
	}

	// function updateCurrentDonorTemplate(templateNum) {
	// 	switch (templateNum) {
	// 		case "1":
	// 			currentDonor.donor[0].donor.template = templatesObject.template1;
	// 			break;
	// 		case "2":
	// 			currentDonor.donor[0].donor.template = templatesObject.template2;
	// 			break;
	// 		case "3":
	// 			currentDonor.donor[0].donor.template = templatesObject.template3;
	// 			break;
	// 		case "4":
	// 			currentDonor.donor[0].donor.template = templatesObject.template4;
	// 			break;
	// 		case "5":
	// 			currentDonor.donor[0].donor.template = templatesObject.template5;
	// 			break;
	// 	}
	// }

	function updateCurrentDonor(donor) {
		console.log('update current donor, donor:', donor);
		currentDonor.donor[0].donor =  donor;
		console.log('Template current donor:', currentDonor.donor[0].donor);
	}
 	data.currentTemplate = {key: 'bleh'};
	function updateCurrentDonorTemplate(num){
		data.currentTemplate = {};
		// return $http.get('/template/bleh').then(function(response){
			data.currentTemplate =	currentDonor.donor[0].donor["template"+num];
			 console.log('currenttemp tempserv', data.currentTemplate);
			 return data.currentTemplate;
		// }, function(response){
			// console.log('f');
		// });

	}

function awesome(){
	return data.currentTemplate;
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
		var templateSig = {};
		var templateHeader = {};
		console.log('tempservice sigObject', templatesObject.template1.sig);
		console.log('tempservice headerObject', templatesObject.template2.header);
		console.log('template service templatesObject.img', templatesObject.template5);
		templateImage.t1 = {};
		templateImage.t2 = {};
		templateImage.t3 = {};
		templateImage.t4 = {};
		templateImage.t5 = {};
		console.log('templatesObject.template1.img', templatesObject.template5.img);
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
		templateSig.sig = templatesObject.template1.sig.split('/');
		templateHeader.header = templatesObject.template1.header.split('/');
		templateSig.sig = templatesObject.template2.sig.split('/');
		templateHeader.header = templatesObject.template2.header.split('/');
		templateSig.sig = templatesObject.template3.sig.split('/');
		templateHeader.header = templatesObject.template3.header.split('/');
		templateSig.sig = templatesObject.template4.sig.split('/');
		templateHeader.header = templatesObject.template4.header.split('/');
		templateSig.sig = templatesObject.template5.sig.split('/');
		templateHeader.header = templatesObject.template5.header.split('/');
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
		for(n = 0; n < 5; n++){
			if(templateSig.sig[2] == templatesObject.template1.sig.id){
				templatesObject.template1.sig = data.signatures;
			}
			if(templateSig.sig[2] == templatesObject.template2.sig.id){
				templatesObject.template2.sig = data.signatures;
			}
			if(templateSig.sig[2] == templatesObject.template3.sig.id){
				templatesObject.template3.sig = data.signatures;
			}
			if(templateSig.sig[2] == templatesObject.template4.sig.id){
				templatesObject.template4.sig = data.signatures;
			}
			if(templateSig.sig[2] == templatesObject.template5.sig.id){
				templatesObject.template5.sig = data.signatures;
			}
		}
		for(o = 0; o < 5; o++){
			if(templateHeader.header[2] == templatesObject.template1.header.id){
				templatesObject.template1.header = data.headers;
			}
			if(templateHeader.header[2] == templatesObject.template2.header.id){
				templatesObject.template2.header = data.headers;
			}
			if(templateHeader.header[2] == templatesObject.template3.header.id){
				templatesObject.template3.header = data.headers;
			}
			if(templateHeader.header[2] == templatesObject.template4.header.id){
				templatesObject.template4.header = data.headers;
			}
			if(templateHeader.header[2] == templatesObject.template5.header.id){
				templatesObject.template5.header = data.headers;
			}
		}
		console.log('template service templates object bleh', templatesObject);
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
		templatesObject.template1 = Object.assign({},templatesArray[0]);
		templatesObject.template2 = Object.assign({},templatesArray[1]);
		templatesObject.template3 = Object.assign({},templatesArray[2]);
		templatesObject.template4 = Object.assign({},templatesArray[3]);
		templatesObject.template5 = Object.assign({},templatesArray[4]);
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

	function getSigArray(){
		return $http.get('/photos/createsignaturearray').then(function(response){
			console.log('success creating sig array in tempservice', response);
			data.signatures = response.data;
			console.log('huh got signatures from db', data.signatures);
		}, function(err){
			console.log('err creating sigarray in tempservice', err);
		})
	}

	function getHeadersArray(){
		return $http.get('/photos/createheaderarray').then(function(response){
			console.log('success creating header array in tempservice', response);
			data.headers = response.data;
			console.log('meh got headers from db', data.headers);
		}, function(err){
			console.log('err creating headersArray in tempservice', err);
		});
	}
	function updateCurrentTemplateKey(key, value, num){
		console.log(key, value, num);
		templatesObject["template"+num][key] = value;
	}
	// bleh();
	return {
		currentDonor: currentDonor,
		//currentTemplate: currentTemplate,
		data: data,
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
		templatesObject: templatesObject,
		awesome: awesome,
		saveTemplate: saveTemplate,
		getSigArray: getSigArray,
		getHeadersArray: getHeadersArray,
		updateCurrentTemplateKey: updateCurrentTemplateKey
	}


}]);
