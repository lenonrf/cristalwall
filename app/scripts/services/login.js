'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.Question
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .service('Login', function ($resource) {


    this.login = function(user){
      console.log(user);
      $scope.disableButton = true;
      User.resource.get({email:user.email}, onSuccess, onErrorLogin);
    };

  });
