'use strict';


angular.module('gosteiclubApp')
  .controller('ObrigadoCtrl', function ($scope,$route, $location, $http, $rootScope, Menu) {

    Menu.setMenu('HomeCtrl');
    $rootScope.showFooter = false;
    $rootScope.isShowPushNotification = $route.current.$$route.isShowPushNotification;;

    $scope.isConectai = false;

    console.log('obrigado isShowPushNotification', $rootScope.isShowPushNotification);


    $scope.isPixel = function(){

      if($location.search().pixel){
        if ($location.search().pixel.toLowerCase() === 'true'){
          return true;
        }

      }

      return false;
    };


    $scope.isConectaiClient = function(){

      if ($location.search().utm_source){
        if ($location.search().utm_source.toLowerCase() === 'conectai') {
          $scope.isConectai = true;
          return true;
        }
      }

      return false;
    };


    $scope.executeAPI = function(){

      var url = '/api/conectai?';

      if ($location.search().offer_id) {

        url += 'offer_id=' + $location.search().offer_id

        if ($location.search().p) {
          url += '&p=' + $location.search().p;
        }

        if ($location.search().r) {
          url += '&r=' + $location.search().r;
        }

        if ($location.search().user_id) {
          url += '&user_id=' + $location.search().user_id;
        }

        console.log('url', url);

        $http.post(url).success(function (dataResult) {
          console.log('SUCCESS', dataResult);
        }).error(function () {
          console.log('ERROR');
        });

      }

    };





    if($location.search().utm_source){


      if($scope.isPixel()){

        $scope.isPixel = true;

      }else{

        if($scope.isConectaiClient()){
          $scope.executeAPI();
        }
      }








    }

  });
