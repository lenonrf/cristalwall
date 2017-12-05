'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.Product
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .factory('Sponsoring', function (WsClient, $http) {




    this.send = function(sponsorList, user){

      for (var i = 0; i < sponsorList.length; i++) { 

          WsClient.executeUri('sponsor', sponsorList[i], user);
          $http.post('/api/yhall/offer/'+sponsorList[i]._id+'/stats/clicks?type=acceptance');
      };
    };



    return this;

  });
