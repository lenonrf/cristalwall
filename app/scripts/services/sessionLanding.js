'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.Product
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .factory('SessionLanding', function ($translate, $location) {

    this.data = {};



    this.getOriginMedium = function(location){
      return (location.search().utm_medium) ? location.search().utm_medium : '';
    };



    this.getOriginTraficSource = function(location){

      var originTraficSource = 'organic'

      if(location.search().utm_source){
      
        originTraficSource = location.search().utm_source.toLowerCase();
      
      }else{

        if(location.search().utm_campaign){

          switch(location.search().utm_campaign.toLowerCase()){

            case 'g_amostras':
            case 'g_trabalhe':
            case 'g_revenda':
            case 'g_testadores':
            case 'g_relevancia':
            case 'g_promocoes':
            case 'g_pesquisas':
            case 'g_ganhardinheiro':
              originTraficSource = 'google';
              break;
          }
        }
      }

      return originTraficSource;

    };




    this.isOutBrain = function(location){
      if(location.search().utm_source){
        return (location.search().utm_source.toLowerCase() === 'outbrain');
      }

      return false;
    };

    this.isTaboola = function(location){
      if(location.search().utm_source){
        return (location.search().utm_source.toLowerCase() === 'taboola');
      }

      return false;
    };



    this.getItemsMenu = function(controller){

      var sessionLandingCode = this.getSessionCode($location);

      var menuItemsTranslation = {
        freeSamples: {nome: $translate.instant('MENU.FREESAMPLES_NAME'), href: $translate.instant('MENU.FREESAMPLES_HREF')},
        itsFree: {nome: $translate.instant('MENU.ITSFREE_NAME'), href: $translate.instant('MENU.ITSFREE_HREF')},
        oportunity: {nome: $translate.instant('MENU.OPORTUNITY_NAME'), href: $translate.instant('MENU.OPORTUNITY_HREF')},
        testimonials: {nome: $translate.instant('MENU.TESTIMONIALS_NAME'), href: $translate.instant('MENU.TESTIMONIALS_HREF')},
        brands: {nome: $translate.instant('MENU.BRANDS_NAME'), href: $translate.instant('MENU.BRANDS_HREF')},
      };


        if (controller === 'MainCtrl') {
          return [ menuItemsTranslation.itsFree, menuItemsTranslation.oportunity,
              menuItemsTranslation.testimonials, menuItemsTranslation.brands];
        }

        if (controller === 'PerguntasCtrl') {
          return null;
        }

        if (controller === 'HomeCtrl') {
          return [menuItemsTranslation.oportunity, menuItemsTranslation.freeSamples];
        }

    };



    this.getSessionCode = function(location){
      return 'echantillon';
    };




    this.getLanguageOrigin = function(){
      return 'fr-FR'

    };




    this.getDataFromLanding = function(rootScope, sessionCode){

      var objReturn = {};
      objReturn.main = {};
      objReturn.marcas = {};

      objReturn.deGraca = {};
      objReturn.deGraca.item1 = {};
      objReturn.deGraca.item2 = {};
      objReturn.deGraca.item3 = {};

      objReturn.isAmostras = true;

      objReturn.showDeGraca = true;
      objReturn.showDeGracaImages = true;
      objReturn.showOportunidades = true;
      objReturn.showDepoimentos = true;
      objReturn.showMarcas = true;

      return objReturn;
    };


    return this;

  });
