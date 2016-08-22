angular.module('App').factory('DataService', ['$http', function($http, DataService){

  function getDonors(){

  }

  function getContactInfo(){

  }



  var donorObject = {
    donors: [
      {
        firstName: 'Michael',
        LastName: 'Jordan',
        email: 'hisairness@gmail.com',
        donationAmount: 50000,
        donationDate: '5/20/2014',
        street: 'Dunk St.',
        city: 'Chicago',
        state: 'IL',
        zip: '55612'
      },
      {
        firstName: 'Michael',
        LastName: 'Phelps',
        email: 'phelpswim@gmail.com',
        donationAmount: 40000,
        donationDate: '6/05/2016',
        street: 'Swim St.',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90212'
      },
      {
        firstName: 'Steve',
        LastName: 'Jobs',
        email: 'applefan@apple.com',
        donationAmount: 100000,,
        donationDate: '12/25/2012',
        street: 'Apple Ave.',
        city: 'Silicon Valley',
        state: 'CA',
        zip: '90543'
      },
      {
        firstName: 'John',
        LastName: 'Wayne',
        email: 'olejonny@gmail.com',
        donationAmount: 19,
        donationDate: '1/30/1981',
        street: 'Old West St.',
        city: 'Old West Town',
        state: 'MT',
        zip: '65652'
      },
    ]
  }



  return {
    getDonors: getDonors,
    getContactInfo: getContactInfo
  };
}]);
