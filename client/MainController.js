angular.module('App').controller('MainController', ['$http', '$location', 'DataService' , function($http, $location, DataService){

    var vm = this;

    vm.message = "CTI Thank You Email System";



    vm.sendMail = function(){
      EmailService.sendMail();
    }

    vm.saveTest = function(){
      var sendData = {};
      sendData.opportunityId = '';
      sendData.contactId = '';
      sendData.accountId = '';
      sendData.closeDate = '';
      sendData.sentDate = '';
      sendData.householdId ='';
      sendData.paragraph1 = '';
      sendData.paragraph2 = '';
      sendData.paragraph3 = '';
      sendData.paragraph4 = '';
      sendData.paragraph5 = '';
      sendData.quote = '';
      sendData.picture1 = '';
      sendData.picture2 = '';
      sendData.picture3 = '';
      sendData.picture4 = '';
      sendData.letterhead = '';
      sendData.signature = '';
      console.log('test button');
      $http.post('/donor/createData', sendData).then(function(response){
        console.log('test success', response);
      }, function(response){
        console.log('test fail', response);
      });
    }

}]);
