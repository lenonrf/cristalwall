'use strict';


angular.module('gosteiclubApp')
  .service('Partners', function ($rootScope, SessionLanding) {


    this.getPartners = function (partners) {

      switch (SessionLanding.getLanguageOrigin()) {

        case 'fr-FR':
        case 'es-MX':
          $rootScope.titleModal = 'Sponsor';
          return this.getPartnersText(partners);
          break;

        case 'pt-BR':
          $rootScope.titleModal = 'Parceiros';
          return this.getPartnersText(partners);
          break;
      }

    };


    this.getPartnersText = function(partners){

      var result = '<div class="container">';

      for(var x=0; x<partners.length; x++){

        result = result+'<div class="row" > ' +
          '<div class="col-md-3">'+
          ' <a href="'+partners[x].url+'" target="_blank"> <img width="300px" height="120px" src="'+partners[x].image+'"/></a>'+
          '</div>'+
          '<div class="col-md-8" >'+
            '<h2>'+partners[x].title+'</h2>'+
            '<p>'+partners[x].description+'</p>'+
          '</div>' +
        '</div> <br/><br/><br/>';
      }

      return result + '</div>';
    };



    return this;

    });
