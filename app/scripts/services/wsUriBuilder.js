'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.Product
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .factory('WsUriBuilder', function () {



    this.buildUriCustom = function(user, offerType, offerUri, fieldTag, customValue){

      if(offerUri.indexOf('?') > -1){
        offerUri = offerUri + '&'+fieldTag+'='+customValue;
      
      }else{
        offerUri = offerUri + '?'+fieldTag+'='+customValue;
      }

      return this.buildUri(user, offerType, offerUri);

    };



    this.buildUri = function(user, offerType, offerUri){
      
      switch(offerType){

        case 'survey':
          return this.replaceValues(offerUri, user);

        case 'questionHall':
          return this.replaceValues(offerUri, user);

      }
    };



    this.replaceValues = function(offerUri, user){

      var keyValuesArray = offerUri.match(/<([a-z]|[A-Z])*>/g);

      if(!keyValuesArray){
        return offerUri;
      }

      for (var i = 0; i < keyValuesArray.length; i++) {
        offerUri = this.searchAndReplaceUserValues(keyValuesArray[i], offerUri, user);
      };

      return offerUri;
    };




    this.searchAndReplaceUserValues = function(keyValue, offerUri, user){

      var name = user.name.split(' ');

      switch(keyValue){

        case '<email>':       return offerUri.replace(keyValue, user.email); 
        case '<fullName>':    return offerUri.replace(keyValue, user.name); 
        case '<name>':        return offerUri.replace(keyValue, name[0]); 
        case '<lastName>':    return offerUri.replace(keyValue, name[1]); 
        case '<birthDate>':   return offerUri.replace(keyValue, this.getUserBirthDateFormated(user)); 
        case '<gender>':      return offerUri.replace(keyValue, user.gender); 
        case '<cellphone>':   return offerUri.replace(keyValue, user.cellphone); 
        case '<telephone>':   return offerUri.replace(keyValue, user.telephone); 
        case '<state>':       return offerUri.replace(keyValue, user.address.status); 
        case '<city>':        return offerUri.replace(keyValue, user.address.city); 
        case '<zipcode>':     return offerUri.replace(keyValue, user.address.zipcode); 
        case '<ip>':          return offerUri.replace(keyValue, this.getRandonIP(user)); 
        case '<currentDate>': return offerUri.replace(keyValue, this.getCurrentDate());
      }

    };


    this.getUserBirthDateFormated = function (user){

      var birthDate = new Date(user.birthDate);
      return birthDate.getDate()+'-'+(birthDate.getMonth()+1)+'-'+birthDate.getFullYear();
    };



    this.getCurrentDate = function (){

      var now = new Date();
      var year = now.getFullYear();
      var month = ( (now.getMonth()+1) < 10) ? '0'+(now.getMonth()+1) : now.getMonth()+1;
      var day = (now.getDate() < 10) ? '0'+now.getDate() : now.getDate();

      return year+'-'+month+'-'+day+ ' 00:00:00';
    };




    this.getRandonIP = function(user){

      if(user.languageOrigin === 'pt-BR'){

          var ip_1 = '200.10.227.'+ Math.floor(Math.random()*21)
          var ip_2 = '200.10.245.'+ Math.floor(Math.random()*21)
          var ip_3 = '200.11.0.'  + Math.floor(Math.random()*21)
          var ip_4 = '200.11.8.'  + Math.floor(Math.random()*21)
          var ip_5 = '200.11.16.' + Math.floor(Math.random()*21)
          var ip_6 = '200.11.24.' + Math.floor(Math.random()*21)
          var ip_7 = '200.11.28.' + Math.floor(Math.random()*21)
          var ip_8 = '200.12.0.'  + Math.floor(Math.random()*21)
          var ip_9 = '200.12.8.'  + Math.floor(Math.random()*21)
          var ip_0 = '200.12.131.'+ Math.floor(Math.random()*21)

          var range = [ip_1, ip_2, ip_3, ip_4, ip_5, ip_6, ip_7, ip_8, ip_9, ip_0];
          var randWish = range[Math.floor(Math.random() * range.length)];

          return randWish;
      }



      if(user.languageOrigin === 'fr-FR'){

          var ip_1 = '91.212.21.'+ Math.floor(Math.random()*21)
          var ip_2 = '91.223.253.'+ Math.floor(Math.random()*21)
          var ip_3 = '87.238.176.'  + Math.floor(Math.random()*21)
          var ip_4 = '178.251.248.'  + Math.floor(Math.random()*21)
          var ip_5 = '185.36.216.' + Math.floor(Math.random()*21)
          var ip_6 = '192.190.69.' + Math.floor(Math.random()*21)
          var ip_7 = '194.110.207.' + Math.floor(Math.random()*21)
          var ip_8 = '217.119.128.'  + Math.floor(Math.random()*21)
          var ip_9 = '193.164.156.'  + Math.floor(Math.random()*21)
          var ip_0 = '155.133.128.'+ Math.floor(Math.random()*21)

          var range = [ip_1, ip_2, ip_3, ip_4, ip_5, ip_6, ip_7, ip_8, ip_9, ip_0];
          var randWish = range[Math.floor(Math.random() * range.length)];

          return randWish;
      }
    };


    return this;

  });
