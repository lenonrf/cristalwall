'use strict';


angular.module('gosteiclubApp')
  .service('Stats', function ($rootScope, $http) {


    this.setImpression = function(offerId){
      $http.post('/api/yhall/offer/'+offerId+'/stats/impressions?affcode=gc');
    };



    this.setClick = function(offerId, type, userId){
      $http.post('/api/yhall/offer/'+offerId+'/stats/clicks?affcode=gc&type='+type+'&userId='+userId);
    };


  });
