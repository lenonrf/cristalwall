'use strict';


angular.module('gosteiclubApp')

  .controller("ModalShareController", function ($scope, User, $location, $rootScope, $modalInstance) {

    
    $scope.user = User.getData();

    console.log('$scope.user', $scope.user)

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.shareFacebook = function(){
      FB.ui({
        method: 'share',
        href: 'http://v2.gostei.club?userShared='+$scope.user._id
      }, function(response){

        if(response){
          $scope.cancel();
          User.setPoints(100);
        }

      });

    }

    $scope.shareTwitter = function(){
      //User.setPoints(100);
      window.open('http://twitter.com/share?text=Faça%20parte%20do%20nosso%20clube%20de%20oportunidades,%20receba%20produtos%20em%20casa%20sem%20pagar%20nada%20e%20nos%20conte%20o%20que%20achou!&url=http://v2.gostei.club?userShared='+$scope.user._id);
    }


  })




    .controller("RankingController", function ($scope, User, $modalInstance, $http) {

      $scope.user = User.getData();

      $http.get('/api/users/ranking').then(function(response){
        $scope.ranking = response.data;
        console.log('$scope.ranking', $scope.ranking);
      });

      

      $scope.ok = function () {
        $modalInstance.close();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };


    })






  .controller('BalcaoCtrl', function ($scope, $rootScope, $window, $modal,
    $http,$translate, $location, Menu, User, Utils, Product, SessionLanding) {


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



      
    $rootScope.originTrafficSource = SessionLanding.getOriginTraficSource($location);
    $rootScope.isShowPushNotification = false;

    //Menu.setMenu('HomeCtrl');
    $rootScope.showFooter = false;

    if(!Utils.isLogged(User.data)){
      $location.path('/main');
    }

    $scope.user = User.getData();
    $scope.campaign = User.getCampaing($location, $rootScope.deviceAccess, $rootScope.sessionLanding);

    getProducts();
    getOportunityList();

    $scope.escolhido = $translate.instant('HALL.FREESAMPLE_05');
    $scope.euquero =  $translate.instant('HALL.FREESAMPLE_06');


    /**
     * Salva a opcao de produto escolhido pelo usuario
     * @param product
     */
    $scope.saveProduct = function (product) {


      if( (product.marked === false) || (Utils.isEmpty(product.marked))){

        product.marked = true;
        $scope.user.products.push(product);

      }else{

        product.marked = false;
        $scope.user.products.splice($scope.user.products.indexOf(product), 1);

      }
    };



    /**
     * Retorna os produtos cadastrados
     * @returns {*|{method, isArray}}
     */
    function getProducts() {

      Product.resource.query(function(data){

        $scope.products = data;
        var userProducts = User.getData().products;

        for(var p_index=0; p_index<data.length; p_index++){

          data[p_index].marked = false;

          for(var u_index=0; u_index<userProducts.length; u_index++){

            if(userProducts[u_index]._id === data[p_index]._id){
              data[p_index].marked = true;
            }
          }
        }

      }, function(err){

      });
    }



    /**
     * Rertona uma lista de oportunidades cadastradas
     * @returns {*[]}
     */
    function getOportunityList() {

      if(!$rootScope.sessionLanding){
        return null;
      }

      $http.get('/api/oportunities/user/'+$scope.user._id
      +'?sessionlanding='+$rootScope.sessionLanding._id
      +'&deviceAccess='+$rootScope.deviceAccess).then(function(data){

          $scope.data = data;
          $scope.oportunities = [];

          for(var i=0; i<$scope.data.length; i++){
            if($scope.data[i].status === true){
              $scope.oportunities.push($scope.data[i]);
            }
          }


        });
    }




    $scope.defineDeliveryStrategy = function (offer) {       

      $http.post('/api/yhall/offer/'+offer._id+'/stats/clicks?type=acceptance');
      User.setPoints(15);

      var urlProtocolPrefix = '';
      var queryParamPrefix = '&';

      if(offer.delivery.targetBlankUrl.indexOf('http') === -1){
        urlProtocolPrefix = 'http://';
      }


      if(offer.delivery.targetBlankUrl.indexOf('?') === -1){
        queryParamPrefix = '?';
      }


      $window.open(urlProtocolPrefix
            +offer.delivery.targetBlankUrl
            +queryParamPrefix
            +'aff_sub=balcao'
            +'&aff_sub5='+SessionLanding.getOriginTraficSource($location)
            +'&aff_sub4='+SessionLanding.getOriginMedium($location));
    };

  });
