'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.User
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
 angular.module('gosteiclubApp')
 .factory('User', function ($resource, $http, Utils) {

     this.data = {};
     var self = this;

     this.resource = $resource('/api/users/:id');

     this.resourceCoreg = $resource('/api/users/:id/coreg');

     this.resourceEmail = $resource('/api/users/email/:email',

       { email: ' @email'}, {

         put: {
           method: 'PUT',
           interceptor: {
             response: function(response){
               //response.data.birthDate = getDateFormated(response.data.birthDate);
               return response.data;
             }
           }
         },

         get: {
           method: 'GET',
           interceptor: {
             response: function(response){
               //response.data.birthDate = getDateFormated(response.data.birthDate);
               return response.data;
             }
           }
         }
     });



    this.setPoints = function(points) {

      var user = this.getData();
      user.score += points;

      this.resourceEmail.put({'email'  : user.email}, user, function(data){
          this.setData(data);
        }, function(error){
          console.log('error', error);
        });  

    };





     function getDateFormated(dateResponse){

       var date = new Date(dateResponse);

       var day = ("0" + date.getDate()).slice(-2);
       var month = ("0" + (date.getMonth() + 1)).slice(-2);
       var year = date.getFullYear();

       return day+''+month+''+year;
     }


     /**
      * Define se o usuario esta vondp atraves de uma landingpage
      * @param location
      * @returns {boolean}
      */
     this.isUserFromLandingPage = function(location) {

       var isEmailParameter = !Utils.isEmpty(location.search().email);
       var isUtmSourceParameter = !Utils.isEmpty(location.search().utm_source);

       if (isEmailParameter && isUtmSourceParameter) {
         return true;
       }

       return false;

     };



     /**
      * Retorna a o subID da campanha
      * @param location
      * @returns {boolean}
      */
     this.getCampaing = function(location, deviceAccess, sessionLanding) {

       var isUtmCampaingParameter = !Utils.isEmpty(location.search().utm_campaign);

       var languagePrefix = '';
       if(sessionLanding.languageOrigin === 'pt-BR'){
         languagePrefix = 'BR';
       }else if(sessionLanding.languageOrigin === 'fr-FR'){
         languagePrefix = 'FR';
       }else if(sessionLanding.languageOrigin === 'es-MX'){
         languagePrefix = 'MX';
       }

       var devicePrefix = '';
       if(deviceAccess === 'mobile'){
         devicePrefix = 'M';
       }else{
         devicePrefix = 'D';
       }

       var sessionCode = '';
       if(sessionLanding.code === 'amostras'){
         sessionCode = 'AMT';
       }else if(sessionLanding.code === 'videncias'){
         sessionCode = 'VDC';
       }else if(sessionLanding.code  === 'revendas'){
         sessionCode = 'RVD';
       }

       /*if (isUtmCampaingParameter) {
         return location.search().utm_campaign;
       }*/

       if(location.path() === '/perguntas'){

         if (isUtmCampaingParameter) {
           return languagePrefix+'_'+sessionCode+'_'+devicePrefix+'_GPG'+'_'+location.search().utm_campaign;
         }else{
           return languagePrefix+'_'+sessionCode+'_'+devicePrefix+'_GPG';

         }

       }

       if(location.path() === '/home'){

         if (isUtmCampaingParameter) {
           return languagePrefix+'_'+sessionCode+'_'+devicePrefix+'_GBC'+'_'+location.search().utm_campaign;
         }else{
           return languagePrefix+'_'+sessionCode+'_'+devicePrefix+'_GBC';
         }

       }


     };




     /**
      * Define se o usuario esta vondp atraves de uma landingpage
      * @param location
      * @returns {boolean}
      */
     this.isUserFromEmail = function(location) {

       var isEmailParameter = !Utils.isEmpty(location.search().email);

       if (isEmailParameter) {
         return true;
       }

       return false;

     };


     this.getData = function(){
       return self.data;
     };

     this.setData = function(data){
       return self.data = data;
     };

     this.setLogged = function(isLogged){
       self.data.isLogged = {};
       return self.data.isLogged = isLogged;
     };


     /**
      * Verifica se o usuario esta completo
      * @param isLogged
      * @returns {*}
      */
     this.isUserCompleted = function(user){
       return user.address.zipcode !== "" ? true : false;
     };


     /**
      * Executa os Sponsorings do usuario
       * @param user
      */
     this.sendSponsoring  = function(){
       $http.post('/api/users/sponsoring', self.data).success(function(){}).error(function(){});
     }

     return this;

});
