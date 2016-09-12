angular.module('App').factory('DataService', ['$http', '$location', function($http, $location) {

	var data = [];
	var sorted = [];
	var sortedObject = {};
	var templatesObject = {};
 
	var donorObject = {
		donors: [{
			AccountId: "001d000000K2KKAAA3",
			Amount: 200,
			CloseDate: "2016-08-31",
			Id: "006d000000r6cKWAAY",
			Name: "Test",
			Primary_Contact__c: "003d000000V8J9gAAF",
			address: {
				city: "Monrovia",
				country: "Liberia",
				countryCode: null,
				geocodeAccuracy: null,
				latitude: null,
				longitude: null,
				postalCode: null,
				state: null,
				stateCode: null,
				street: "N&N Corporation",
			},
			date: "08-31-2016",
			donationHistory: {
				lifeTimeAmount: 635,
				lifeTimeNumber: 2
			},
			email: "ctithankyou@outlook.com",
			firstName: "Christian",
			formalGreeting: "Christian Neufville",
			householdId: "a00d0000007j6fAAAQ",
			informalGreeting: "Christian",
			lastName: "Neufville",
			npe01__Contact_Id_for_Role__c: "003d000000V8J9gAAF",
			npe01__Is_Opp_From_Individual__c: "true",
			personName: "Neufville Household",
			phone: "No phone number found",
		}, {
			AccountId: "001d0000025MIlJAAW",
			Amount: 300,
			CloseDate: "2016-09-02",
			Id: "006d000000r6efMAAQ",
			Name: "Tony Test 09/02/16",
			Primary_Contact__c: "003d0000037X5z3AAC",
			address: {
				city: "Notreal",
				country: "US",
				countryCode: null,
				geocodeAccuracy: null,
				latitude: null,
				longitude: null,
				postalCode: "55444",
				state: "MT",
				stateCode: null,
				street: "123 fake st."
			},
			date: "09-02-2016",
			donationHistory: {
				lifeTimeAmount: 1100,
				lifeTimeNumber: 8
			},
			email: "tdjohnson0722@gmail.com",
			firstName: "Tony",
			formalGreeting: "Mr. Tony Johnson",
			householdId: "a00d000000mOdmgAAC",
			informalGreeting: "Tony",
			lastName: "Johnson",
			npe01__Contact_Id_for_Role__c: "003d0000037X5z3AAC",
			npe01__Is_Opp_From_Individual__c: "true",
			personName: "Johnson Household",
			phone: "(555) 555-3333"
		}, {
			AccountId: "001d0000025MImRAAW",
			Amount: 2000,
			CloseDate: "2016-09-01",
			Id: "006d000000r6ehSAAQ",
			Name: "Mary Wilson- Donation 9/01/2016",
			Primary_Contact__c: "003d0000037X61sAAC",
			address: {
				city: "real",
				country: null,
				countryCode: null,
				geocodeAccuracy: null,
				latitude: null,
				longitude: null,
				postalCode: 55707,
				state: "MN",
				stateCode: null,
				street: "74382 idk ave"
			},
			date: "09-01-2016",
			donationHistory: {
				lifeTimeAmount: 11110,
				lifeTimeNumber: 2
			},
			email: "ctithankyou@outlook.com",
			firstName: "Mary",
			formalGreeting: "Mrs. Maria",
			householdId: "a00d000000mOdn5AAC",
			informalGreeting: "Mary",
			lastName: "Wilson",
			npe01__Contact_Id_for_Role__c: "003d0000037X61sAAC",
			npe01__Is_Opp_From_Individual__c: "true",
			personName: "Wilson Household",
			phone: "(651) 444-4444"
		}, {
			AccountId: "001d0004 00K2KKAAAu",
			Amount: 550,
			CloseDate: "2016-09-05",
			Id: "006d000000r6cKWMAY",
			Name: "Test",
			Primary_Contact__c: "003d000000V8J9gAAF",
			address: {
				city: "Minneapolis",
				country: "United States",
				countryCode: null,
				geocodeAccuracy: null,
				latitude: null,
				longitude: null,
				postalCode: '55104',
				state: 'MN',
				stateCode: null,
				street: "Main St.",
			},
			date: "09-05-2016",
			donationHistory: {
				lifeTimeAmount: 900,
				lifeTimeNumber: 3
			},
			email: "ctithankyou@outlook.com",
			firstName: "Sandy",
			formalGreeting: "Sandy Carlile",
			householdId: "a00d0000007j6fAAAQ",
			informalGreeting: "Sandy",
			lastName: "Carlile",
			npe01__Contact_Id_for_Role__c: "003d000000V8J9gAAF",
			npe01__Is_Opp_From_Individual__c: "true",
			personName: "Carlile Household",
			phone: "(651)-555-5555"
		}, {
			AccountId: "001d000000K2KKBAN6",
			Amount: 75,
			CloseDate: "2016-09-04",
			Id: "006d000000r6cKWMA1",
			Name: "Test",
			Primary_Contact__c: "003d000000V8J9gAAF",
			address: {
				city: "St. Paul",
				country: "United States",
				countryCode: null,
				geocodeAccuracy: null,
				latitude: null,
				longitude: null,
				postalCode: '55112',
				state: 'MN',
				stateCode: null,
				street: "Jackson St.",
			},
			date: "09-04-2016",
			donationHistory: {
				lifeTimeAmount: 75,
				lifeTimeNumber: 1
			},
			email: "ctithankyou@outlook.com",
			firstName: "Hannah",
			formalGreeting: "Hannah Samsonite",
			householdId: "a00d0000007j6fAAAQ",
			informalGreeting: "Hannah",
			lastName: "Samsonite",
			npe01__Contact_Id_for_Role__c: "003d000000V8J9gAAF",
			npe01__Is_Opp_From_Individual__c: "true",
			personName: "Samsonite Household",
			phone: "No phone number found"
		}]
	}


	function getData() {
		return $http.get('/salesforce/data').then(handleSuccess, handleFailure);
	}

	function handleSuccess(res) {
		console.log(res);
		data = res.data;
		sortData(data);
		preconvertDates();
		// convertDates();
		// $location.path('/home');
	}

	function handleFailure(res) {
		console.log('fail', res);
	}

	function preconvertDates() {
		for (var i = 0; i < sortedObject.sorted.length; i++) {
			var dateArray = sortedObject.sorted[i].CloseDate.split('-');
			sortedObject.sorted[i].date = dateArray[1] + '-' + dateArray[2] + '-' + dateArray[0];
		}
	}

	// function convertDates(){
	//     for (var i = 0; i < sortedObject.sorted.length; i++){
	//       sortedObject.sorted[i].convertedDate = new Date(sortedObject.sorted[i].date);
	//     }
	// }
	function sortData(data) {
		for (var i = 0; i < data[0].length; i++) {
			sorted.push(data[0][i]);
		}
		findHouseholdId();
		findNextKeys();
	}

	function findHouseholdId() {
		for (var i = 0; i < sorted.length; i++) {
			for (var j = 0; j < data[1].length; j++) {
				if (sorted[i].Primary_Contact__c == data[1][j].Id) {
					sorted[i].householdId = data[1][j].npo02__Household__c;
					break;
				}
			}
		}
	}

	function findNextKeys() {
		for (var i = 0; i < sorted.length; i++) {
			sorted[i].email = findEmail(sorted[i]);
			sorted[i].address = findAddress(sorted[i]);
			sorted[i].formalGreeting = findFormalGreeting(sorted[i]);
			sorted[i].informalGreeting = findInformalGreeting(sorted[i]);
			sorted[i].personName = findName(sorted[i]);
			sorted[i].phone = findPhone(sorted[i]);
			sorted[i].donationHistory = findDonationHistory(sorted[i]);
			sorted[i].firstName = findFirstName(sorted[i]);
			sorted[i].lastName = findLastName(sorted[i]);
		}
		console.log(sorted);
	}

	function findEmail(donationObject) {
		var email = "";
		for (var i = 0; i < data[3].length; i++) {
			if (donationObject.householdId == data[3][i].Id && data[3][i].npo02__HouseholdEmail__c != null) {
				return data[3][i].npo02__HouseholdEmail__c;
			}
		}
		for (var i = 0; i < data[1].length; i++) {
			if (donationObject.Primary_Contact__c == data[1][i].Id && data[1][i].Email != null) {
				return data[1][i].Email;
			}
		}
		for (var i = 0; i < data[2].length; i++) {
			if (donationObject.AccountId == data[2][i].Id && data[2][i].Organization_Email__c != null) {
				return data[2][i].Organization_Email__c;
			}
		}
		return "no email found";
	}

	function findAddress(donationObject) {
		if (donationObject.npe01__Is_Opp_From_Individual__c === "true") {
			for (var i = 0; i < data[1].length; i++) {
				if (donationObject.Primary_Contact__c == data[1][i].Id && data[1][i].MailingAddress != null) {
					return data[1][i].MailingAddress;
				}
			}
			for (var i = 0; i < data[3].length; i++) {
				if (donationObject.householdId == data[3][i].Id && data[3][i].npo02__Formula_MailingAddress__c != null) {
					return data[3][i].npo02__Formula_MailingAddress__c;
				}
			}
		} else {
			for (var i = 0; i < data[2].length; i++) {
				if (donationObject.AccountId == data[2][i].Id && data[2][i].BillingAddress != null) {
					return data[2][i].BillingAddress
				}
			}
		}
		return "no address found";
	}

	function findFormalGreeting(donationObject) {
		if (donationObject.npe01__Is_Opp_From_Individual__c === "true") {
			for (var i = 0; i < data[3].length; i++) {
				if (donationObject.householdId == data[3][i].Id && data[3][i].npo02__Formal_Greeting__c != null) {
					return data[3][i].npo02__Formal_Greeting__c;
				}
			}
			for (var i = 0; i < data[1].length; i++) {
				if (donationObject.Primary_Contact__c == data[1][i].Id && data[1][i].name != null && data[1][i].Saluation != null) {
					return data[1][i].Saluation + data[1][i].Name;
				} else if (donationObject.Primary_Contact__c == data[1][i].Id && data[1][i].name != null) {
					return data[1][i].Name;
				}
			}
		} else {
			for (var i = 0; i < data[1].length; i++) {
				if (donationObject.Primary_Contact__c == data[1][i].Id && data[1][i].Name != null && data[1][i].Saluation != null) {
					return data[1][i].Saluation + data[1][i].Name;
				} else if (donationObject.Primary_Contact__c == data[1][i].Id && data[1][i].Name != null) {
					return data[1][i].Name;
				}
			}
			for (var i = 0; i < data[2].length; i++) {
				if (donationObject.AccountId == data[2][i].Id && data[2][i].Name != null && data[2][i].Formal_Salutation__c != null) {
					return data[2][i].Formal_Salutation__c + data[2][i].Name;
				} else if (donationObject.AccountId == data[2][i].Id && data[2][i].Name != null) {
					return data[2][i].Name;
				}
			}
		}
		return "no Formal Greeting found";
	}

	function findInformalGreeting(donationObject) {
		if (donationObject.npe01__Is_Opp_From_Individual__c === "true") {
			for (var i = 0; i < data[3].length; i++) {
				if (donationObject.householdId == data[3][i].Id && data[3][i].npo02__Informal_Greeting__c != null) {
					return data[3][i].npo02__Informal_Greeting__c;
				}
			}
			for (var i = 0; i < data[2].length; i++) {
				if (donationObject.AccountId == data[2][i].Id && data[2][i].Informal_Greeting__c != null) {
					return data[2][i].Informal_Greeting__c;
				}
			}
			for (var i = 0; i < data[1].length; i++) {
				if (donationObject.Primary_Contact__c == data[1][i].Id && data[1][1].Greeting__c != null) {
					return data[2][i].Greeting__c;
				}
			}
		} else {
			for (var i = 0; i < data[2].length; i++) {
				if (donationObject.AccountId == data[2][i].Id && data[2][i].Informal_Greeting__c != null) {
					return data[2][i].Informal_Greeting__c;
				}
			}
			for (var i = 0; i < data[1].length; i++) {
				if (donationObject.Primary_Contact__c == data[1][i].Id && data[1][i].Greeting__c != null) {
					return data[1][i].Greeting__c;
				}
			}
		}
		return "no informal Greeting found";
	}

	function findName(donorObject) {
		if (donorObject.npe01__Is_Opp_From_Individual__c === 'true') {
			for (var i = 0; i < data[3].length; i++) {
				if (donorObject.householdId == data[3][i].Id) {
					return data[3][i].Name;
				}
			}
			for (var j = 0; j < data[1].length; j++) {
				if (donorObject.Primary_Contact__c == data[1][j].Id) {
					return data[1][j].Name;
				}
			}
		} else {
			for (var j = 0; j < data[1].length; j++) {
				if (donorObject.Primary_Contact__c == data[1][j].Id) {
					return data[1][j].Name;
				}
			}
			for (var k = 0; k < data[2].length; k++) {
				if (donorObject.AccountId == data[2][k].Id) {
					return data[2][k].Name;
				}
			}
		}
		return 'No Name Found';
	}

	function findPhone(donorObject) {
		if (donorObject.npe01__Is_Opp_From_Individual__c === 'true') {
			for (var i = 0; i < data[3].length; i++) {
				if (donorObject.householdId == data[3][i].Id) {
					if (data[3][i].npo02__HouseholdPhone__c !== null) {
						return data[3][i].npo02__HouseholdPhone__c;
					} else {
						break;
					}
				}
			}
			for (var j = 0; j < data[1].length; j++) {
				if (donorObject.Primary_Contact__c == data[1][j].Id) {
					if (data[1][j].Phone !== null) {
						return data[1][j].Phone;
					} else {
						break
					}
				}
			}
		} else {
			for (var k = 0; k < data[2].length; k++) {
				if (donorObject.AccountId == data[2][k].Id) {
					if (data[2][k].Phone !== null) {
						return data[2][k].Phone;
					} else {
						break;
					}
				}
			}
			for (var l = 0; l < data[1].length; l++) {
				if (donorObject.Primary_Contact__c == data[1][l].Id) {
					if (data[1][l].Phone !== null) {
						return data[1][l].Phone;
					} else {
						return 'No phone number found';
					}
				}
			}

		}
		return 'No phone number found';
	}

	function findDonationHistory(donorObject) {
		for (var i = 0; i < data[2].length; i++) {
			var donationHistory = {};
			if (donorObject.AccountId == data[2][i].Id && data[2][i].BillingAddress != null) {
				donationHistory.lifeTimeAmount = data[2][i].npe01__LifetimeDonationHistory_Amount__c;
				donationHistory.lifeTimeNumber = data[2][i].npe01__LifetimeDonationHistory_Number__c;
				return donationHistory;
			}
		}
		return 'No donation history found';
	}

	function findFirstName(donationObject) {
		for (var i = 0; i < data[1].length; i++) {
			if (donationObject.Primary_Contact__c == data[1][i].Id) {
				var names = data[1][i].Name.split(' ');
				return names[0];
			}
		}
	}

	function findLastName(donationObject) {
		for (var i = 0; i < data[1].length; i++) {
			if (donationObject.Primary_Contact__c == data[1][i].Id) {
				var names = data[1][i].Name.split(' ');
				return names[1];
			}
		}
	}
	sortedObject.sorted = sorted;
	// preconvertDates();
	// convertDates();
	// function createTemplate(){
	//   var sendData={};
	//   $http.post('/template/addtemplates', sendData).then(handletemplatesuccess, handletemplatefailure);
	// }
	// function handletemplatesuccess(res){
	//   console.log('Template created');
	// }
	// function handletemplatefailure(res){
	//   console.log('template create failed');
	// }
	// createTemplate();
	// var templatesArray=[];
	// function getTemplates(){
	//     return $http.get('/template/getTemplates').then(getTemplateSuccess, getTemplateFailure);
	// }
	// function getTemplateSuccess(res){
	//   console.log('templates data service', res);
	//   templatesArray = res.data;
	//   console.log(templatesArray);
	//   templatesObject.template1=templatesArray[0];
	//   templatesObject.template2=templatesArray[1];
	//   templatesObject.template3=templatesArray[2];
	//   templatesObject.template4=templatesArray[3];
	//   templatesObject.template5=templatesArray[4];
	// }
	// function getTemplateFailure(res){
	//   console.log('template retrieval failure');
	// }


	return {
		preconvertDates: preconvertDates,
		// convertDates: convertDates,
		sortedObject: sortedObject,
		// getDonors: getDonors,
		getData: getData,
		donorObject: donorObject
			// ,
			// templatesObject: templatesObject
			// ,
			// getTemplates: getTemplates
	};
}]);
