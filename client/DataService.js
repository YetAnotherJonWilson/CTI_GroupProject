angular.module('App').factory('DataService', ['$http', function($http, DataService){
  var vm = this;



  var donorObject = {
    donors:[{
      firstname: 'Jimmy',
      lastname: 'Jam',
      email: 'jimmyj@gmail.com',
      donationAmount: 5000,
      donationDate: '8/6/2017'
      street: 'Detroit Ave'
      city: 'Detroit'
      state: 'Michigan'
      zip: '87657'
    },{
      firstname: 'Michael',
      lastname: 'Jackson',
      email: 'immichael@hotmail.com',
      donationAmount: 60000,
      donationDate: '5/23/2017',
      street: 'Neverland Way',
      city: 'Los Angeles',
      state: 'California',
      zip: 90280
    },{
      firstname: 'Phil',
      lastname: 'Mickelson',
      email: 'lefty@yahoo.com',
      donationAmount: 9000,
      donationDate: '7/6/2017',
      street: 'Orlando Way',
      city: 'Orlando',
      state: 'Florida',
      zip: 34089,
    }]
  }



  function getDonors(){

  }

  function getContactInfo(){

  }

  return {
    getDonors: getDonors,
    getContactInfo: getContactInfo
  };
}]);
