angular.module('App').factory('TemplateService', ['$location', function($location) {

	var currentTemplate = {
		p1: '',
		p2: '',
		p3: '',
		p4: '',
		q: '',
		currentEdit: '',
		img: ''
	}

	function setCurrentImg(img){
		currentTemplate.img = img;
	}

	var savedEmails = {
		emails: []
	}

	var templatesObject = {
		template1: {
			p1: 'Thank you for believing in a world without hunger and poverty. And not just believing in such a world, but making it possible. Because of your generosity, communities around the world are gaining safe water and putting more food on the table.',
			p2: 'It\'s clear that you see the value in helping people help themselves. But I want you to know what a profound impact your gift can have on someone\'s life. Read what Aissatou Ly, Senegalese farmer and business owner, told us:',
			p3: 'Your gift helps women like Aissatou start businesses, earn an income, and send their kids to school-or go themselves. You make success stories like Aissatou\'s possible. And I can\'t thank you enough.',
			p4: '',
			q: "Six months ago I bought a CTI grinder. I provide grinding services to other women and grind about 10 kg of peanut butter a day and sell it at the weekly market. I'm proud, as a woman, to be a leader and have respect in my community. I'm proud that I don't need to ask for help.",
			currentField: '',
			img: 'assets/sampleimage3.jpg'
		},
		template2: {},
		template3: {}
	}


	var imagesObject = {
		images: ['assets/sampleimage.jpg', 'assets/sampleimage2.jpg', 'assets/sampleimage3.jpg', 'assets/sampleimage4.jpg', 'assets/sampleimage5.jpg', 'assets/sampleimage0.jpg', 'assets/sampleimage20.jpg', 'assets/sampleimage30.jpg', 'assets/sampleimage40.jpg', 'assets/sampleimage50.jpg']
	}


	function getCurrentTemplate(templateNum){
		currentTemplate.p1 = templatesObject['template' + templateNum].p1;
		currentTemplate.p2 = templatesObject['template' + templateNum].p2;
		currentTemplate.p3 = templatesObject['template' + templateNum].p3;
		currentTemplate.p4 = templatesObject['template' + templateNum].p4;
		currentTemplate.q = templatesObject['template' + templateNum].q;
		currentTemplate.img = templatesObject['template' + templateNum].img;
	}


	function saveEditedEmail(p1, p2, p3, p4, q){
		savedEmails.emails.push({
			p1: p1,
			p2: p2,
			p3: p3,
			p4: p4,
			q: q,
		})
	}

	return {
		currentTemplate: currentTemplate,
		getCurrentTemplate: getCurrentTemplate,
		imagesObject: imagesObject,
		saveEditedEmail: saveEditedEmail,
		savedEmails: savedEmails,
		setCurrentImg: setCurrentImg,
		templatesObject: templatesObject
	}


}])
