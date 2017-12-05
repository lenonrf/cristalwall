'use strict';


angular.module('gosteiclubApp')
  .controller('MenuCtrl', function ($scope, $rootScope, Menu) {

    $rootScope.showMenuItems = true;
    //$rootScope.menu = [];
    $rootScope.isStepButtonDisabled = false;
    $rootScope.isShowPushNotification = false;

  });
