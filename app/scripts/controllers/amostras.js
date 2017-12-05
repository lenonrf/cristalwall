'use strict';

/**
 * @ngdoc function
 * @name gosteiclubApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gosteiclubApp
 */
angular.module('gosteiclubApp')
  .controller('AmostrasCtrl', function ($scope, $modal, $rootScope,
      $translate, $location, Menu, 
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
    $rootScope.isStepButtonDisabled = false;
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





    /**
     * -------------------------------------------------------------------
     * Produtos
     */

    $scope.saveProduct = function (product, isExternalLink) {


      $rootScope.isStepButtonDisabled = false;

      if(isExternalLink){

        if(product.externalLink.indexOf('http') === -1){
          product.externalLink = 'http://'+product.externalLink;
        }

        $window.open(product.externalLink, '_blank');

      }


      if( (product.marked === false) || (Utils.isEmpty(product.marked))){

        product.marked = true;
        $scope.user.products = [product];
        $location.path('/balcao');

      }else{

        product.marked = false;
        $scope.user.products.splice($scope.user.products.indexOf(product), 1);

      }


      User.resourceEmail.put({'email'  : $scope.user.email}, $scope.user, 
        function onSuccess(data) {}, 
        function onError(data) {
          console.log('Error User.resourceEmail.put', data);
        });

    };





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


    

    });
