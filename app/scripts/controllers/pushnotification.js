'use strict';


angular.module('gosteiclubApp')
  .controller('PushNotificationCtrl', function ($scope, $location, Utils, Canal, Product, $http, SessionLanding, User, $rootScope, Menu) {

    $rootScope.showFooter = false;
    Menu.setMenu('PerguntasCtrl');

    $rootScope.isShowPushNotification = true;

    $rootScope.sessionLanding = {};
    $scope.user = {};

    $rootScope.deviceAccess = Utils.getDevice();

    var sessionCode = 'amostras';
    if(sessionCode != null){
      $http.get('/api/sessionlanding?code='+sessionCode).success(function(data){

        console.log('data', data);

        $rootScope.sessionLanding = data[0];
        $rootScope.sessionLandingData = SessionLanding.getDataFromLanding($rootScope, sessionCode);

      }).error(function(){});
    }


    Canal.resource.query({code: Canal.getCanalCode($location) }, function(data){
      $scope.user.canal =  data[0]._id;
    });


    Product.resource.query(function(data){
      $scope.products = data;
    }, function(err){ });



    User.resourceEmail.get({email:$location.search().email}, function(data){

          User.setData(data);
          User.setLogged(true);
          $scope.user = User.getData();

        }, function(){
          $location.path('/main');
        });





    $scope.enter = function(){
      $location.path('/perguntas');
    }


  });
