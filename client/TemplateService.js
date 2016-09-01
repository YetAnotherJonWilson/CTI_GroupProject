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

	function saveTemplate(template){
		var sendData= template;
		$http.post('/template/saveTemplate', sendData).then(saveTemplateSuccess, saveTemplateFailure);
	}
	function saveTemplateSuccess(res){
		console.log('temp save success', res);
	}
// 	function saveTemplateFailure(res){
// 		console.log('save temp failure', res);
// 	}
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
		console.log('bjljfkldaskdf', currentDonor.donor[0].donor.template);
		currentDonor.donor[0].donor.template[key] = value;
		console.log('bjljfkldaskdf', currentDonor.donor[0].donor.template);


		console.log('TemplateService updateCurrentDonorKey, currentDonor:', currentDonor.donor[0]);
	}

	function updateCurrentDonorTemplate(templateNum){
		currentDonor.donor[0].donor.template.temp = templateNum;
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
		return $http.get('photos/createphotoarray').then(handlePhotoSuccess);
	};
	function handlePhotoSuccess(response){
		console.log('template service response.data', response.data);
		imagesObject.images = response.data;
		// bleh();

	}
	createPhotoArray();

	function bleh(){
		console.log('bleh', templatesObject);
		console.log('images object', imagesObject);
		var templateImages ={};
		// console.log('template service templatesObject.img', templatesObject.template1.img);
		templateImages.t1 = {};
		templateImages.t2 = {};
		console.log('templatesObject.template1.img', templatesObject.template1.img);
		templateImages.t1.img = templatesObject.template1.img.split('/');
		templateImages.t2.img = templatesObject.template2.img.split('/');
		// templateImages.t3.img = templatesObject.template3.img.split('/');
		// templateImages.t3.img2 = templatesObject.template3.img2.split('/');
		// templateImages.t4.img = templatesObject.template4.img.split('/');
		// templateImages.t4.img2 = templatesObject.template4.img2.split('/');
		// templateImages.t4.img3 = templatesObject.template4.img3.split('/');
		// templateImages.t4.img4 = templatesObject.template4.img4.split('/');
		// templateImages.t5.img = templatesObject.template5.img.split('/');
		// templateImages.t5.img2 = templatesObject.template5.img2.split('/');
		// templateImages.t5.img3 = templatesObject.template5.img3.split('/');
		// templateImages.t5.img4 = templatesObject.template5.img4.split('/');
		for(i = 0; i < imagesObject.images.length; i++){
			console.log('imagesObject.images', imagesObject.images);
			if(templateImages.t1.img[2] == imagesObject.images[i].id){
				templatesObject.template1.img = imagesObject.images[i];
				break;
			}
		}
		for(j = 0; j < imagesObject.images.length; j++){
			if(templateImages.t2.img[2] == imagesObject.images[j].id){
				templatesObject.template2.img = imagesObject.images[j];
			}
		}
		console.log('template service templates object bleh', templatesObject);
		// return templatesObject;
		// for(k = 0; k < imagesObject.images.length; k++){
		// 	if(templatesImages.t3.img[2] == imagesObject.images[k].id){
		// 		templatesObject.template3.img = imagesObject.images[k];
		// 	}
		// 	if(templatesImages.t3.img2[2] == imagesObject.images[k].id){
		// 		templatesObject.template1.img2 = imagesObject.images[k];
		// 	}
		// }
		// for(m = 0; m < imagesObject.images.length; m++){
		// 	if(templatesImages.t4.img[2] == imagesObject.images[m].id){
		// 		templatesObject.template4.img = imagesObject.images[m];
		// 	}
		// 	if(templatesImages.t4.img[2] == imagesObject.images[m].id){
		// 		templatesObject.template4.img2 = imagesObject.images[m];
		// 	}
		// 	if(templatesImages.t4.img[2] == imagesObject.images[m].id){
		// 		templatesObject.template4.img3 = imagesObject.images[m];
		// 	}
		// 	if(templatesImages.t4.img[2] == imagesObject.images[m].id){
		// 		templatesObject.template4.img4 = imagesObject.images[m];
		// 	}
		// 	if(templatesImages.t5.img[2] == imagesObject.images[m].id){
		// 		templatesObject.template5.img = imagesObject.images[m];
		// 	}
		// 	if(templatesImages.t5.img[2] == imagesObject.images[m].id){
		// 		templatesObject.template5.img2 = imagesObject.images[m];
		// 	}
		// 	if(templatesImages.t5.img[2] == imagesObject.images[m].id){
		// 		templatesObject.template5.img3 = imagesObject.images[m];
		// 	}
		// 	if(templatesImages.t5.img[2] == imagesObject.images[m].id){
		// 		templatesObject.template5.img4 = imagesObject.images[m];
		// 	}
		// }
	}


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

	var templatesArray=[];
	function getTemplates(){
	    return $http.get('/template/getTemplates').then(getTemplateSuccess, getTemplateFailure);
	}
	function getTemplateSuccess(res){
	  console.log('templates data service', res);
	  templatesArray = res.data;
	  console.log('templates array', templatesArray);
	  templatesObject.template1=templatesArray[0];
	  templatesObject.template2=templatesArray[1];
	  templatesObject.template3=templatesArray[2];
	  templatesObject.template4=templatesArray[3];
	  templatesObject.template5=templatesArray[4];
		// console.log('templates object gettemplatesuccess', templatesObject);
		// bleh(templatesObject);
		bleh();
	}
	function getTemplateFailure(res){
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
