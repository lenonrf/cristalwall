'use strict';

/**
 * @ngdoc function
 * @name gosteiclubApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gosteiclubApp
 */
angular.module('gosteiclubApp')
  .controller('MeusDadosCtrl', function ($scope, $window, Malling, $http, $modal, $rootScope,
      $translate, $location, Menu, $compile, $sce, Survey, WsUriBuilder, WsClient, 
      User, Utils, Product, SessionLanding, Sponsoring) {

      $rootScope.menuItems = [
       { link: '/balcao', name: 'Home'},
          { link: '/oportunidades', name: 'Oportunidades'},
          { link: '/amostrasgratis', name: 'Amostras Grátis'},
          //{ link: '/cupons', name: 'Cupons'},
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
    $rootScope.isStepButtonDisabled = true;
    $scope.disableAnswerButton = false;
    $scope.isValidationError = false;

    $scope.user = User.getData();



    $scope.save = function () {

      if (!validateFields()) {
        return false;
      }

      $location.path('/balcao');

      User.resourceEmail.put({'email'  : User.data.email}, $scope.user, 
        function onSuccess(data) {
          
          User.setData(data);
          Malling.updateContact(data);
          
        
        }, 
        function onError(data) {
          console.log('error', data);
          $scope.isValidationError = true;
          $scope.validationMessage = 'Ocorreu um erro no envio dos dados.';
        });

    };

    

    


    /**
     * -------------------------------------------------------------------
     * Validators
     */

    function validateFields() {

      $scope.isValidationError = false;

      $scope.bgCellphoneColor = '#FFFFFF';
      $scope.bgNumberColor = '#FFFFFF';
      $scope.bgBirthColor = '#FFFFFF';
      $scope.bgZipcodeColor = '#FFFFFF';


      if (Utils.isEmpty($scope.user.address.zipcode)) {

        setMessageOnField('zipcode', $translate.instant('VALIDATION.ZIPCODE_FAILED'));
        return false;

      }

      if (Utils.isEmpty($scope.user.address.street)) {

        setMessageOnField('address', $translate.instant('VALIDATION.STREET_FAILED'));
        return false;
      }

      if (Utils.isEmpty($scope.user.address.neighborhood)) {

            setMessageOnField('neighborhood', $translate.instant('VALIDATION.NEIBOR_FAILED'));
            return false;
       }

      if (Utils.isEmpty($scope.user.address.city)) {

        setMessageOnField('city', $translate.instant('VALIDATION.CITY_FAILED'));
        return false;
      }


      if (Utils.isEmpty($scope.user.address.state)) {

            setMessageOnField('state', $translate.instant('VALIDATION.STATE_FAILED'));
            return false;
          }



      if (Utils.isEmpty($scope.user.address.number)) {

        setMessageOnField('number', $translate.instant('VALIDATION.NUMBER_FAILED'));
        return false;
      }

      return true;

    }

    function setMessageOnField(field, message) {

      setFieldWarning(field);
      $scope.isValidationError = true;
      $scope.validationMessage = message;
    }



    function setFieldWarning(field) {

      var warningColor = '#FFFACD';
      var msgErrorColor = '#CD0000';

      switch (field) {

        case 'cellphone':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgCellphoneColor = warningColor;
          angular.element('#cellphone').focus();
          break;


        case 'number':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgNumberColor = warningColor;
          angular.element('#number').focus();
          break;

        case 'birthDate':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgBirthColor = warningColor;
          angular.element('#bithDate').focus();
          break;

        case 'zipcode':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgZipcodeColor = warningColor;
          angular.element('#zipcode').focus();
          break;

        case 'city':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgCityColor = warningColor;
          angular.element('#city').focus();
          break;

        case 'neighborhood':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgNeighborhoodColor = warningColor;
          angular.element('#neighborhood').focus();
          break;

        case 'state':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgStateColor = warningColor;
          angular.element('#state').focus();
          break;

        case 'address':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgAddressColor = warningColor;
          angular.element('#address').focus();
          break;

      }
    }

  });
