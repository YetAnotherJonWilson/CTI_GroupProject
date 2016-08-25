angular.module('App').factory('DataService', ['$http', function($http){

  var data=[];
  var sorted=[];
  var sortedObject={};

  var donorObject = {
    donors:[{
      firstName: 'Jimmy',
      lastName: 'Jam',
      email: 'jimmyj@gmail.com',
      donationAmount: 5000,
      donationDate: '8/6/2017',
      street: 'Detroit Ave',
      city: 'Detroit',
      state: 'Michigan',
      zip: 87657
    },{
      firstName: 'Michael',
      lastName: 'Jackson',
      email: 'immichael@hotmail.com',
      donationAmount: 60000,
      donationDate: '5/23/2017',
      street: 'Neverland Way',
      city: 'Los Angeles',
      state: 'California',
      zip: 90280
    },{
      firstName: 'Phil',
      lastName: 'Mickelson',
      email: 'lefty@yahoo.com',
      donationAmount: 9000,
      donationDate: '7/6/2017',
      street: 'Orlando Way',
      city: 'Orlando',
      state: 'Florida',
      zip: 34089
    },{
      firstName: 'Michael',
      lastName: 'Jordan',
      email: 'hisairness@gmail.com',
      donationAmount: 50000,
      donationDate: '5/20/2014',
      street: 'Dunk St.',
      city: 'Chicago',
      state: 'IL',
      zip: 55612
    },
    {
      firstName: 'Michael',
      lastName: 'Phelps',
      email: 'phelpswim@gmail.com',
      donationAmount: 40000,
      donationDate: '6/05/2016',
      street: 'Swim St.',
      city: 'Los Angeles',
      state: 'CA',
      zip: 90212
    },
    {
      firstName: 'Steve',
      lastName: 'Jobs',
      email: 'applefan@apple.com',
      donationAmount: 100000,
      donationDate: '12/25/2012',
      street: 'Apple Ave.',
      city: 'Silicon Valley',
      state: 'CA',
      zip: 90543
    },
    {
      firstName: 'John',
      lastName: 'Wayne',
      email: 'olejonny@gmail.com',
      donationAmount: 19,
      donationDate: '1/30/1981',
      street: 'Old West St.',
      city: 'Old West Town',
      state: 'MT',
      zip: 65652
    }]
  }



  // function getDonors(){
  //   $http.get('/salesforce/oauth2/auth').then(getData, handleFailure);
  // }
  function getData(){
    $http.get('/salesforce/data').then(handleSuccess, handleFailure);
  }

  function handleSuccess(res){
      console.log(res);
      data=res.data;
      sortData(data);
      preconvertDates();
      convertDates();
  }
  function handleFailure(res){
    console.log('fail', res);
  }
  function preconvertDates(){
    for (var i=0; i<sortedObject.sorted.length; i++){
    var dateArray = sortedObject.sorted[i].CloseDate.split('-');
    sortedObject.sorted[i].date = dateArray[1]+'-'+dateArray[2]+'-'+dateArray[0];
    }
  }

function convertDates(){
    for (var i = 0; i < sortedObject.sorted.length; i++){
      sortedObject.sorted[i].convertedDate = new Date(sortedObject.sorted[i].date);
    }
}
function sortData(data){
  for (var i=0; i<data[0].length; i++){
    sorted.push(data[0][i]);
  }
  findHouseholdId();
  findNextKeys();
}

function findHouseholdId(){
  for(var i=0; i<sorted.length; i++){
    for(var j=0; j<data[1].length; j++){
      if(sorted[i].Primary_Contact__c == data[1][j].Id){
        sorted[i].householdId= data[1][j].npo02__Household__c;
        break;
      }
    }
  }
}
function findNextKeys(){
  for(var i=0; i<sorted.length; i++){
    sorted[i].email=findEmail(sorted[i]);
    sorted[i].address=findAddress(sorted[i]);
    sorted[i].formalGreeting=findFormalGreeting(sorted[i]);
    sorted[i].informalGreeting=findInformalGreeting(sorted[i]);
    sorted[i].personName=findName(sorted[i]);
    sorted[i].phone=findPhone(sorted[i]);
    sorted[i].donationHistory=findDonationHistory(sorted[i]);
    sorted[i].firstName=findFirstName(sorted[i]);
    sorted[i].lastName=findLastName(sorted[i]);
  }
  console.log(sorted);
}
function findEmail(donationObject){
  var email="";
  for(var i=0; i<data[3].length; i++){
    if(donationObject.householdId==data[3][i].Id && data[3][i].npo02__HouseholdEmail__c != null){
      return data[3][i].npo02__HouseholdEmail__c;
    }
  }
  for (var i=0; i<data[1].length; i++){
    if(donationObject.Primary_Contact__c == data[1][i].Id && data[1][i].Email != null){
      return data[1][i].Email;
    }
  }
  for (var i=0; i<data[2].length; i++){
    if(donationObject.AccountId == data[2][i].Id && data[2][i].Organization_Email__c != null){
      return data[2][i].Organization_Email__c;
    }
  }
  return "no email found";
}
function findAddress(donationObject){
  if(donationObject.npe01__Is_Opp_From_Individual__c === "true"){
    for(var i=0; i<data[1].length; i++){
      if(donationObject.Primary_Contact__c == data[1][i].Id  && data[1][i].MailingAddress != null){
        return data[1][i].MailingAddress;
      }
    }
    for(var i=0; i<data[3].length; i++){
      if(donationObject.householdId == data[3][i].Id  && data[3][i].npo02__Formula_MailingAddress__c != null){
        return data[3][i].npo02__Formula_MailingAddress__c;
      }
    }
  }
  else{
    for(var i=0; i<data[2].length; i++){
      if(donationObject.AccountId == data[2][i].Id && data[2][i].BillingAddress != null){
        return data[2][i].BillingAddress
      }
    }
  }
  return "no address found";
}
function findFormalGreeting(donationObject){
  if(donationObject.npe01__Is_Opp_From_Individual__c === "true"){
    for(var i=0; i<data[3].length; i++){
      if(donationObject.householdId == data[3][i].Id && data[3][i].npo02__Formal_Greeting__c != null){
        return data[3][i].npo02__Formal_Greeting__c;
      }
    }
    for(var i=0; i<data[1].length; i++){
      if(donationObject.Primary_Contact__c == data[1][i].Id && data[1][i].name != null && data[1][i].Saluation != null){
        return data[1][i].Saluation + data[1][i].Name;
      }
      else if(donationObject.Primary_Contact__c == data[1][i].Id && data[1][i].name != null){
        return data[1][i].Name;
      }
    }
  }
  else{
    for(var i=0; i<data[1].length; i++){
      if(donationObject.Primary_Contact__c == data[1][i].Id && data[1][i].Name != null && data[1][i].Saluation != null){
        return data[1][i].Saluation + data[1][i].Name;
      }
      else if(donationObject.Primary_Contact__c == data[1][i].Id && data[1][i].Name != null){
        return data[1][i].Name;
      }
    }
    for(var i=0; i<data[2].length; i++){
      if(donationObject.AccountId == data[2][i].Id && data[2][i].Name != null && data[2][i].Formal_Salutation__c !=null){
        return data[2][i].Formal_Salutation__c + data[2][i].Name;
      }
      else if(donationObject.AccountId == data[2][i].Id && data[2][i].Name != null){
        return data[2][i].Name;
      }
    }
  }
  return "no Formal Greeting found";
}
function findInformalGreeting(donationObject){
  if(donationObject.npe01__Is_Opp_From_Individual__c === "true"){
    for(var i=0; i<data[3].length; i++){
      if(donationObject.householdId == data[3][i].Id && data[3][i].npo02__Informal_Greeting__c != null){
        return data[3][i].npo02__Informal_Greeting__c;
      }
    }
    for(var i=0; i<data[2].length; i++){
      if(donationObject.AccountId == data[2][i].Id && data[2][i].Informal_Greeting__c != null){
        return data[2][i].Informal_Greeting__c;
      }
    }
    for(var i=0; i<data[1].length; i++){
      if(donationObject.Primary_Contact__c == data[1][i].Id && data[1][1].Greeting__c != null){
        return data[2][i].Greeting__c;
      }
    }
  }
  else{
    for(var i=0; i<data[2].length; i++){
      if(donationObject.AccountId == data[2][i].Id && data[2][i].Informal_Greeting__c != null){
        return data[2][i].Informal_Greeting__c;
      }
    }
    for(var i=0; i<data[1].length; i++){
      if(donationObject.Primary_Contact__c == data[1][i].Id && data[1][i].Greeting__c != null){
        return data[1][i].Greeting__c;
      }
    }
  }
  return "no informal Greeting found";
}
function findName(donorObject){
  if(donorObject.npe01__Is_Opp_From_Individual__c === 'true'){
    for(var i = 0; i < data[3].length; i++){
      if(donorObject.householdId == data[3][i].Id){
        return data[3][i].Name;
      }
    }
    for(var j = 0; j < data[1].length; j++){
      if(donorObject.Primary_Contact__c == data[1][j].Id){
        return data[1][j].Name;
      }
    }
  }
  else{
    for(var j = 0; j < data[1].length; j++){
      if(donorObject.Primary_Contact__c == data[1][j].Id){
        return data[1][j].Name;
      }
    }
    for(var k = 0; k < data[2].length; k++){
      if(donorObject.AccountId == data[2][k].Id){
        return data[2][k].Name;
      }
    }
  }
  return 'No Name Found';
}

function findPhone(donorObject){
  if(donorObject.npe01__Is_Opp_From_Individual__c === 'true'){
    for(var i = 0; i < data[3].length; i++){
      if(donorObject.householdId == data[3][i].Id){
        if(data[3][i].npo02__HouseholdPhone__c !== null){
          return data[3][i].npo02__HouseholdPhone__c;
        }
        else{
          break;
        }
      }
    }
    for(var j = 0; j < data[1].length; j++){
      if(donorObject.Primary_Contact__c == data[1][j].Id){
        if(data[1][j].Phone !== null){
          return data[1][j].Phone;
        }
        else{
          break
        }
      }
    }
  }
  else {
    for(var k = 0; k < data[2].length; k++){
      if(donorObject.AccountId == data[2][k].Id){
        if(data[2][k].Phone !== null){
          return data[2][k].Phone;
        }
        else{
          break;
        }
      }
    }
    for(var l = 0; l < data[1].length; l++){
      if(donorObject.Primary_Contact__c == data[1][l].Id){
        if(data[1][l].Phone !== null){
          return data[1][l].Phone;
        }
        else{
        return 'No phone number found';
        }
      }
    }

  }
      return 'No phone number found';
}

function findDonationHistory(donorObject){
  for(var i=0; i < data[2].length; i++){
    var donationHistory = {};
    if(donorObject.AccountId == data[2][i].Id && data[2][i].BillingAddress != null){
      donationHistory.lifeTimeAmount = data[2][i].npe01__LifetimeDonationHistory_Amount__c;
      donationHistory.lifeTimeNumber = data[2][i].npe01__LifetimeDonationHistory_Number__c;
      return donationHistory;
    }
  }
  return 'No donation history found';
}
function findFirstName(donationObject){
  for(var i=0; i<data[1].length; i++){
    if(donationObject.Primary_Contact__c == data[1][i].Id){
      var names = data[1][i].Name.split(' ');
      return names[0];
    }
  }
}
function findLastName(donationObject){
  for(var i=0; i<data[1].length; i++){
    if(donationObject.Primary_Contact__c == data[1][i].Id){
      var names = data[1][i].Name.split(' ');
      return names[1];
    }
  }
}
sortedObject.sorted = sorted;
// preconvertDates();
// convertDates();


  return {
    preconvertDates: preconvertDates,
    convertDates: convertDates,
    sortedObject: sortedObject,
    // getDonors: getDonors,
    getData: getData,
    donorObject: donorObject
  };
}]);
