'use strict';


angular.module('gosteiclubApp')
  .controller("ShowCupomController", function ($scope, User, $modalInstance, $http, cupomItem) {

      $scope.user = User.getData();
      $scope.cupomItem = cupomItem;

      $scope.ok = function () {
        $modalInstance.close();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };


})


  .controller('CuponsCtrl', function ($scope, $modal, $rootScope,
      $translate, $location, Menu, $http, 
      User, Utils, Product, SessionLanding, Sponsoring) {

      	$rootScope.menuItems = [
          { link: '/balcao', name: 'Home'},
          { link: '/oportunidades', name: 'Oportunidades'},
          { link: '/amostrasgratis', name: 'Amostras Grátis'},
          { link: '/cupons', name: 'Cupons'},
          { link: '/receitas', name: 'Receitas'},
          { link: '/trabalheemcasa', name: 'Trabalhe em Casa'},
          { link: '/meusdados', name: 'Meus Dados'}
        ];

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


        $scope.showCupom= function(cupomItem){
            $modal.open({
                  templateUrl: 'showCupom.html',
                  controller: 'ShowCupomController', 
                  size: 'lg',
                  backdrop: 'static',
                  resolve: {
                    cupomItem: function () {
                      return cupomItem;
                    }
                 }  
             })
            .result.then(
                function () {}, 
                function () {}
            );
        };




     if(!Utils.isLogged(User.data)){
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
    }


    $rootScope.showFooter = false;
    $rootScope.isStepButtonDisabled = true;
    $scope.disableAnswerButton = false;
    $scope.isValidationError = false;

    $scope.user = User.getData();

    $scope.user.coregs = [];
    //$rootScope.steps = ['complete', 'active', 'disabled', 'disabled'];
    $rootScope.steps = ['complete', 'active', 'disabled'];


    $scope.escolhido = $translate.instant('HALL.FREESAMPLE_05');
    $scope.euquero =  $translate.instant('HALL.FREESAMPLE_06');



    $rootScope.originTrafficSource = SessionLanding.getOriginTraficSource($location);


    getProducts(User);





  
    function getProducts(user) {

      Product.resource.query(function(data){

        var userProducts = user.getData().products;

        for(var p_index=0; p_index<data.length; p_index++){

          data[p_index].marked = false;

          if(userProducts){

            for(var u_index=0; u_index<userProducts.length; u_index++){

              if(userProducts[u_index]._id === data[p_index]._id){
                data[p_index].marked = true;
              }
            }
          }


        }

        $scope.products = data;

      }, function(err){ });
    }



    $http.get('http://bws.buscape.com.br/service/coupons/lomadee/6b6e7253714c4c302b7a6b3d/BR/?format=json&results=30&sourceId=35637053&categoryIds=99011,99007,77,99003,99002,99004,99008,99006&page=1')
      .then(function(response){
        console.log("Cupons", response.data);
        $scope.cupons = response.data.coupon;
    });
    

});
