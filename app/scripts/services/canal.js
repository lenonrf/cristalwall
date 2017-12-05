'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.Product
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .factory('Canal', function ($resource, $http, Utils, SessionLanding) {

    this.data = {};
    var self = this;

    this.resource = $resource('/api/canais/:id',{},{
      query: {
        method:'GET', isArray:true
      }
    });

    this.getData = function(){
      return self.data;
    };

    this.setData = function(data){
      return self.data = data;
    };

    this.getCanais = function(user) {
      this.resource.query(function(data){
        return data;
      }, function(err){ });
    };


    /**
     * Retorna o canal do usuario
     * @param location
     * @returns {string}
     */
    this.getCanalCode = function(location){


      switch(SessionLanding.getLanguageOrigin()){
        case 'fr-FR':
          return 'opportunites.club'
          break;

        case 'pt-BR':
          return 'gostei.club'
          break;

        case 'es-MX':
          return 'megusta'
          break;
      }


      /*
      var canalParam = location.host(); //'gostei.club';
      canalParam = canalParam.replace('www.','');

      if(!Utils.isEmpty(location.search().utm_source)){
        canalParam = location.search().utm_source;
      }

      return 'gostei.club';
      */

    };


    return this;

  });
