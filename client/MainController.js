angular.module('App').controller('MainController', ['$http', '$location', 'DonationService' , function($http, $location, DonationService){

    var vm = this;

    vm.message = "CTI Thank You Email System";



    vm.sendMail = function(){
      EmailService.sendMail();
    }

    vm.overiew = function(){
      // $http.get('/salesforce/overview').then(function(response){
      //   console.log('did you work');
      // }, function(response){
      //   console.log('err', response);
      // });
      DonationService.getDonorDbStuff().then(function(response){
        console.log('did you work?');
      }, function(response){
        console.log('worked???');
      });

    }

    vm.saveTest = function(){
      var sendData = {};
      sendData.opportunityId = '006d000000r6ehSAAQ';
      sendData.contactId = '003d0000037X61sAAC';
      sendData.accountId = '001d0000025MImRAAW';
      sendData.closeDate = '2016-08-22';
      sendData.sentDate = '';
      sendData.householdId ='a00d000000mOdn5AAC';
      sendData.paragraph1 = 'paragraph 1 bleh bleh belh';
      sendData.paragraph2 = 'paragraph 2 test';
      sendData.paragraph3 = 'paragraph 3 words';
      sendData.paragraph4 = 'paragraph 4 more words';
      sendData.paragraph5 = 'paragraph 5, doubt it';
      sendData.quote = 'some witty quote';
      sendData.picture1 = '/path/to/pic1';
      sendData.picture2 = '/path/to/pic2';
      sendData.picture3 = '/path/to/pic3';
      sendData.picture4 = '/path/to/pic4';
      sendData.letterhead = '/path/to/letterhead';
      sendData.signature = '/path/to/signature';
      console.log('test button');
      // $http.post('/donor/createData', sendData).then(function(response){
      //   console.log('test success', response);
      // }, function(response){
      //   console.log('test fail', response);
      // });
      DonationService.saveToDb(sendData).then(function(response){
        console.log('test save success', response);
      }, function(err){
        console.log('test save fail', err);
      });
    }

}]);
