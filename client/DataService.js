angular.module('App').factory('DataService', ['$http', function($http){

  var data=[];
  var sorted=[];

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
  }
  function handleFailure(res){
    console.log('fail', res);
  }

function convertDates(){
    for (var i = 0; i < donorObject.donors.length; i++){
      donorObject.donors[i].convertedDate = new Date(donorObject.donors[i].donationDate);
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
  console.log(sorted);
}
function findNextKeys(){
  console.log(sorted);
  for(var i=0; i<sorted.length; i++){
    // sorted[i].email=findEmail(sorted[i]);
    // sorted[i].address=findAddress();
    // sorted[i].formalGreeting=findFormalGreeting();
    // sorted[i].informalGreeting=findInformalGreeting();
    //
    // sorted[i].name=findName();

  }
}

convertDates();


  return {
    // getDonors: getDonors,
    getData: getData,
    donorObject: donorObject
  };
}]);
