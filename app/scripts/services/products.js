'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.Product
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .factory('Product', function ($resource, $http, Utils) {

    this.data = {};
    var self = this;

    this.resource = $resource('/api/products/:id');

    this.getData = function(){
      return self.data;
    };

    this.setData = function(data){
      return self.data = data;
    };



        /**
         * Retorna os produtos cadastrados
         * @returns {*|{method, isArray}}
         */
        this.getProducts = function(user) {

          console.log('user', user);


          this.resource.query(function(data){

            for(var p_index=0; p_index<data.length; p_index++){

              if(!Utils.isEmpty(user)){
                for(var u_index=0; u_index<user.getData().products.length; u_index++){
                    data[p_index].marked = (userProducts[u_index]._id === data[p_index]._id);
                }
              }
            }

            return data;

          }, function(err){ });
        };

    return this;

  });
