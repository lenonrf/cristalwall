'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.Product
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .factory('WsClient', function ($http) {


    this.executeUri = function(type, offer, user){  

      var data = {
        //uri: uri,
        offer: offer,
        user: user,
        type: type
      };

      $http.post('/api/wsclient', data)
        .then(this.successCallback, this.errorCallback);
    };


    this.successCallback = function(response){
      console.log('successCallback', response);
    };



    this.errorCallback = function(response){
      console.log('errorCallback', response);
    };




    return this;

  });
