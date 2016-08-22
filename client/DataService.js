angular.module('App').factory('DataService', ['$http', function($http, DataService){

  function getDonors(){

  }

  function getContactInfo(){

  }



  var donorObject = {
    donors: [
      {
        firstName: 'Michael'
        LastName: 'Jordan'
        email: 'mjair@gmail.com'
        donationAmount: 50000
        donationDate: '5/20/2014'
        street: 'Dunk St.'
        city: 'Chicago'
        state: 'IL'
        zip: '55612'
      },
      {
        firstName: 'Michael'
        LastName: 'Phelps'
        email: 'mpswim@gmail.com'
        donationAmount: 40000
        donationDate: '6/05/2016'
        street: 'Swim St.'
        city: 'Los Angeles'
        state: 'CA'
        zip: '90212'
      },
      {
        firstName: 'Steve'
        LastName: 'Jobs'
        email: 'applefan@gmail.com'
        donationAmount: 100000
        donationDate: '12/25/2012'
        street: 'Apple Ave.'
        city: 'Silicon Valley'
        state: 'CA'
        zip: '90543'
      },
    ]
  }



  return {
    getDonors: getDonors,
    getContactInfo: getContactInfo
  };
}]);
