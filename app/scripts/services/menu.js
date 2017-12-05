'use strict';


angular.module('gosteiclubApp')
  .service('Menu', function ($rootScope, $location, $translate, SessionLanding) {


    this.setMenu = function(controller){

      switch(controller){

        case 'MainCtrl':
          this.setDefaultMenu();
          break;

        case 'PerguntasCtrl':
          case 'HomeCtrl':
            $rootScope.showMenuItems = false;
            this.setFixedMenu();
            break;
      }

      $rootScope.menu = SessionLanding.getItemsMenu(controller);

    };


    this.setFixedMenu = function(){
      $("header").css("background", "#000000").css("padding", "0px 0px 13px");
      $("#entrarLI").css("display", "none");
    };

    this.setDefaultMenu = function(){
      $("header").css("background", "transparent").css("padding", "20px 0px 20px");
      $("#entrarLI").css("display", "block");
    };


  });
