angular.module('App').factory('DonationService', ['$http', '$location', function($http, $location, DonationService){
  var vm = this;




  function getDonorDbStuff(){
    return $http.get('/donor/sentDonors').then(function(response){
      console.log('donors', response.data);
      // console.log('maybe?');
      var tempDonors = {};
      tempDonors.donors = response.data;
      getDonorsSentEmailData(tempDonors);
    }, function(err){
      console.log('err', err);
      response.sendStatus(500);
    });
  }

  function getDonorsSentEmailData(donors){
    // console.log('probably not', donors);
    return $http.post('/salesforce/overview', donors).then(function(response){
      console.log('success getting donor stuff from db', response);
      $location.path('/overview');
    }, function(err){
      console.log('faiiiiiiiiiiiiilure', err);
      response.sendStatus(500);
    });
  }

  // function getBleh(){
  //   return $http.get('/salesforce/overview').then(function(response){
  //     console.log('success getting stuff form sf', response.data);
  //     // $location.path('/overview');
  //   }, function(err){
  //     console.log('major let down', err);
  //     response.sendStatus(500);
  //   });
  // };

  function saveToDb(sendData){
    return $http.post('/donor/createData', sendData).then(function(response){
      console.log('save to db success', response);
      response.sendStatus(200);
    }, function(err){
      console.log('fail saving to db', err);
      response.sendStatus(500)
    });
  };

  return {
    getDonorDbStuff: getDonorDbStuff,
    getDonorsSentEmailData: getDonorsSentEmailData,
    saveToDb: saveToDb
    // getBleh: getBleh
  }
}]);
