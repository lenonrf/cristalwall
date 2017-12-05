'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.Product
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .factory('Receita', function ($resource, $http, Utils, SessionLanding) {

    this.data = {};
    var self = this;

    this.resource = $resource('/api/receita/:id',{},{
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

    this.getReceitas = function(user) {
      this.resource.query(function(data){
        return data;
      }, function(err){ });
    };


    return this;

  });
