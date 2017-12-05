'use strict';

/**
 * @ngdoc function
 * @name gosteiclubApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gosteiclubApp
 */
angular.module('gosteiclubApp')
  .controller('CorredorCtrl', function ($scope, $window, Malling, $http, $modal, $rootScope,
      $translate, $location, Menu, $compile, $sce, Survey, WsUriBuilder, WsClient, 
      User, Utils, Product, SessionLanding, Sponsoring) {

      $rootScope.menuItems = [];

        $scope.showModal = function(){
            $modal.open({
                  templateUrl: 'productTestSocialShare.html',
                  controller: 'ModalShareController', 
                  size: 'lg',
                  backdrop: 'static'
             })
            .result.then(
                function () {}, 
                function () {}
            );
        };


        $scope.showRanking = function(){
            $modal.open({
                  templateUrl: 'ranking.html',
                  controller: 'RankingController', 
                  size: 'lg',
                  backdrop: 'static'
             })
            .result.then(
                function () {}, 
                function () {}
            );
        };


     /*if(!Utils.isLogged(User.data)){
      if(User.isUserFromLandingPage($location)){

        User.resource.get({email:$location.search().email}, function(data){

          User.setData(data);
          User.setLogged(true);
          $scope.user = User.getData();

        }, function(){
          $location.path('/main');
        });

      }else{
        if($location.path() !== '/'){
          $location.path('/main');
          return null;
        }
      }

    }else{
      $rootScope.firstName = Utils.getFirstName(User.getData().name);
    }*/

    $rootScope.showFooter = false;
    $rootScope.isStepButtonDisabled = true;
    $scope.disableAnswerButton = false;
    $scope.user = User.getData();
    $rootScope.originTrafficSource = SessionLanding.getOriginTraficSource($location);


    /**
     * -------------------------------------------------------------------------------------
     */

    $scope.showButtomOpportunity = false;

    $scope.deliveryWS = {
      survey: [],
      questionHall: {},
      balcony: {}
    };

    $scope.offers = {
      questionHall: []
    };


});
