'use strict';


angular.module('gosteiclubApp')
  .controller('MainCtrl', function ($scope, $rootScope, $window, $location, $modal, SessionLanding, $route,
                                    deviceDetector, Canal, Allin, Menu, Utils, User, Login,
                                    $http, Product, $translate, TermsConditions, Malling, Partners) {



    $rootScope.isShowPushNotification = $route.current.$$route.isShowPushNotification;
    $rootScope.originTrafficSource = SessionLanding.getOriginTraficSource($location);

    $scope.isPartnersAllowed = true;
    $scope.partners = [];
    $scope.isAgreeWith = true;

    $rootScope.isShowFooter = true; 

    $rootScope.isMobile  = deviceDetector.isMobile();
    $rootScope.isDesktop = deviceDetector.isDesktop();
    $rootScope.isTablet = deviceDetector.isTablet();


    if(User.isUserFromEmail($location)){
      var user = {};
      user.email = $location.search().email;

      if(!validateLogin(user)) return false;

      User.resourceEmail.get({email:user.email}, function(data){

        User.setData(data);
        User.setLogged(true);
      
      }, onErrorLogin);
    }


    $rootScope.sessionLanding = {};
    $scope.user = {};
    $scope.user.terms = true;
    $scope.disableButton = false;
    $scope.showFormFields = true;
    $scope.showFormFields_STEP2 = false;
    $rootScope.showFooter = true;

    $rootScope.titleModal = 'Termos e Condições';
    $rootScope.textModal = TermsConditions.getTermsConditionsText();

    $rootScope.deviceAccess = Utils.getDevice();


    $scope.user.name   = (!Utils.isEmpty($location.search().name)) ? $location.search().name : '';
    $scope.user.gender = (!Utils.isEmpty($location.search().gender)) ? $location.search().gender : '';
    $scope.user.email  = (!Utils.isEmpty($location.search().email)) ? $location.search().email : '';


    $scope.login = function(user){
      $scope.executeLogin(user, 'home');
    };


    

    /**
      * f Call the API and Get all offers filtered by offer by and user segmentation
      */
    $scope.getOffersNextStep = function() {
        
        $http.get('/api/myhall?affcode=gc&user='+$scope.user.email+'&device='+$rootScope.deviceAccess)
          .then(function(response) {

            console.log('Corredor', response.data);
            
            $rootScope.survey = response.data.survey;
            $rootScope.dynamicSegmentation = response.data.dynamicSegmentation;
            $rootScope.questionHall = response.data.questionHall;
            $rootScope.balcony = response.data.balcony;

            if($rootScope.isFirstAccess){
              Sponsoring.send(response.data.sponsoring, $scope.user);
            }

            if(($rootScope.survey.length === 0) && 
                $rootScope.dynamicSegmentation.length === 0){
              $location.path('oportunidades');
            
            }else{
              $location.path('perguntas');
            }

        }, function (response) {});

    };





    $scope.executeLogin = function(user, page) {

      if(!validateLogin(user)) return false;

      User.resourceEmail.get({email:user.email}, function(data){

        User.setData(data);
        $scope.getOffersNextStep();

      }, onErrorLogin);

    };





    $scope.checkoutStepOne = function (user) {

      //$location.path('perguntas');
      //return null;
      
      if (!validateFieldsStepOne(user)) return false;

      user.languageOrigin = 'pt-BR';
      user.trafficOrigin = SessionLanding.getOriginTraficSource($location);
      
      User.resourceEmail.get({email:user.email}, function(data){
        User.setData(data);
        $scope.getOffersNextStep();

      }, function(){

        User.resource.save(user, function(data){

          // SHOW STEP 2
          $scope.showFormFields = false;
          $scope.showFormFields_STEP2 = true;
          $scope.bgMsgColor = '#3498db';
          $('#messageStatus').html('Complete seus dados');

        });
      });
    };




    $scope.checkoutStepTwo = function (user) {

      if (!validateFieldsStepTwo(user)) return false;

      var languageOrigin = SessionLanding.getLanguageOrigin();
      $scope.disableButton = true;

      user.birthDate = Utils.getBirthDate(user.birthDate);
      user.birthDate = user.birthDate.toISOString();

      console.log("user", user);

      User.resourceEmail.put({'email'  : user.email}, user, onSuccess, onErrorCheckout);

    };


    function onSuccess(data, status) {

      var user = data;

      User.setData(user);
      $scope.getOffersNextStep();
    }


    function onErrorLogin(data) {

      console.log('ERROR - onErrorLogin', data);

      if (data.status === 404) {
        setMessageOnLogin($translate.instant('VALIDATION.EMAIL_NOT_FOUNT'));
      }

      if (data.status === 500) {
        setMessageOnLogin($translate.instant('VALIDATION.LOGIN_FAILED'));
      }
    }


    /**
     * Trata os erros do cadastro
     * @param data
     */
    function onErrorCheckout(data, status, transformResponse) {

      if (status === 400) {
        setMessageOnField('email', $translate.instant('VALIDATION.SIGNUP_FAILED'));
        $scope.disableButton = false;

      }

      if (status === 409) {
        executeLogin({email:data.email}, 'home');
      }
    }



    $scope.showLoginForm = function(){

      $('#loginForm').css('display', 'block');
      $('#formFields').css('display', 'none');

    };


    $scope.showCheckoutForm = function(){
      $('#loginForm').css('display', 'none');
      $('#formFields').css('display', 'block');
      $("#lname").focus();
    }





    /**
     *
     * -------------------------------------------------------------------------------------------------------
     * VALIDATORS
     */


    function validateFieldsStepOne(user) {



      var status = true;

      $scope.bgUserColor = '#FFFFFF';
      $scope.bgEmailColor = '#FFFFFF';
      $scope.bgGenderColor = '#FFFFFF';
      $scope.bgBirthColor = '#FFFFFF';

      if (!Utils.isEmpty(user)) {


        if (Utils.isEmpty(user.name)) {

          setMessageOnField('name', $translate.instant('VALIDATION.USER_FAILED'));
          return false;

        }else{

          user.name = user.name.trim();

          var isFullName = /^(([A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+[\-\']?)*([A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+)?\s)+([A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+[\-\']?)*([A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+)?$/.test(user.name);

          if(!isFullName){
            setMessageOnField('name', $translate.instant('VALIDATION.FULLNAME_FAILED'));
            return false;
          }
        }

        if (Utils.isEmpty(user.email)) {

          setMessageOnField('email', $translate.instant('VALIDATION.EMAIL_FAILED'));
          return false;
        }


          if (Utils.isEmpty(user.cellphone)) {

            setMessageOnField('cellphone', $translate.instant('VALIDATION.CELLPHONE_FAILED'));
            return false;

            /*var isValidNumber = /^9?[4-9|2]\d{3}[-\\.\s]?\d{4}$/;

            var celular = user.cellphone.substr(2);

            if(!isValidNumber.test(celular)){
              setMessageOnField('cellphone', $translate.instant('VALIDATION.CELLPHONE_FAILED'));
              return false;
            }*/

          }


        /*if (Utils.isEmpty(user.gender)) {

          setMessageOnField('gender', $translate.instant('VALIDATION.GENDER_FAILED'));
          return false;
        }*/



        /*if(!$scope.isAgreeWith){
          setMessageOnField('isAgreeWith', $translate.instant('VALIDATION.ISAGREEWITH'));
          return false;
        }*/


      } else {

        $scope.bgMsgColor = '#CD0000';
        $scope.bgGenderColor = '#FFFACD';
        $scope.bgEmailColor = '#FFFACD';
        $scope.bgUserColor = '#FFFACD';

        $('#lname').focus();
        $('#messageStatus').html($translate.instant('VALIDATION.FORM_FAILED'));

        status = false;
      }

      return status;
    }



    function validateFieldsStepTwo(user) {

      var status = true;

      $scope.bgCellphoneColor = '#FFFFFF';
      $scope.bgBirthColor = '#FFFFFF';
      $scope.bgZipCodeColor = '#FFFFFF';

      if (!Utils.isEmpty(user)) {

          /*if (Utils.isEmpty(user.ddd)) {
            setMessageOnField('ddd', $translate.instant('VALIDATION.DDD_FAILED'));
            return false;
          }*/


          if (Utils.isEmpty(user.birthDate)) {

            setMessageOnField('birthDate', $translate.instant('VALIDATION.FORM_FAILED'));
            $('#messageStatus2').html('Preencha a Data de Nascimento');
            return false;

          }else{

            var day   = user.birthDate.substr(0, 2);
            var month = user.birthDate.substr(2, 2);
            //var year  = user.birthDate.substr(4, 4);

            if(day>31){
              setMessageOnField('birthDate', $translate.instant('VALIDATION.BIRTH_DAY_FAILED'));
              $('#messageStatus2').html($translate.instant('VALIDATION.ZIPCODE_FAILED'));
              return false;
            }

            if(month>12){
              setMessageOnField('birthDate', $translate.instant('VALIDATION.BIRTH_MONTH_FAILED'));
              $('#messageStatus2').html($translate.instant('VALIDATION.ZIPCODE_FAILED'));
              return false;
            }

          }


          if (Utils.isEmpty(user.birthHour)) {

            setMessageOnField('birthHour', 'Preencha a Hora');
            $('#messageStatus2').html($translate.instant('Preencha a Hora'));
            return false;

          }

          if (Utils.isEmpty(user.cidade)) {

            setMessageOnField('birthHour', 'Preencha a Cidade');
            $('#messageStatus2').html($translate.instant('Preencha a Cidade'));
            return false;

          }



          /*if (!Utils.isEmpty(user.address)) {

            if (Utils.isEmpty(user.address.zipcode)) {

              setMessageOnField('zipcode', $translate.instant('VALIDATION.ZIPCODE_FAILED'));
              $('#messageStatus2').html($translate.instant('VALIDATION.ZIPCODE_FAILED'));
              return false;
            }

          }else{
            setMessageOnField('zipcode', $translate.instant('VALIDATION.ZIPCODE_FAILED'));
            $('#messageStatus2').html($translate.instant('VALIDATION.ZIPCODE_FAILED'));
            return false;
          }*/



      } else {

        $scope.bgMsgColor = '#CD0000';
        $scope.bgCellphoneColor = '#FFFACD';
        $scope.bgBirthColor = '#FFFACD';
        $scope.bgZipCodeColor = '#FFFACD';

        $('#lname').focus();
        $('#messageStatus').html($translate.instant('VALIDATION.FORM_FAILED'));

        status = false;
      }

      return status;
    }





    function setMessageOnField(field, message) {

      setFieldWarning(field);
      $('#messageStatus').html(message);
    }




    function setFieldWarning(field) {

      var warningColor = '#FFFACD';
      var msgErrorColor = '#CD0000';

      switch (field) {

        case 'name':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgUserColor = warningColor;
          $('#lname').focus();
          break;

        case 'email':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgEmailColor = warningColor;
          $('#email').focus();
          break;

        case 'gender':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgGenderColor = warningColor;
          $('#gender').focus();
          break;

        case 'birthDate':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgBirthColor = warningColor;
          $('#bithDate').focus();
          break;


        case 'ddd':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgCellphoneColor = warningColor;
          $('#ddd').focus();
          break;

        case 'cellphone':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgCellphoneColor = warningColor;
          //$('#cellphone').focus();
          break;

        case 'telephone':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgTelephoneColor = warningColor;
          angular.element('#telephone').focus();
          break;

        case 'zipcode':

          $scope.bgMsgColor = msgErrorColor;
          $scope.bgZipCodeColor = warningColor;
          $('#zipcode').focus();
          break;

        case 'emailAlreadyThere':

          $scope.bgMsgColor = '#749c0d';
          $scope.bgEmailAlreadyColor = '#3498db';
          $('#checkoutButton').html('Entrar');
          break;


        case 'isAgreeWith':

          $scope.bgMsgColor = msgErrorColor;
          $('#isAgreeWith').focus();
          break;
      }
    }


    function validateLogin(user){

      if (Utils.isEmpty(user.email)) {
        setMessageOnLogin('Preencha o email');
        return false;
      }

      return true;
    }


    function setMessageOnLogin(message) {

      $scope.bgMsgLoginColor = '#CD0000';
      $scope.bgEmailLoginColor = '#FFFACD';

      angular.element('#emailLogin').focus();
      angular.element('#messageStatusLogin').html(message);
    }
  });
