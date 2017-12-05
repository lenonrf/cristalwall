'use strict';


angular.module('gosteiclubApp')
  .controller('ReceitasCtrl', function ($scope, $modal, $rootScope,
      $translate, $location, Menu, $http, 
      User, Utils, Product, SessionLanding, Receita) {

         $scope.receitas = [];


        $http.get('/api/receita').then(function(response){
          
          $scope.receitas =  response.data;

          angular.forEach($scope.receitas, function(item) {
            item.nameUrl = item.name.replace(/\s/g, '-');
          });



        });

        Product.resource.query(function(data){
          $scope.products = data;
        }, function(err){ });

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
    $scope.user = User.getData();

   
    

});
