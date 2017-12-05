'use strict';

angular.module('gosteiclubApp')
  .service('Malling', function ($http) {


    this.createContact = function(user){

      user.origin = 'gostei';

      $http.post('/api/malling/contact', user)
        .then(function(data, status) {
          console.log('createContact', data, status);
        });
    };


    this.updateContact = function(user){

      user.origin = 'gostei';

      $http.put('/api/malling/contact/'+user.email, user)
        .then(function(data, status) {});
    };


    this.sendWelcomeMail = function(user){

      user.origin = 'gostei';

      $http.post('/api/malling/welcome/'+user.email, user)
        .then(function(data, status) {});
    };




  });
