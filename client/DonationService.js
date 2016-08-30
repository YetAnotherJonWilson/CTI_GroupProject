angular.module('App').factory('DonationService', ['$http', '$location', function($http, $location){
  var vm = this;

  var donorObject = {};
  var overview = [];

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
      console.log('success getting donor stuff from db and sf', response);
      donorObject = response.data;
      // console.log('object', object);
      sortDonorObject(donorObject);
      console.log('overview sorted', overview);
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

  function sortDonorObject(donors){
    for(var i = 0; i < donors.length; i++){
      overview.push(donors[i]);
      overview[i].Email = overviewEmail(overview[i], donors[i]);
      overview[i].personName = overviewName(overview[i], donors[i]);
      overview[i].AverageAmount = overviewAverageAmount(overview[i], donors[i]);
      overview[i].TotalAmount = overviewTotalAmount(overview[i], donors[i]);
      overview[i].TotalNumber = overviewTotalNumber(overview[i], donors[i]);
    }
    return overview;
  }

  function overviewEmail(overview, donor){
    if(donor.npe01__Is_Opp_From_Individual__c == 'true'){
      if(donor.Contact.npo02__Household__r.npo02__HouseholdEmail__c != null){
        return donor.Contact.npo02__Household__r.npo02__HouseholdEmail__c;
      }
      else if(donor.Contact.Email != null){
        return donor.Contact.Email;
      }
    }
    else{
      if(donor.Contact.Email != null){
        return donor.Contact.Email;
      }
      if(donors.Account.Organization_Email__c != null){
        return donor.Account.Organization_Email__c;
      }
    }
    return 'No Email Found';
  }

  function overviewName(overview, donor){
    if(donor.npe01__Is_Opp_From_Individual__c == 'true'){
      if(donor.Contact.npo02__Household__r.Name != null){
        return donor.Contact.npo02__Household__r.Name;
      }
      else if(donor.Contact.Name != null){
        return donor.Contact.Name;
      }
    }
    else{
      if(donor.npe01__Is_Opp_From_Individual__c != 'true' || donor.Account.Name != null || donor.Contact.Name != null){
        return donor.Contact.Name + ' - ' + donor.Account.Name;
      }
      else if(donor.Contact.Name != null){
        return donor.Contact.Name;
      }
      else if(donor.Account.Name != null){
        return donor.Account.Name;
      }
    }
    return 'No Name Found';
  }

  function overviewAverageAmount(overview, donor){
    if(donor.npe01__Is_Opp_From_Individual__c == 'true'){
      if(donor.Contact.npo02__AverageAmount__c != null){
        return donor.Contact.npo02__AverageAmount__c;
      }
    }
    else{
      if(donor.Account.npo02__AverageAmount__c != null){
        return donor.Account.npo02__AverageAmount__c;
      }
      else if(donor.Contact.npo02__AverageAmount__c != null){
        return donor.Contact.npo02__AverageAmount__c;
      }
    }
    return 'No Average Found';
  }

  function overviewTotalAmount(overview, donor){
    if(donor.Account.npe01__LifetimeDonationHistory_Amount__c != null){
      return donor.Account.npe01__LifetimeDonationHistory_Amount__c;
    }
    return 'No Lifetime Total Amount Found';
  }

  function overviewTotalNumber(overview, donor){
    if(donor.Account.npe01__LifetimeDonationHistory_Number__c != null){
      return donor.Account.npe01__LifetimeDonationHistory_Number__c;
    }
    return 'No Lifetime Total Number Found';
  }

  return {
    getDonorDbStuff: getDonorDbStuff,
    getDonorsSentEmailData: getDonorsSentEmailData,
    saveToDb: saveToDb
    // getBleh: getBleh
  }
}]);
