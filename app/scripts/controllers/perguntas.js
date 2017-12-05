'use strict';

/**
 * @ngdoc function
 * @name gosteiclubApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gosteiclubApp
 */
angular.module('gosteiclubApp')
  .controller('PerguntasCtrl', function ($scope, $window, Malling, $http, $modal, $rootScope,
      $translate, $location, Menu, $compile, $sce, Survey, WsUriBuilder, WsClient, 
      User, Utils, Product, SessionLanding, Sponsoring) {

      $rootScope.menuItems = [];

      $rootScope.isShowFooter = false;


      

        $scope.showModal = function(){
            $modal.open({
                  templateUrl: 'productTestSocialShare.html',
                  controller: 'ModalShareController', 
                  size: 'lg',
                  backdrop: 'static'
             })
            .result.then(
                function () {}, 
                function () {}
            );
        };


        $scope.showRanking = function(){
            $modal.open({
                  templateUrl: 'ranking.html',
                  controller: 'RankingController', 
                  size: 'lg',
                  backdrop: 'static'
             })
            .result.then(
                function () {}, 
                function () {}
            );
        };




     /*if(!Utils.isLogged(User.data)){
      if(User.isUserFromLandingPage($location)){

        User.resource.get({email:$location.search().email}, function(data){

          User.setData(data);
          User.setLogged(true);
          $scope.user = User.getData();

        }, function(){
          $location.path('/main');
        });

      }else{
        if($location.path() !== '/'){
          $location.path('/main');
          return null;
        }
      }

    }else{
      $rootScope.firstName = Utils.getFirstName(User.getData().name);
    }*/

    

    $rootScope.showFooter = false;
    $rootScope.isStepButtonDisabled = true;
    $scope.user = User.getData();
    $rootScope.originTrafficSource = SessionLanding.getOriginTraficSource($location);


    $scope.deliveryWS = {
      survey: [],
      questionHall: {},
      balcony: {}
    };

    $scope.offers = {
      questionHall: []
    }



    $rootScope.isNextStepButton = false;

   

    /**
     * Avaliate if the survey is complete and allow the next button to proceed
     * to the next step
     */
    $scope.isNextStepAvaliableForSurvey = function(surveyList){

      $rootScope.isNextStepButton = 
          (Survey.isAllChoisesSelected($scope.dynamicSegmentation, surveyList));

    };


    /**
     * Move forward to next step in the progress bar
     */
    $scope.nextStep = function(){


      if($rootScope.isNextStepButton){
        $scope.sendSurvey();
        $location.path('oportunidades');  
      }
      

    };


    /**
     * Call the API to send que survey to avaiable web services
     */
    $scope.sendSurvey = function(){
      Survey.sendSurvey($rootScope.survey, $scope.user);
    };



    $rootScope.dynamicSegmentation = [];

    $rootScope.survey = [
        {
            "_id": "58ab1604a92d613f92d3079b",
            "status": true,
            "name": "Brastemp YB",
            "segmentation": {
                "isMobile": false,
                "isMale": false,
                "isFemale": false,
                "isDesktop": false,
                "forbiddenDomains": [],
                "dynamicSegmentation": [],
                "dddRegion": [],
                "age": {
                    "lessThan": 0,
                    "moreThan": 0
                }
            },
            "mainQuestion": {
                "answerList": [
                    {
                        "_id": "58ab1604a92d613f92d3079e",
                        "answer": "Sim quero experimentar",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "58ab1604a92d613f92d3079d",
                        "answer": "Não preciso de purificador",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "do_nothing"
                        }
                    },
                    {
                        "_id": "58ab1604a92d613f92d3079c",
                        "answer": "Acho que minha agua não é limpa",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    }
                ],
                "description": "A Brastemp desenvolveu purificadores de água de qualidade para cuidar da sua saúde! Quer experimentar?",
                "title": "Sabia que a qualidade da água que bebe é fundamental?!"
            },
            "delivery": {
                "type": "tb",
                "targetBlankUrl": "http://springmedia.go2cloud.org/aff_c?offer_id=1824&aff_id=1208&aff_sub=survey",
                "wsUrl": "http://springmedia.go2cloud.org/aff_c?offer_id=1824&aff_id=1208&aff_sub=survey",
                "isUploadImage": true,
                "smallImage": "http://cdn.the-ybox.tech/brastemp.jpg",
                "largeImage": "http://cdn.the-ybox.tech/brastemp.jpg",
                "birthDate": {
                    "isBirthDate": false,
                    "mask": ""
                },
                "gender": {
                    "isGender": false,
                    "valueFemale": "",
                    "valueMale": ""
                }
            },
            "links": {
                "addClick": {
                    "acceptance": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/58ab1604a92d613f92d3079b/stats/clicks?type=acceptance&affcode=gc"
                    },
                    "refusal": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/58ab1604a92d613f92d3079b/stats/clicks?type=refusal&affcode=gc"
                    }
                },
                "addImpresssion": {
                    "method": "POST",
                    "link": "http://yhall.the-ybox.tech/api/offer/58ab1604a92d613f92d3079b/stats/impressions?affcode=gc"
                },
                "getOffer": {
                    "method": "GET",
                    "link": "http://yhall.the-ybox.tech/api/offer/58ab1604a92d613f92d3079b"
                }
            }
        }
    ];

    $rootScope.questionHall = [
        {
            "_id": "5936cd1f43af673d2d969730",
            "status": false,
            "name": "Prime pass",
            "segmentation": {
                "isMobile": false,
                "isMale": false,
                "isFemale": false,
                "isDesktop": false,
                "forbiddenDomains": [],
                "dynamicSegmentation": [],
                "dddRegion": [],
                "age": {
                    "lessThan": 0,
                    "moreThan": 0
                }
            },
            "stats": {
                "acceptance": [
                    {
                        "_id": "59662ea8a982d22c3246dde0",
                        "refusalCount": 539,
                        "acceptanceCount": 565,
                        "created": "2017-06-07T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dddf",
                        "refusalCount": 753,
                        "acceptanceCount": 737,
                        "created": "2017-06-08T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddde",
                        "refusalCount": 743,
                        "acceptanceCount": 432,
                        "created": "2017-06-09T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dddd",
                        "refusalCount": 546,
                        "acceptanceCount": 297,
                        "created": "2017-06-11T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dddc",
                        "refusalCount": 185,
                        "acceptanceCount": 95,
                        "created": "2017-06-12T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dddb",
                        "refusalCount": 601,
                        "acceptanceCount": 320,
                        "created": "2017-06-13T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddda",
                        "refusalCount": 504,
                        "acceptanceCount": 273,
                        "created": "2017-06-10T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddd9",
                        "refusalCount": 390,
                        "acceptanceCount": 258,
                        "created": "2017-06-15T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddd8",
                        "refusalCount": 424,
                        "acceptanceCount": 266,
                        "created": "2017-06-16T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddd7",
                        "refusalCount": 233,
                        "acceptanceCount": 218,
                        "created": "2017-06-06T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddd6",
                        "refusalCount": 537,
                        "acceptanceCount": 276,
                        "created": "2017-07-03T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddd5",
                        "refusalCount": 443,
                        "acceptanceCount": 253,
                        "created": "2017-06-17T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddd4",
                        "refusalCount": 1078,
                        "acceptanceCount": 825,
                        "created": "2017-06-27T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddd3",
                        "refusalCount": 451,
                        "acceptanceCount": 247,
                        "created": "2017-07-05T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddd2",
                        "refusalCount": 473,
                        "acceptanceCount": 260,
                        "created": "2017-06-19T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddd1",
                        "refusalCount": 452,
                        "acceptanceCount": 273,
                        "created": "2017-06-20T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddd0",
                        "refusalCount": 394,
                        "acceptanceCount": 212,
                        "created": "2017-06-21T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddcf",
                        "refusalCount": 438,
                        "acceptanceCount": 336,
                        "created": "2017-06-23T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddce",
                        "refusalCount": 511,
                        "acceptanceCount": 299,
                        "created": "2017-06-25T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddcd",
                        "refusalCount": 661,
                        "acceptanceCount": 431,
                        "created": "2017-06-26T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddcc",
                        "refusalCount": 368,
                        "acceptanceCount": 170,
                        "created": "2017-07-06T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddcb",
                        "refusalCount": 414,
                        "acceptanceCount": 264,
                        "created": "2017-06-24T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddca",
                        "refusalCount": 450,
                        "acceptanceCount": 243,
                        "created": "2017-06-18T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddc9",
                        "refusalCount": 256,
                        "acceptanceCount": 183,
                        "created": "2017-07-10T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddc8",
                        "refusalCount": 1077,
                        "acceptanceCount": 729,
                        "created": "2017-06-28T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddc7",
                        "refusalCount": 618,
                        "acceptanceCount": 349,
                        "created": "2017-06-14T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddc6",
                        "refusalCount": 688,
                        "acceptanceCount": 450,
                        "created": "2017-06-22T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddc5",
                        "refusalCount": 729,
                        "acceptanceCount": 433,
                        "created": "2017-06-29T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddc4",
                        "refusalCount": 55,
                        "acceptanceCount": 30,
                        "created": "2017-07-01T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddc3",
                        "refusalCount": 47,
                        "acceptanceCount": 26,
                        "created": "2017-06-30T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddc2",
                        "refusalCount": 127,
                        "acceptanceCount": 64,
                        "created": "2017-07-02T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddc1",
                        "refusalCount": 449,
                        "acceptanceCount": 294,
                        "created": "2017-07-11T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddc0",
                        "refusalCount": 435,
                        "acceptanceCount": 282,
                        "created": "2017-07-04T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddbf",
                        "refusalCount": 159,
                        "acceptanceCount": 119,
                        "created": "2017-07-09T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddbe",
                        "refusalCount": 167,
                        "acceptanceCount": 154,
                        "created": "2017-07-12T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddbd",
                        "refusalCount": 199,
                        "acceptanceCount": 153,
                        "created": "2017-07-08T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddbc",
                        "refusalCount": 298,
                        "acceptanceCount": 184,
                        "created": "2017-07-07T04:00:00.000Z"
                    }
                ],
                "clicks": [
                    {
                        "_id": "59662ea8a982d22c3246ddbb",
                        "count": 1490,
                        "created": "2017-06-08T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddba",
                        "count": 1175,
                        "created": "2017-06-09T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddb9",
                        "count": 843,
                        "created": "2017-06-11T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddb8",
                        "count": 967,
                        "created": "2017-06-14T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddb7",
                        "count": 690,
                        "created": "2017-06-16T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddb6",
                        "count": 733,
                        "created": "2017-06-19T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddb5",
                        "count": 1138,
                        "created": "2017-06-22T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddb4",
                        "count": 774,
                        "created": "2017-06-23T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddb3",
                        "count": 1104,
                        "created": "2017-06-07T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddb2",
                        "count": 678,
                        "created": "2017-06-24T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddb1",
                        "count": 482,
                        "created": "2017-07-07T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddb0",
                        "count": 810,
                        "created": "2017-06-25T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddaf",
                        "count": 1092,
                        "created": "2017-06-26T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddae",
                        "count": 1806,
                        "created": "2017-06-28T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddad",
                        "count": 280,
                        "created": "2017-06-12T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddac",
                        "count": 439,
                        "created": "2017-07-10T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddab",
                        "count": 73,
                        "created": "2017-06-30T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246ddaa",
                        "count": 648,
                        "created": "2017-06-15T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dda9",
                        "count": 696,
                        "created": "2017-06-17T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dda8",
                        "count": 85,
                        "created": "2017-07-01T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dda7",
                        "count": 191,
                        "created": "2017-07-02T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dda6",
                        "count": 451,
                        "created": "2017-06-06T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dda5",
                        "count": 698,
                        "created": "2017-07-05T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dda4",
                        "count": 725,
                        "created": "2017-06-20T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dda3",
                        "count": 717,
                        "created": "2017-07-04T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dda2",
                        "count": 777,
                        "created": "2017-06-10T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dda1",
                        "count": 538,
                        "created": "2017-07-06T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dda0",
                        "count": 693,
                        "created": "2017-06-18T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd9f",
                        "count": 606,
                        "created": "2017-06-21T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd9e",
                        "count": 1903,
                        "created": "2017-06-27T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd9d",
                        "count": 1162,
                        "created": "2017-06-29T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd9c",
                        "count": 921,
                        "created": "2017-06-13T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd9b",
                        "count": 278,
                        "created": "2017-07-09T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd9a",
                        "count": 352,
                        "created": "2017-07-08T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd99",
                        "count": 813,
                        "created": "2017-07-03T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd98",
                        "count": 321,
                        "created": "2017-07-12T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd97",
                        "count": 743,
                        "created": "2017-07-11T04:00:00.000Z"
                    }
                ],
                "impressions": [
                    {
                        "_id": "59662ea8a982d22c3246dd96",
                        "count": 1493,
                        "created": "2017-06-08T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd95",
                        "count": 1406,
                        "created": "2017-06-09T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd94",
                        "count": 1115,
                        "created": "2017-06-11T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd93",
                        "count": 1280,
                        "created": "2017-06-14T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd92",
                        "count": 950,
                        "created": "2017-06-16T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd91",
                        "count": 1008,
                        "created": "2017-06-19T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd90",
                        "count": 1590,
                        "created": "2017-06-22T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd8f",
                        "count": 1080,
                        "created": "2017-06-23T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd8e",
                        "count": 1105,
                        "created": "2017-06-07T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd8d",
                        "count": 965,
                        "created": "2017-06-24T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd8c",
                        "count": 614,
                        "created": "2017-07-07T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd8b",
                        "count": 1132,
                        "created": "2017-06-25T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd8a",
                        "count": 1515,
                        "created": "2017-06-26T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd89",
                        "count": 2564,
                        "created": "2017-06-28T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd88",
                        "count": 364,
                        "created": "2017-06-12T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd87",
                        "count": 621,
                        "created": "2017-07-10T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd86",
                        "count": 104,
                        "created": "2017-06-30T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd85",
                        "count": 871,
                        "created": "2017-06-15T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd84",
                        "count": 945,
                        "created": "2017-06-17T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd83",
                        "count": 118,
                        "created": "2017-07-01T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd82",
                        "count": 272,
                        "created": "2017-07-02T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd81",
                        "count": 451,
                        "created": "2017-06-06T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd80",
                        "count": 1040,
                        "created": "2017-07-05T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd7f",
                        "count": 998,
                        "created": "2017-06-20T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd7e",
                        "count": 1037,
                        "created": "2017-07-04T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd7d",
                        "count": 1048,
                        "created": "2017-06-10T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd7c",
                        "count": 688,
                        "created": "2017-07-06T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd7b",
                        "count": 961,
                        "created": "2017-06-18T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd7a",
                        "count": 841,
                        "created": "2017-06-21T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd79",
                        "count": 2667,
                        "created": "2017-06-27T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd78",
                        "count": 1602,
                        "created": "2017-06-29T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd77",
                        "count": 1185,
                        "created": "2017-06-13T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd76",
                        "count": 401,
                        "created": "2017-07-09T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd75",
                        "count": 497,
                        "created": "2017-07-08T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd74",
                        "count": 1201,
                        "created": "2017-07-03T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd73",
                        "count": 428,
                        "created": "2017-07-12T04:00:00.000Z"
                    },
                    {
                        "_id": "59662ea8a982d22c3246dd72",
                        "count": 1046,
                        "created": "2017-07-11T04:00:00.000Z"
                    }
                ]
            },
            "mainQuestion": {
                "answerList": [
                    {
                        "_id": "5936cd1f43af673d2d969732",
                        "answer": "Epa! Quero ficar por dentro dessa promoção!",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "5936cd1f43af673d2d969731",
                        "answer": "Não gosto muito de ver filmes...",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "do_nothing"
                        }
                    }
                ],
                "description": "",
                "title": "Já imaginou pagar apenas 5 reais por uma sessão de cinema? Agora é possível!"
            },
            "delivery": {
                "type": "tb",
                "targetBlankUrl": "http://luinttrk1.com/?a=22832&c=36173&s1",
                "wsUrl": "http://luinttrk1.com/?a=22832&c=36173&s1",
                "isUploadImage": false,
                "smallImage": "http://cdn.the-ybox.tech/banner%20prime%20pass.png",
                "largeImage": "http://cdn.the-ybox.tech/banner%20prime%20pass.png",
                "birthDate": {
                    "isBirthDate": false,
                    "mask": ""
                },
                "gender": {
                    "isGender": false,
                    "valueFemale": "",
                    "valueMale": ""
                }
            },
            "links": {
                "addClick": {
                    "acceptance": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/5936cd1f43af673d2d969730/stats/clicks?type=acceptance&affcode=gc"
                    },
                    "refusal": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/5936cd1f43af673d2d969730/stats/clicks?type=refusal&affcode=gc"
                    }
                },
                "addImpresssion": {
                    "method": "POST",
                    "link": "http://yhall.the-ybox.tech/api/offer/5936cd1f43af673d2d969730/stats/impressions?affcode=gc"
                },
                "getOffer": {
                    "method": "GET",
                    "link": "http://yhall.the-ybox.tech/api/offer/5936cd1f43af673d2d969730"
                }
            }
        },
        {
            "_id": "58765b4bccb5333bb25306e4",
            "status": false,
            "name": "Portal Educação",
            "segmentation": {
                "isMobile": false,
                "isMale": false,
                "isFemale": false,
                "isDesktop": false,
                "forbiddenDomains": [],
                "dynamicSegmentation": [],
                "dddRegion": [],
                "age": {
                    "lessThan": 0,
                    "moreThan": 0
                }
            },
            "stats": {
                "acceptance": [
                    {
                        "_id": "592740225a4c7f7d63ef0f8f",
                        "refusalCount": 241,
                        "acceptanceCount": 1092,
                        "created": "2017-05-11T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f8e",
                        "refusalCount": 225,
                        "acceptanceCount": 844,
                        "created": "2017-05-13T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f8d",
                        "refusalCount": 277,
                        "acceptanceCount": 1133,
                        "created": "2017-05-12T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f8c",
                        "refusalCount": 320,
                        "acceptanceCount": 1238,
                        "created": "2017-05-15T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f8b",
                        "refusalCount": 373,
                        "acceptanceCount": 1543,
                        "created": "2017-05-18T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f8a",
                        "refusalCount": 455,
                        "acceptanceCount": 1688,
                        "created": "2017-05-24T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f89",
                        "refusalCount": 177,
                        "acceptanceCount": 721,
                        "created": "2017-05-14T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f88",
                        "refusalCount": 379,
                        "acceptanceCount": 1495,
                        "created": "2017-05-16T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f87",
                        "refusalCount": 322,
                        "acceptanceCount": 1106,
                        "created": "2017-05-25T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f86",
                        "refusalCount": 337,
                        "acceptanceCount": 1312,
                        "created": "2017-05-17T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f85",
                        "refusalCount": 336,
                        "acceptanceCount": 1382,
                        "created": "2017-05-23T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f84",
                        "refusalCount": 321,
                        "acceptanceCount": 1611,
                        "created": "2017-05-19T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f83",
                        "refusalCount": 317,
                        "acceptanceCount": 1436,
                        "created": "2017-05-22T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f82",
                        "refusalCount": 251,
                        "acceptanceCount": 981,
                        "created": "2017-05-20T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f81",
                        "refusalCount": 177,
                        "acceptanceCount": 696,
                        "created": "2017-05-10T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f80",
                        "refusalCount": 264,
                        "acceptanceCount": 1119,
                        "created": "2017-05-21T04:00:00.000Z"
                    }
                ],
                "clicks": [
                    {
                        "_id": "592740225a4c7f7d63ef0f7f",
                        "count": 1333,
                        "created": "2017-05-11T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f7e",
                        "count": 898,
                        "created": "2017-05-14T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f7d",
                        "count": 1558,
                        "created": "2017-05-15T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f7c",
                        "count": 1428,
                        "created": "2017-05-25T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f7b",
                        "count": 1916,
                        "created": "2017-05-18T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f7a",
                        "count": 1874,
                        "created": "2017-05-16T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f79",
                        "count": 1232,
                        "created": "2017-05-20T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f78",
                        "count": 1718,
                        "created": "2017-05-23T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f77",
                        "count": 1383,
                        "created": "2017-05-21T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f76",
                        "count": 1410,
                        "created": "2017-05-12T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f75",
                        "count": 1069,
                        "created": "2017-05-13T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f74",
                        "count": 1753,
                        "created": "2017-05-22T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f73",
                        "count": 1932,
                        "created": "2017-05-19T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f72",
                        "count": 1649,
                        "created": "2017-05-17T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f71",
                        "count": 873,
                        "created": "2017-05-10T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f70",
                        "count": 2143,
                        "created": "2017-05-24T04:00:00.000Z"
                    }
                ],
                "impressions": [
                    {
                        "_id": "592740225a4c7f7d63ef0f6f",
                        "count": 1714,
                        "created": "2017-05-11T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f6e",
                        "count": 882,
                        "created": "2017-05-14T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f6d",
                        "count": 1531,
                        "created": "2017-05-15T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f6c",
                        "count": 1365,
                        "created": "2017-05-25T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f6b",
                        "count": 1914,
                        "created": "2017-05-18T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f6a",
                        "count": 1820,
                        "created": "2017-05-16T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f69",
                        "count": 1209,
                        "created": "2017-05-20T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f68",
                        "count": 1702,
                        "created": "2017-05-23T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f67",
                        "count": 1348,
                        "created": "2017-05-21T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f66",
                        "count": 1500,
                        "created": "2017-05-12T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f65",
                        "count": 1063,
                        "created": "2017-05-13T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f64",
                        "count": 1714,
                        "created": "2017-05-22T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f63",
                        "count": 1922,
                        "created": "2017-05-19T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f62",
                        "count": 1676,
                        "created": "2017-05-17T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f61",
                        "count": 919,
                        "created": "2017-05-10T04:00:00.000Z"
                    },
                    {
                        "_id": "592740225a4c7f7d63ef0f60",
                        "count": 2071,
                        "created": "2017-05-24T04:00:00.000Z"
                    }
                ]
            },
            "mainQuestion": {
                "answerList": [
                    {
                        "_id": "58765b4bccb5333bb25306e5",
                        "answer": "Minha Mãe é a melhor do mundo",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "58c15dad72378c12ac265aac",
                        "answer": "Minha Mãe é TOP!",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "58c15dad72378c12ac265aab",
                        "answer": "Minha mãe não é a melhor do mundo",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    }
                ],
                "description": "Responda essa pergunta e ganhe um curso gratis no Portal Educação",
                "title": "Sua Mãe é a melhor do mundo?"
            },
            "delivery": {
                "type": "tb",
                "targetBlankUrl": "http://action.metaffiliation.com/trk.php?mclic=P493C256711926315",
                "wsUrl": "http://action.metaffiliation.com/trk.php?mclic=P493C256711926315",
                "isUploadImage": false,
                "smallImage": "http://action.metaffiliation.com/trk.php?maff=P493C256711926315",
                "largeImage": "http://action.metaffiliation.com/trk.php?maff=P493C256711926315",
                "birthDate": {
                    "isBirthDate": false,
                    "mask": ""
                },
                "gender": {
                    "isGender": false,
                    "valueFemale": "",
                    "valueMale": ""
                }
            },
            "links": {
                "addClick": {
                    "acceptance": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/58765b4bccb5333bb25306e4/stats/clicks?type=acceptance&affcode=gc"
                    },
                    "refusal": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/58765b4bccb5333bb25306e4/stats/clicks?type=refusal&affcode=gc"
                    }
                },
                "addImpresssion": {
                    "method": "POST",
                    "link": "http://yhall.the-ybox.tech/api/offer/58765b4bccb5333bb25306e4/stats/impressions?affcode=gc"
                },
                "getOffer": {
                    "method": "GET",
                    "link": "http://yhall.the-ybox.tech/api/offer/58765b4bccb5333bb25306e4"
                }
            }
        },
        {
            "_id": "5942b2d2c52c7b2d1b9c89fb",
            "status": false,
            "name": "Trilhonarios",
            "segmentation": {
                "isMobile": false,
                "isMale": false,
                "isFemale": false,
                "isDesktop": false,
                "forbiddenDomains": [],
                "dynamicSegmentation": [],
                "dddRegion": [],
                "age": {
                    "lessThan": 0,
                    "moreThan": 0
                }
            },
            "stats": {
                "acceptance": [],
                "clicks": [],
                "impressions": []
            },
            "mainQuestion": {
                "answerList": [
                    {
                        "_id": "5942b2d2c52c7b2d1b9c89fd",
                        "answer": "Eu quero ficar rica (o)",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "5942b2d2c52c7b2d1b9c89fc",
                        "answer": "Tô bem de grana.",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "do_nothing"
                        }
                    }
                ],
                "description": "Com Trilhardários você aposta na loteria no Brasil e nos EUA. Jogue e concorra a um prêmio de US$1,58 bilhões!",
                "title": "A maior loteria online está com um bolão gigante!"
            },
            "delivery": {
                "type": "tb",
                "targetBlankUrl": "http://ads.trackify.cc/aff_c?offer_id=525&aff_id=1208&url_id=7140&aff_sub=SUBID",
                "wsUrl": "http://ads.trackify.cc/aff_c?offer_id=525&aff_id=1208&url_id=7140&aff_sub=SUBID",
                "isUploadImage": false,
                "smallImage": "https://media.go2speed.org/brand/files/springmedia/525/trilhonario_oferta_300x250_pt.gif",
                "largeImage": "https://media.go2speed.org/brand/files/springmedia/525/trilhonario_oferta_300x250_pt.gif",
                "birthDate": {
                    "isBirthDate": false,
                    "mask": ""
                },
                "gender": {
                    "isGender": false,
                    "valueFemale": "",
                    "valueMale": ""
                }
            },
            "links": {
                "addClick": {
                    "acceptance": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/5942b2d2c52c7b2d1b9c89fb/stats/clicks?type=acceptance&affcode=gc"
                    },
                    "refusal": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/5942b2d2c52c7b2d1b9c89fb/stats/clicks?type=refusal&affcode=gc"
                    }
                },
                "addImpresssion": {
                    "method": "POST",
                    "link": "http://yhall.the-ybox.tech/api/offer/5942b2d2c52c7b2d1b9c89fb/stats/impressions?affcode=gc"
                },
                "getOffer": {
                    "method": "GET",
                    "link": "http://yhall.the-ybox.tech/api/offer/5942b2d2c52c7b2d1b9c89fb"
                }
            }
        },
        {
            "_id": "594934b8c52c7b2d1b9f816b",
            "status": true,
            "name": "Mundo de Opiniões",
            "segmentation": {
                "isMobile": false,
                "isMale": false,
                "isFemale": false,
                "isDesktop": false,
                "forbiddenDomains": [],
                "dynamicSegmentation": [],
                "dddRegion": [],
                "age": {
                    "lessThan": 0,
                    "moreThan": 0
                }
            },
            "stats": {
                "acceptance": [
                    {
                        "_id": "59662f4406503e44a4b5356a",
                        "refusalCount": 228,
                        "acceptanceCount": 326,
                        "created": "2017-06-20T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53569",
                        "refusalCount": 395,
                        "acceptanceCount": 539,
                        "created": "2017-06-21T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53568",
                        "refusalCount": 576,
                        "acceptanceCount": 676,
                        "created": "2017-06-23T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53567",
                        "refusalCount": 255,
                        "acceptanceCount": 294,
                        "created": "2017-06-27T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53566",
                        "refusalCount": 500,
                        "acceptanceCount": 672,
                        "created": "2017-06-24T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53565",
                        "refusalCount": 593,
                        "acceptanceCount": 786,
                        "created": "2017-06-25T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53564",
                        "refusalCount": 801,
                        "acceptanceCount": 921,
                        "created": "2017-06-26T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53563",
                        "refusalCount": 440,
                        "acceptanceCount": 411,
                        "created": "2017-07-06T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53562",
                        "refusalCount": 618,
                        "acceptanceCount": 495,
                        "created": "2017-07-05T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53561",
                        "refusalCount": 852,
                        "acceptanceCount": 1089,
                        "created": "2017-06-22T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53560",
                        "refusalCount": 348,
                        "acceptanceCount": 346,
                        "created": "2017-07-04T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b5355f",
                        "refusalCount": 167,
                        "acceptanceCount": 278,
                        "created": "2017-07-08T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b5355e",
                        "refusalCount": 167,
                        "acceptanceCount": 190,
                        "created": "2017-07-12T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b5355d",
                        "refusalCount": 309,
                        "acceptanceCount": 342,
                        "created": "2017-07-10T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b5355c",
                        "refusalCount": 289,
                        "acceptanceCount": 413,
                        "created": "2017-07-07T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b5355b",
                        "refusalCount": 556,
                        "acceptanceCount": 564,
                        "created": "2017-07-11T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b5355a",
                        "refusalCount": 143,
                        "acceptanceCount": 231,
                        "created": "2017-07-09T04:00:00.000Z"
                    }
                ],
                "clicks": [
                    {
                        "_id": "59662f4406503e44a4b53559",
                        "count": 1172,
                        "created": "2017-06-24T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53558",
                        "count": 1722,
                        "created": "2017-06-26T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53557",
                        "count": 1379,
                        "created": "2017-06-25T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53556",
                        "count": 357,
                        "created": "2017-07-12T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53555",
                        "count": 1120,
                        "created": "2017-07-11T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53554",
                        "count": 651,
                        "created": "2017-07-10T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53553",
                        "count": 549,
                        "created": "2017-06-27T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53552",
                        "count": 702,
                        "created": "2017-07-07T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53551",
                        "count": 934,
                        "created": "2017-06-21T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53550",
                        "count": 1113,
                        "created": "2017-07-05T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b5354f",
                        "count": 554,
                        "created": "2017-06-20T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b5354e",
                        "count": 694,
                        "created": "2017-07-04T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b5354d",
                        "count": 1941,
                        "created": "2017-06-22T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b5354c",
                        "count": 851,
                        "created": "2017-07-06T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b5354b",
                        "count": 1252,
                        "created": "2017-06-23T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b5354a",
                        "count": 374,
                        "created": "2017-07-09T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53549",
                        "count": 445,
                        "created": "2017-07-08T04:00:00.000Z"
                    }
                ],
                "impressions": [
                    {
                        "_id": "59662f4406503e44a4b53548",
                        "count": 1169,
                        "created": "2017-06-24T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53547",
                        "count": 1729,
                        "created": "2017-06-26T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53546",
                        "count": 1383,
                        "created": "2017-06-25T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53545",
                        "count": 359,
                        "created": "2017-07-12T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53544",
                        "count": 1118,
                        "created": "2017-07-11T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53543",
                        "count": 652,
                        "created": "2017-07-10T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53542",
                        "count": 550,
                        "created": "2017-06-27T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53541",
                        "count": 699,
                        "created": "2017-07-07T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53540",
                        "count": 937,
                        "created": "2017-06-21T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b5353f",
                        "count": 1113,
                        "created": "2017-07-05T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b5353e",
                        "count": 556,
                        "created": "2017-06-20T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b5353d",
                        "count": 696,
                        "created": "2017-07-04T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b5353c",
                        "count": 1939,
                        "created": "2017-06-22T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b5353b",
                        "count": 852,
                        "created": "2017-07-06T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b5353a",
                        "count": 1251,
                        "created": "2017-06-23T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53539",
                        "count": 371,
                        "created": "2017-07-09T04:00:00.000Z"
                    },
                    {
                        "_id": "59662f4406503e44a4b53538",
                        "count": 445,
                        "created": "2017-07-08T04:00:00.000Z"
                    }
                ]
            },
            "mainQuestion": {
                "answerList": [
                    {
                        "_id": "594934b8c52c7b2d1b9f816d",
                        "answer": "Quero participar!",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "594934b8c52c7b2d1b9f816c",
                        "answer": "Não gosto de dividir minhas opiniões.",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "do_nothing"
                        }
                    }
                ],
                "description": "Teste produtos em casa e receba em troca prêmios e remunerações especiais",
                "title": "Participe de pesquisas e escolha você mesmo o que deseja ganhar! São prêmios de até 2600 reais!"
            },
            "delivery": {
                "type": "tb",
                "targetBlankUrl": "http://springmedia.go2cloud.org/aff_c?offer_id=750&aff_id=1208&aff_sub=balcao",
                "wsUrl": "http://springmedia.go2cloud.org/aff_c?offer_id=750&aff_id=1208&aff_sub=balcao",
                "isUploadImage": true,
                "smallImage": "http://cdn.the-ybox.tech/MDO_BR.png",
                "largeImage": "http://cdn.the-ybox.tech/MDO_BR.png",
                "birthDate": {
                    "isBirthDate": false,
                    "mask": ""
                },
                "gender": {
                    "isGender": false,
                    "valueFemale": "",
                    "valueMale": ""
                }
            },
            "links": {
                "addClick": {
                    "acceptance": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/594934b8c52c7b2d1b9f816b/stats/clicks?type=acceptance&affcode=gc"
                    },
                    "refusal": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/594934b8c52c7b2d1b9f816b/stats/clicks?type=refusal&affcode=gc"
                    }
                },
                "addImpresssion": {
                    "method": "POST",
                    "link": "http://yhall.the-ybox.tech/api/offer/594934b8c52c7b2d1b9f816b/stats/impressions?affcode=gc"
                },
                "getOffer": {
                    "method": "GET",
                    "link": "http://yhall.the-ybox.tech/api/offer/594934b8c52c7b2d1b9f816b"
                }
            }
        },
        {
            "_id": "58765b15ccb5333bb25306cc",
            "status": true,
            "name": "Conecta-i",
            "segmentation": {
                "isMobile": false,
                "isMale": false,
                "isFemale": false,
                "isDesktop": false,
                "forbiddenDomains": [],
                "dynamicSegmentation": [],
                "dddRegion": [],
                "age": {
                    "lessThan": 0,
                    "moreThan": 0
                }
            },
            "stats": {
                "acceptance": [
                    {
                        "_id": "595ac15fc177936eb5da94af",
                        "refusalCount": 155,
                        "acceptanceCount": 146,
                        "created": "2017-04-05T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94ae",
                        "refusalCount": 290,
                        "acceptanceCount": 492,
                        "created": "2017-04-08T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94ad",
                        "refusalCount": 182,
                        "acceptanceCount": 297,
                        "created": "2017-04-09T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94ac",
                        "refusalCount": 356,
                        "acceptanceCount": 664,
                        "created": "2017-04-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94ab",
                        "refusalCount": 117,
                        "acceptanceCount": 195,
                        "created": "2017-04-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94aa",
                        "refusalCount": 188,
                        "acceptanceCount": 287,
                        "created": "2017-05-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94a9",
                        "refusalCount": 258,
                        "acceptanceCount": 671,
                        "created": "2017-05-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94a8",
                        "refusalCount": 98,
                        "acceptanceCount": 390,
                        "created": "2017-05-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94a7",
                        "refusalCount": 0,
                        "acceptanceCount": 79,
                        "created": "2017-05-13T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94a6",
                        "refusalCount": 0,
                        "acceptanceCount": 69,
                        "created": "2017-05-14T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94a5",
                        "refusalCount": 533,
                        "acceptanceCount": 553,
                        "created": "2017-04-07T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94a4",
                        "refusalCount": 0,
                        "acceptanceCount": 196,
                        "created": "2017-05-16T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94a3",
                        "refusalCount": 0,
                        "acceptanceCount": 104,
                        "created": "2017-05-21T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94a2",
                        "refusalCount": 0,
                        "acceptanceCount": 126,
                        "created": "2017-05-23T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94a1",
                        "refusalCount": 360,
                        "acceptanceCount": 1189,
                        "created": "2017-07-03T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94a0",
                        "refusalCount": 0,
                        "acceptanceCount": 241,
                        "created": "2017-05-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da949f",
                        "refusalCount": 0,
                        "acceptanceCount": 121,
                        "created": "2017-05-26T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da949e",
                        "refusalCount": 0,
                        "acceptanceCount": 145,
                        "created": "2017-05-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da949d",
                        "refusalCount": 395,
                        "acceptanceCount": 1112,
                        "created": "2017-06-23T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da949c",
                        "refusalCount": 0,
                        "acceptanceCount": 56,
                        "created": "2017-05-27T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da949b",
                        "refusalCount": 0,
                        "acceptanceCount": 2,
                        "created": "2017-05-28T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da949a",
                        "refusalCount": 0,
                        "acceptanceCount": 53,
                        "created": "2017-05-29T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9499",
                        "refusalCount": 0,
                        "acceptanceCount": 69,
                        "created": "2017-05-30T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9498",
                        "refusalCount": 0,
                        "acceptanceCount": 271,
                        "created": "2017-06-02T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9497",
                        "refusalCount": 0,
                        "acceptanceCount": 138,
                        "created": "2017-05-19T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9496",
                        "refusalCount": 20,
                        "acceptanceCount": 145,
                        "created": "2017-07-01T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9495",
                        "refusalCount": 1,
                        "acceptanceCount": 185,
                        "created": "2017-06-04T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9494",
                        "refusalCount": 327,
                        "acceptanceCount": 586,
                        "created": "2017-04-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9493",
                        "refusalCount": 700,
                        "acceptanceCount": 3746,
                        "created": "2017-06-28T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9492",
                        "refusalCount": 50,
                        "acceptanceCount": 489,
                        "created": "2017-06-05T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9491",
                        "refusalCount": 367,
                        "acceptanceCount": 1338,
                        "created": "2017-06-20T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9490",
                        "refusalCount": 0,
                        "acceptanceCount": 84,
                        "created": "2017-05-20T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da948f",
                        "refusalCount": 491,
                        "acceptanceCount": 1438,
                        "created": "2017-06-08T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da948e",
                        "refusalCount": 294,
                        "acceptanceCount": 1344,
                        "created": "2017-06-07T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da948d",
                        "refusalCount": 0,
                        "acceptanceCount": 133,
                        "created": "2017-05-31T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da948c",
                        "refusalCount": 0,
                        "acceptanceCount": 372,
                        "created": "2017-06-03T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da948b",
                        "refusalCount": 104,
                        "acceptanceCount": 257,
                        "created": "2017-07-02T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da948a",
                        "refusalCount": 359,
                        "acceptanceCount": 1470,
                        "created": "2017-06-19T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9489",
                        "refusalCount": 356,
                        "acceptanceCount": 1757,
                        "created": "2017-06-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9488",
                        "refusalCount": 412,
                        "acceptanceCount": 2697,
                        "created": "2017-06-13T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9487",
                        "refusalCount": 169,
                        "acceptanceCount": 585,
                        "created": "2017-06-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9486",
                        "refusalCount": 0,
                        "acceptanceCount": 113,
                        "created": "2017-05-18T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9485",
                        "refusalCount": 0,
                        "acceptanceCount": 124,
                        "created": "2017-05-22T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9484",
                        "refusalCount": 386,
                        "acceptanceCount": 1822,
                        "created": "2017-06-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9483",
                        "refusalCount": 482,
                        "acceptanceCount": 2030,
                        "created": "2017-06-09T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9482",
                        "refusalCount": 284,
                        "acceptanceCount": 2588,
                        "created": "2017-06-14T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9481",
                        "refusalCount": 369,
                        "acceptanceCount": 1500,
                        "created": "2017-06-18T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9480",
                        "refusalCount": 182,
                        "acceptanceCount": 1852,
                        "created": "2017-06-15T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da947f",
                        "refusalCount": 0,
                        "acceptanceCount": 332,
                        "created": "2017-06-01T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da947e",
                        "refusalCount": 300,
                        "acceptanceCount": 1489,
                        "created": "2017-06-16T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da947d",
                        "refusalCount": 686,
                        "acceptanceCount": 3367,
                        "created": "2017-06-27T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da947c",
                        "refusalCount": 302,
                        "acceptanceCount": 1489,
                        "created": "2017-06-17T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da947b",
                        "refusalCount": 155,
                        "acceptanceCount": 1066,
                        "created": "2017-06-06T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da947a",
                        "refusalCount": 369,
                        "acceptanceCount": 2225,
                        "created": "2017-06-29T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9479",
                        "refusalCount": 628,
                        "acceptanceCount": 1859,
                        "created": "2017-06-22T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9478",
                        "refusalCount": 348,
                        "acceptanceCount": 1122,
                        "created": "2017-06-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9477",
                        "refusalCount": 19,
                        "acceptanceCount": 139,
                        "created": "2017-06-30T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9476",
                        "refusalCount": 460,
                        "acceptanceCount": 2513,
                        "created": "2017-06-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9475",
                        "refusalCount": 597,
                        "acceptanceCount": 3499,
                        "created": "2017-06-26T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9474",
                        "refusalCount": 0,
                        "acceptanceCount": 91,
                        "created": "2017-05-17T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9473",
                        "refusalCount": 279,
                        "acceptanceCount": 1174,
                        "created": "2017-06-21T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9472",
                        "refusalCount": 0,
                        "acceptanceCount": 115,
                        "created": "2017-05-15T04:00:00.000Z"
                    }
                ],
                "clicks": [
                    {
                        "_id": "595ac15fc177936eb5da9471",
                        "count": 1086,
                        "created": "2017-04-07T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9470",
                        "count": 782,
                        "created": "2017-04-08T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da946f",
                        "count": 479,
                        "created": "2017-04-09T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da946e",
                        "count": 913,
                        "created": "2017-04-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da946d",
                        "count": 312,
                        "created": "2017-04-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da946c",
                        "count": 929,
                        "created": "2017-05-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da946b",
                        "count": 138,
                        "created": "2017-05-19T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da946a",
                        "count": 196,
                        "created": "2017-05-16T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9469",
                        "count": 104,
                        "created": "2017-05-21T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9468",
                        "count": 301,
                        "created": "2017-04-05T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9467",
                        "count": 539,
                        "created": "2017-06-05T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9466",
                        "count": 124,
                        "created": "2017-05-22T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9465",
                        "count": 53,
                        "created": "2017-05-29T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9464",
                        "count": 2,
                        "created": "2017-05-28T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9463",
                        "count": 133,
                        "created": "2017-05-31T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9462",
                        "count": 475,
                        "created": "2017-05-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9461",
                        "count": 332,
                        "created": "2017-06-01T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9460",
                        "count": 113,
                        "created": "2017-05-18T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da945f",
                        "count": 121,
                        "created": "2017-05-26T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da945e",
                        "count": 1705,
                        "created": "2017-06-20T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da945d",
                        "count": 1453,
                        "created": "2017-06-21T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da945c",
                        "count": 372,
                        "created": "2017-06-03T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da945b",
                        "count": 1929,
                        "created": "2017-06-08T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da945a",
                        "count": 488,
                        "created": "2017-05-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9459",
                        "count": 69,
                        "created": "2017-05-30T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9458",
                        "count": 2512,
                        "created": "2017-06-09T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9457",
                        "count": 1020,
                        "created": "2017-04-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9456",
                        "count": 79,
                        "created": "2017-05-13T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9455",
                        "count": 2113,
                        "created": "2017-06-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9454",
                        "count": 2208,
                        "created": "2017-06-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9453",
                        "count": 165,
                        "created": "2017-07-01T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9452",
                        "count": 91,
                        "created": "2017-05-17T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9451",
                        "count": 2594,
                        "created": "2017-06-29T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9450",
                        "count": 158,
                        "created": "2017-06-30T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da944f",
                        "count": 754,
                        "created": "2017-06-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da944e",
                        "count": 186,
                        "created": "2017-06-04T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da944d",
                        "count": 2872,
                        "created": "2017-06-14T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da944c",
                        "count": 2034,
                        "created": "2017-06-15T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da944b",
                        "count": 241,
                        "created": "2017-05-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da944a",
                        "count": 1789,
                        "created": "2017-06-16T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9449",
                        "count": 1791,
                        "created": "2017-06-17T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9448",
                        "count": 1221,
                        "created": "2017-06-06T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9447",
                        "count": 361,
                        "created": "2017-07-02T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9446",
                        "count": 145,
                        "created": "2017-05-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9445",
                        "count": 56,
                        "created": "2017-05-27T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9444",
                        "count": 1869,
                        "created": "2017-06-18T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9443",
                        "count": 1829,
                        "created": "2017-06-19T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9442",
                        "count": 69,
                        "created": "2017-05-14T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9441",
                        "count": 1507,
                        "created": "2017-06-23T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9440",
                        "count": 1470,
                        "created": "2017-06-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da943f",
                        "count": 1638,
                        "created": "2017-06-07T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da943e",
                        "count": 2487,
                        "created": "2017-06-22T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da943d",
                        "count": 1549,
                        "created": "2017-07-03T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da943c",
                        "count": 3109,
                        "created": "2017-06-13T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da943b",
                        "count": 271,
                        "created": "2017-06-02T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da943a",
                        "count": 4053,
                        "created": "2017-06-27T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9439",
                        "count": 2973,
                        "created": "2017-06-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9438",
                        "count": 126,
                        "created": "2017-05-23T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9437",
                        "count": 84,
                        "created": "2017-05-20T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9436",
                        "count": 4096,
                        "created": "2017-06-26T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9435",
                        "count": 115,
                        "created": "2017-05-15T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9434",
                        "count": 4446,
                        "created": "2017-06-28T04:00:00.000Z"
                    }
                ],
                "impressions": []
            },
            "mainQuestion": {
                "answerList": [
                    {
                        "_id": "58765b15ccb5333bb25306cd",
                        "answer": "Quero tentar ganhar prêmios !",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "58e4d4f3ec5f4324a28238e3",
                        "answer": "Adoro pesquisas e adoro ganhar prêmios",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "58e4d4f3ec5f4324a28238e2",
                        "answer": "Continua não gostando de ganhar prêmios nem de pesquisas",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "do_nothing"
                        }
                    }
                ],
                "description": "Responda a uma pequena pesquisa e ganhe prêmios!",
                "title": "Gostaria de testar ainda mais produtos que ainda não foram lançados no mercado?"
            },
            "delivery": {
                "type": "tb",
                "targetBlankUrl": "http://springmedia.go2cloud.org/aff_c?offer_id=984&aff_id=1208&aff_sub=question",
                "wsUrl": "http://springmedia.go2cloud.org/aff_c?offer_id=984&aff_id=1208&aff_sub=question",
                "isUploadImage": true,
                "smallImage": "http://cdn.the-ybox.tech/banner isurvey.jpg",
                "largeImage": "http://cdn.the-ybox.tech/banner isurvey.jpg",
                "birthDate": {
                    "isBirthDate": false,
                    "mask": ""
                },
                "gender": {
                    "isGender": false,
                    "valueFemale": "",
                    "valueMale": ""
                }
            },
            "links": {
                "addClick": {
                    "acceptance": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/58765b15ccb5333bb25306cc/stats/clicks?type=acceptance&affcode=gc"
                    },
                    "refusal": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/58765b15ccb5333bb25306cc/stats/clicks?type=refusal&affcode=gc"
                    }
                },
                "addImpresssion": {
                    "method": "POST",
                    "link": "http://yhall.the-ybox.tech/api/offer/58765b15ccb5333bb25306cc/stats/impressions?affcode=gc"
                },
                "getOffer": {
                    "method": "GET",
                    "link": "http://yhall.the-ybox.tech/api/offer/58765b15ccb5333bb25306cc"
                }
            }
        },
        {
            "_id": "58887c08ccb5333bb25306f1",
            "status": true,
            "name": "Sam's Club",
            "segmentation": {
                "isMobile": false,
                "isMale": false,
                "isFemale": false,
                "isDesktop": false,
                "forbiddenDomains": [],
                "dynamicSegmentation": [],
                "dddRegion": [
                    "11",
                    "61",
                    "19",
                    "31",
                    "41",
                    "85",
                    "62",
                    "21",
                    "82",
                    "84",
                    "51",
                    "81",
                    "16",
                    "71",
                    "12",
                    "27"
                ],
                "age": {
                    "lessThan": 0,
                    "moreThan": 0
                }
            },
            "stats": {
                "acceptance": [],
                "clicks": [
                    {
                        "_id": "59557d8f14655b06d684ed4e",
                        "count": 0,
                        "created": "2017-06-29T22:22:05.711Z"
                    }
                ],
                "impressions": [
                    {
                        "_id": "59557d8f14655b06d684ed4d",
                        "count": 0,
                        "created": "2017-06-29T22:22:05.711Z"
                    }
                ]
            },
            "mainQuestion": {
                "answerList": [
                    {
                        "_id": "58887c08ccb5333bb25306f4",
                        "answer": "Quero Fazer parte desse club bem legal",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "58887c08ccb5333bb25306f3",
                        "answer": "Não sei se quero fazer parte, mas quero saber mais",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "58887c08ccb5333bb25306f2",
                        "answer": "Não quero receber esse brinde, nem ser socio",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "do_nothing"
                        }
                    }
                ],
                "description": "Preencha seus dados corretamente para gerar um voucher! Aproveite",
                "title": "Faça parte do Sam's Club e conheça os benefícios."
            },
            "delivery": {
                "type": "tb",
                "targetBlankUrl": "http://actualzoom.com/click.php?aspid=f30726524c028da5faba88cc258410ab",
                "wsUrl": "http://actualzoom.com/click.php?aspid=f30726524c028da5faba88cc258410ab",
                "isUploadImage": true,
                "smallImage": "http://cdn.the-ybox.tech/banner-SamsClub-300x250px.jpg",
                "largeImage": "http://cdn.the-ybox.tech/banner-SamsClub-300x250px.jpg",
                "birthDate": {
                    "isBirthDate": false,
                    "mask": ""
                },
                "gender": {
                    "isGender": false,
                    "valueFemale": "",
                    "valueMale": ""
                }
            },
            "links": {
                "addClick": {
                    "acceptance": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/58887c08ccb5333bb25306f1/stats/clicks?type=acceptance&affcode=gc"
                    },
                    "refusal": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/58887c08ccb5333bb25306f1/stats/clicks?type=refusal&affcode=gc"
                    }
                },
                "addImpresssion": {
                    "method": "POST",
                    "link": "http://yhall.the-ybox.tech/api/offer/58887c08ccb5333bb25306f1/stats/impressions?affcode=gc"
                },
                "getOffer": {
                    "method": "GET",
                    "link": "http://yhall.the-ybox.tech/api/offer/58887c08ccb5333bb25306f1"
                }
            }
        },
        {
            "_id": "58765b56ccb5333bb25306e8",
            "status": true,
            "name": "English Live",
            "segmentation": {
                "isMobile": false,
                "isMale": false,
                "isFemale": false,
                "isDesktop": false,
                "forbiddenDomains": [],
                "dynamicSegmentation": [],
                "dddRegion": [],
                "age": {
                    "lessThan": 0,
                    "moreThan": 0
                }
            },
            "stats": {
                "acceptance": [
                    {
                        "_id": "595ac166c177936eb5da95b4",
                        "refusalCount": 1320,
                        "acceptanceCount": 418,
                        "created": "2017-04-05T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da95b3",
                        "refusalCount": 855,
                        "acceptanceCount": 719,
                        "created": "2017-04-06T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da95b2",
                        "refusalCount": 505,
                        "acceptanceCount": 238,
                        "created": "2017-04-08T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da95b1",
                        "refusalCount": 321,
                        "acceptanceCount": 256,
                        "created": "2017-04-09T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da95b0",
                        "refusalCount": 591,
                        "acceptanceCount": 390,
                        "created": "2017-04-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da95af",
                        "refusalCount": 645,
                        "acceptanceCount": 538,
                        "created": "2017-04-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da95ae",
                        "refusalCount": 577,
                        "acceptanceCount": 513,
                        "created": "2017-04-14T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da95ad",
                        "refusalCount": 450,
                        "acceptanceCount": 279,
                        "created": "2017-04-13T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da95ac",
                        "refusalCount": 1426,
                        "acceptanceCount": 763,
                        "created": "2017-04-15T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da95ab",
                        "refusalCount": 2256,
                        "acceptanceCount": 2519,
                        "created": "2017-04-17T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da95aa",
                        "refusalCount": 1163,
                        "acceptanceCount": 553,
                        "created": "2017-04-16T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da95a9",
                        "refusalCount": 1343,
                        "acceptanceCount": 714,
                        "created": "2017-04-19T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da95a8",
                        "refusalCount": 845,
                        "acceptanceCount": 446,
                        "created": "2017-04-20T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da95a7",
                        "refusalCount": 523,
                        "acceptanceCount": 285,
                        "created": "2017-04-22T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da95a6",
                        "refusalCount": 525,
                        "acceptanceCount": 302,
                        "created": "2017-04-21T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da95a5",
                        "refusalCount": 424,
                        "acceptanceCount": 275,
                        "created": "2017-04-23T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da95a4",
                        "refusalCount": 1131,
                        "acceptanceCount": 578,
                        "created": "2017-04-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da95a3",
                        "refusalCount": 499,
                        "acceptanceCount": 746,
                        "created": "2017-04-30T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da95a2",
                        "refusalCount": 1155,
                        "acceptanceCount": 608,
                        "created": "2017-04-26T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da95a1",
                        "refusalCount": 979,
                        "acceptanceCount": 390,
                        "created": "2017-07-03T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da95a0",
                        "refusalCount": 462,
                        "acceptanceCount": 1004,
                        "created": "2017-05-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da959f",
                        "refusalCount": 664,
                        "acceptanceCount": 669,
                        "created": "2017-05-17T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da959e",
                        "refusalCount": 824,
                        "acceptanceCount": 633,
                        "created": "2017-04-27T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da959d",
                        "refusalCount": 1067,
                        "acceptanceCount": 383,
                        "created": "2017-04-07T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da959c",
                        "refusalCount": 1870,
                        "acceptanceCount": 2329,
                        "created": "2017-06-27T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da959b",
                        "refusalCount": 620,
                        "acceptanceCount": 906,
                        "created": "2017-04-28T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da959a",
                        "refusalCount": 470,
                        "acceptanceCount": 728,
                        "created": "2017-05-01T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9599",
                        "refusalCount": 745,
                        "acceptanceCount": 860,
                        "created": "2017-05-16T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9598",
                        "refusalCount": 1055,
                        "acceptanceCount": 947,
                        "created": "2017-05-04T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9597",
                        "refusalCount": 492,
                        "acceptanceCount": 927,
                        "created": "2017-05-02T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9596",
                        "refusalCount": 2295,
                        "acceptanceCount": 4282,
                        "created": "2017-04-18T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9595",
                        "refusalCount": 97,
                        "acceptanceCount": 40,
                        "created": "2017-06-30T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9594",
                        "refusalCount": 248,
                        "acceptanceCount": 79,
                        "created": "2017-07-02T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9593",
                        "refusalCount": 920,
                        "acceptanceCount": 1015,
                        "created": "2017-05-03T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9592",
                        "refusalCount": 971,
                        "acceptanceCount": 905,
                        "created": "2017-05-05T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9591",
                        "refusalCount": 687,
                        "acceptanceCount": 630,
                        "created": "2017-04-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9590",
                        "refusalCount": 781,
                        "acceptanceCount": 859,
                        "created": "2017-05-06T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da958f",
                        "refusalCount": 655,
                        "acceptanceCount": 547,
                        "created": "2017-05-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da958e",
                        "refusalCount": 941,
                        "acceptanceCount": 935,
                        "created": "2017-05-07T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da958d",
                        "refusalCount": 449,
                        "acceptanceCount": 791,
                        "created": "2017-04-29T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da958c",
                        "refusalCount": 412,
                        "acceptanceCount": 368,
                        "created": "2017-05-13T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da958b",
                        "refusalCount": 1203,
                        "acceptanceCount": 1129,
                        "created": "2017-05-08T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da958a",
                        "refusalCount": 435,
                        "acceptanceCount": 900,
                        "created": "2017-05-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9589",
                        "refusalCount": 1617,
                        "acceptanceCount": 439,
                        "created": "2017-04-04T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9588",
                        "refusalCount": 747,
                        "acceptanceCount": 1392,
                        "created": "2017-06-23T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9587",
                        "refusalCount": 501,
                        "acceptanceCount": 676,
                        "created": "2017-05-09T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9586",
                        "refusalCount": 435,
                        "acceptanceCount": 576,
                        "created": "2017-05-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9585",
                        "refusalCount": 671,
                        "acceptanceCount": 605,
                        "created": "2017-06-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9584",
                        "refusalCount": 913,
                        "acceptanceCount": 695,
                        "created": "2017-06-22T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9583",
                        "refusalCount": 729,
                        "acceptanceCount": 696,
                        "created": "2017-05-18T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9582",
                        "refusalCount": 847,
                        "acceptanceCount": 1304,
                        "created": "2017-06-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9581",
                        "refusalCount": 1117,
                        "acceptanceCount": 1457,
                        "created": "2017-06-26T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9580",
                        "refusalCount": 312,
                        "acceptanceCount": 376,
                        "created": "2017-05-14T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da957f",
                        "refusalCount": 1709,
                        "acceptanceCount": 1721,
                        "created": "2017-06-28T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da957e",
                        "refusalCount": 1087,
                        "acceptanceCount": 484,
                        "created": "2017-04-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da957d",
                        "refusalCount": 306,
                        "acceptanceCount": 417,
                        "created": "2017-05-19T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da957c",
                        "refusalCount": 517,
                        "acceptanceCount": 552,
                        "created": "2017-05-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da957b",
                        "refusalCount": 581,
                        "acceptanceCount": 546,
                        "created": "2017-05-15T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da957a",
                        "refusalCount": 1202,
                        "acceptanceCount": 1266,
                        "created": "2017-06-29T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9579",
                        "refusalCount": 102,
                        "acceptanceCount": 43,
                        "created": "2017-07-01T04:00:00.000Z"
                    }
                ],
                "clicks": [],
                "impressions": [
                    {
                        "_id": "595ac166c177936eb5da9578",
                        "count": 820,
                        "created": "2017-04-14T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9577",
                        "count": 1254,
                        "created": "2017-05-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9576",
                        "count": 858,
                        "created": "2017-04-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9575",
                        "count": 1352,
                        "created": "2017-05-18T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9574",
                        "count": 2977,
                        "created": "2017-04-18T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9573",
                        "count": 1532,
                        "created": "2017-04-16T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9572",
                        "count": 103,
                        "created": "2017-04-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9571",
                        "count": 719,
                        "created": "2017-05-13T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9570",
                        "count": 915,
                        "created": "2017-05-01T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da956f",
                        "count": 1912,
                        "created": "2017-04-15T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da956e",
                        "count": 1034,
                        "created": "2017-05-02T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da956d",
                        "count": 2923,
                        "created": "2017-04-17T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da956c",
                        "count": 1597,
                        "created": "2017-04-26T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da956b",
                        "count": 691,
                        "created": "2017-04-22T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da956a",
                        "count": 1807,
                        "created": "2017-04-19T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9569",
                        "count": 1232,
                        "created": "2017-04-27T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9568",
                        "count": 1394,
                        "created": "2017-04-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9567",
                        "count": 1132,
                        "created": "2017-04-20T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9566",
                        "count": 1003,
                        "created": "2017-04-30T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9565",
                        "count": 1144,
                        "created": "2017-04-28T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9564",
                        "count": 1885,
                        "created": "2017-05-08T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9563",
                        "count": 1568,
                        "created": "2017-04-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9562",
                        "count": 731,
                        "created": "2017-04-21T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9561",
                        "count": 1580,
                        "created": "2017-05-03T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9560",
                        "count": 1656,
                        "created": "2017-05-04T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da955f",
                        "count": 1454,
                        "created": "2017-05-05T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da955e",
                        "count": 1356,
                        "created": "2017-05-06T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da955d",
                        "count": 309,
                        "created": "2017-07-02T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da955c",
                        "count": 1106,
                        "created": "2017-05-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da955b",
                        "count": 1014,
                        "created": "2017-05-09T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da955a",
                        "count": 892,
                        "created": "2017-04-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9559",
                        "count": 663,
                        "created": "2017-04-13T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9558",
                        "count": 612,
                        "created": "2017-05-14T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9557",
                        "count": 2677,
                        "created": "2017-06-28T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9556",
                        "count": 1031,
                        "created": "2017-05-15T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9555",
                        "count": 637,
                        "created": "2017-05-19T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9554",
                        "count": 1231,
                        "created": "2017-05-16T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9553",
                        "count": 1678,
                        "created": "2017-06-29T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9552",
                        "count": 129,
                        "created": "2017-06-30T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9551",
                        "count": 1529,
                        "created": "2017-05-07T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9550",
                        "count": 134,
                        "created": "2017-07-01T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da954f",
                        "count": 1174,
                        "created": "2017-05-17T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da954e",
                        "count": 865,
                        "created": "2017-05-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da954d",
                        "count": 1449,
                        "created": "2017-06-22T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da954c",
                        "count": 1195,
                        "created": "2017-06-23T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da954b",
                        "count": 1147,
                        "created": "2017-06-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da954a",
                        "count": 779,
                        "created": "2017-05-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9549",
                        "count": 1020,
                        "created": "2017-05-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9548",
                        "count": 3009,
                        "created": "2017-06-27T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9547",
                        "count": 885,
                        "created": "2017-04-29T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9546",
                        "count": 1337,
                        "created": "2017-06-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9545",
                        "count": 1685,
                        "created": "2017-06-26T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9544",
                        "count": 597,
                        "created": "2017-04-23T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac166c177936eb5da9543",
                        "count": 1302,
                        "created": "2017-07-03T04:00:00.000Z"
                    }
                ]
            },
            "mainQuestion": {
                "answerList": [
                    {
                        "_id": "58765b56ccb5333bb25306e9",
                        "answer": "Quero saber mais",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "58889d83ccb5333bb25306f6",
                        "answer": "Quero ganhar 2 meses gratis",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "58889d83ccb5333bb25306f5",
                        "answer": "Ja sou bem fluente, não estou precisando",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "do_nothing"
                        }
                    }
                ],
                "description": "Junte-se aos 130 mil alunos no Brasil e garanta ainda seu PRÊMIO!",
                "title": "A English Live está dando cupons de desconto e 12 aulas grátis de curso de inglês!"
            },
            "delivery": {
                "type": "tb",
                "targetBlankUrl": "http://springmedia.go2cloud.org/aff_c?offer_id=246&aff_id=1208&url_id=9202",
                "wsUrl": "http://springmedia.go2cloud.org/aff_c?offer_id=246&aff_id=1208&url_id=9202",
                "isUploadImage": true,
                "smallImage": "http://cdn.the-ybox.tech/english live tata.png",
                "largeImage": "http://cdn.the-ybox.tech/english live tata.png",
                "birthDate": {
                    "isBirthDate": false,
                    "mask": ""
                },
                "gender": {
                    "isGender": false,
                    "valueFemale": "",
                    "valueMale": ""
                }
            },
            "links": {
                "addClick": {
                    "acceptance": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/58765b56ccb5333bb25306e8/stats/clicks?type=acceptance&affcode=gc"
                    },
                    "refusal": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/58765b56ccb5333bb25306e8/stats/clicks?type=refusal&affcode=gc"
                    }
                },
                "addImpresssion": {
                    "method": "POST",
                    "link": "http://yhall.the-ybox.tech/api/offer/58765b56ccb5333bb25306e8/stats/impressions?affcode=gc"
                },
                "getOffer": {
                    "method": "GET",
                    "link": "http://yhall.the-ybox.tech/api/offer/58765b56ccb5333bb25306e8"
                }
            }
        }
    ];


/*
,
        {
            "_id": "594934b8c52c7b2d1b9f816b",
            "status": true,
            "name": "Mundo de Opiniões",
            "segmentation": {
                "isMobile": false,
                "isMale": false,
                "isFemale": false,
                "isDesktop": false,
                "forbiddenDomains": [],
                "dynamicSegmentation": [],
                "dddRegion": [],
                "age": {
                    "lessThan": 0,
                    "moreThan": 0
                }
            },
            "mainQuestion": {
                "answerList": [
                    {
                        "_id": "594934b8c52c7b2d1b9f816d",
                        "answer": "Quero participar!",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "594934b8c52c7b2d1b9f816c",
                        "answer": "Não gosto de dividir minhas opiniões.",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "do_nothing"
                        }
                    }
                ],
                "description": "Teste produtos em casa e receba em troca prêmios e remunerações especiais",
                "title": "Participe de pesquisas e escolha você mesmo o que deseja ganhar! São prêmios de até 2600 reais!"
            },
            "delivery": {
                "type": "tb",
                "targetBlankUrl": "http://springmedia.go2cloud.org/aff_c?offer_id=750&aff_id=1208&aff_sub=survey",
                "wsUrl": "http://springmedia.go2cloud.org/aff_c?offer_id=750&aff_id=1208&aff_sub=survey",
                "isUploadImage": true,
                "smallImage": "http://cdn.the-ybox.tech/banner mundao.jpg",
                "largeImage": "http://cdn.the-ybox.tech/banner mundao.jpg",
                "birthDate": {
                    "isBirthDate": false,
                    "mask": ""
                },
                "gender": {
                    "isGender": false,
                    "valueFemale": "",
                    "valueMale": ""
                }
            },
            "links": {
                "addClick": {
                    "acceptance": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/594934b8c52c7b2d1b9f816b/stats/clicks?type=acceptance&affcode=gc"
                    },
                    "refusal": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/594934b8c52c7b2d1b9f816b/stats/clicks?type=refusal&affcode=gc"
                    }
                },
                "addImpresssion": {
                    "method": "POST",
                    "link": "http://yhall.the-ybox.tech/api/offer/594934b8c52c7b2d1b9f816b/stats/impressions?affcode=gc"
                },
                "getOffer": {
                    "method": "GET",
                    "link": "http://yhall.the-ybox.tech/api/offer/594934b8c52c7b2d1b9f816b"
                }
            }
        },
        {
            "_id": "58887c08ccb5333bb25306f1",
            "status": true,
            "name": "Sam's Club",
            "segmentation": {
                "isMobile": false,
                "isMale": false,
                "isFemale": false,
                "isDesktop": false,
                "forbiddenDomains": [],
                "dynamicSegmentation": [],
                "dddRegion": [
                    "11",
                    "61",
                    "19",
                    "31",
                    "41",
                    "85",
                    "62",
                    "21",
                    "82",
                    "84",
                    "51",
                    "81",
                    "16",
                    "71",
                    "12",
                    "27"
                ],
                "age": {
                    "lessThan": 0,
                    "moreThan": 0
                }
            },
            "stats": {
                "acceptance": [],
                "clicks": [
                    {
                        "_id": "59557d8f14655b06d684ed4e",
                        "count": 0,
                        "created": "2017-06-29T22:22:05.711Z"
                    }
                ],
                "impressions": [
                    {
                        "_id": "59557d8f14655b06d684ed4d",
                        "count": 0,
                        "created": "2017-06-29T22:22:05.711Z"
                    }
                ]
            },
            "mainQuestion": {
                "answerList": [
                    {
                        "_id": "58887c08ccb5333bb25306f4",
                        "answer": "Quero Fazer parte desse club bem legal",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "58887c08ccb5333bb25306f3",
                        "answer": "Não sei se quero fazer parte, mas quero saber mais",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "58887c08ccb5333bb25306f2",
                        "answer": "Não quero receber esse brinde, nem ser socio",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "do_nothing"
                        }
                    }
                ],
                "description": "Preencha seus dados corretamente para gerar um voucher! Aproveite",
                "title": "Faça parte do Sam's Club e conheça os benefícios."
            },
            "delivery": {
                "type": "tb",
                "targetBlankUrl": "http://actualzoom.com/click.php?aspid=f30726524c028da5faba88cc258410ab",
                "wsUrl": "http://actualzoom.com/click.php?aspid=f30726524c028da5faba88cc258410ab",
                "isUploadImage": true,
                "smallImage": "http://cdn.the-ybox.tech/banner-SamsClub-300x250px.jpg",
                "largeImage": "http://cdn.the-ybox.tech/banner-SamsClub-300x250px.jpg",
                "birthDate": {
                    "isBirthDate": false,
                    "mask": ""
                },
                "gender": {
                    "isGender": false,
                    "valueFemale": "",
                    "valueMale": ""
                }
            },
            "links": {
                "addClick": {
                    "acceptance": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/58887c08ccb5333bb25306f1/stats/clicks?type=acceptance&affcode=gc"
                    },
                    "refusal": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/58887c08ccb5333bb25306f1/stats/clicks?type=refusal&affcode=gc"
                    }
                },
                "addImpresssion": {
                    "method": "POST",
                    "link": "http://yhall.the-ybox.tech/api/offer/58887c08ccb5333bb25306f1/stats/impressions?affcode=gc"
                },
                "getOffer": {
                    "method": "GET",
                    "link": "http://yhall.the-ybox.tech/api/offer/58887c08ccb5333bb25306f1"
                }
            }
        },
        {
            "_id": "59f2f7851006b11e286b9894",
            "status": true,
            "name": "Cacau Show",
            "segmentation": {
                "isMobile": false,
                "isMale": false,
                "isFemale": false,
                "isDesktop": false,
                "forbiddenDomains": [],
                "dynamicSegmentation": [],
                "dddRegion": [],
                "age": {
                    "lessThan": 0,
                    "moreThan": 0
                }
            },
            "stats": {
                "acceptance": [],
                "clicks": [],
                "impressions": []
            },
            "mainQuestion": {
                "answerList": [
                    {
                        "_id": "59f2f7851006b11e286b9896",
                        "answer": "Eu quero ser um revendedor",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "59f2f7851006b11e286b9895",
                        "answer": "Não, obrigada (o)",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "do_nothing"
                        }
                    }
                ],
                "description": "",
                "title": "Cacau show apresenta: seja um revendedor da maior marca de chocolates do Brasil!"
            },
            "delivery": {
                "type": "tb",
                "targetBlankUrl": "http://ads.trackify.cc/aff_c?offer_id=2354&aff_id=1208&url_id=8908&aff_sub=survey",
                "wsUrl": "http://ads.trackify.cc/aff_c?offer_id=2354&aff_id=1208&url_id=8908&aff_sub=survey",
                "isUploadImage": false,
                "smallImage": "https://media.go2speed.org/brand/files/springmedia/2354/banner-cacaushow-300x250-a.jpg",
                "largeImage": "https://media.go2speed.org/brand/files/springmedia/2354/banner-cacaushow-300x250-a.jpg",
                "birthDate": {
                    "isBirthDate": false,
                    "mask": ""
                },
                "gender": {
                    "isGender": false,
                    "valueFemale": "",
                    "valueMale": ""
                }
            },
            "links": {
                "addClick": {
                    "acceptance": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/59f2f7851006b11e286b9894/stats/clicks?type=acceptance&affcode=gc"
                    },
                    "refusal": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/59f2f7851006b11e286b9894/stats/clicks?type=refusal&affcode=gc"
                    }
                },
                "addImpresssion": {
                    "method": "POST",
                    "link": "http://yhall.the-ybox.tech/api/offer/59f2f7851006b11e286b9894/stats/impressions?affcode=gc"
                },
                "getOffer": {
                    "method": "GET",
                    "link": "http://yhall.the-ybox.tech/api/offer/59f2f7851006b11e286b9894"
                }
            }
        },
        {
            "_id": "59e4874dcdad235be5b760c6",
            "status": true,
            "name": "Anhanguera Kindico",
            "segmentation": {
                "isMobile": false,
                "isMale": false,
                "isFemale": false,
                "isDesktop": false,
                "forbiddenDomains": [],
                "dynamicSegmentation": [],
                "dddRegion": [],
                "age": {
                    "lessThan": 0,
                    "moreThan": 0
                }
            },
            "stats": {
                "acceptance": [],
                "clicks": [],
                "impressions": []
            },
            "mainQuestion": {
                "answerList": [
                    {
                        "_id": "59e4874dcdad235be5b760c8",
                        "answer": "Eu quero saber mais",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "59e4874dcdad235be5b760c7",
                        "answer": "Eu não tenho interesse em estudar'",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "do_nothing"
                        }
                    }
                ],
                "description": "",
                "title": "A Anhanguera está oferecendo os melhores cursos, com direito a bolsa de estudos."
            },
            "delivery": {
                "type": "tb",
                "targetBlankUrl": "http://kindico.go2cloud.org/aff_c?offer_id=414&aff_id=1093&file_id=1324&aff_sub=survey",
                "wsUrl": "http://kindico.go2cloud.org/aff_c?offer_id=414&aff_id=1093&file_id=1324&aff_sub=survey",
                "isUploadImage": true,
                "smallImage": "http://cdn.the-ybox.tech/300x250_2_resize.jpg",
                "largeImage": "http://cdn.the-ybox.tech/300x250_2_resize.jpg",
                "birthDate": {
                    "isBirthDate": false,
                    "mask": ""
                },
                "gender": {
                    "isGender": false,
                    "valueFemale": "",
                    "valueMale": ""
                }
            },
            "links": {
                "addClick": {
                    "acceptance": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/59e4874dcdad235be5b760c6/stats/clicks?type=acceptance&affcode=gc"
                    },
                    "refusal": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/59e4874dcdad235be5b760c6/stats/clicks?type=refusal&affcode=gc"
                    }
                },
                "addImpresssion": {
                    "method": "POST",
                    "link": "http://yhall.the-ybox.tech/api/offer/59e4874dcdad235be5b760c6/stats/impressions?affcode=gc"
                },
                "getOffer": {
                    "method": "GET",
                    "link": "http://yhall.the-ybox.tech/api/offer/59e4874dcdad235be5b760c6"
                }
            }
        },
        {
            "_id": "58765b15ccb5333bb25306cc",
            "status": true,
            "name": "Conecta-i",
            "segmentation": {
                "isMobile": false,
                "isMale": false,
                "isFemale": false,
                "isDesktop": false,
                "forbiddenDomains": [],
                "dynamicSegmentation": [],
                "dddRegion": [],
                "age": {
                    "lessThan": 0,
                    "moreThan": 0
                }
            },
            "stats": {
                "acceptance": [
                    {
                        "_id": "595ac15fc177936eb5da94af",
                        "refusalCount": 155,
                        "acceptanceCount": 146,
                        "created": "2017-04-05T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94ae",
                        "refusalCount": 290,
                        "acceptanceCount": 492,
                        "created": "2017-04-08T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94ad",
                        "refusalCount": 182,
                        "acceptanceCount": 297,
                        "created": "2017-04-09T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94ac",
                        "refusalCount": 356,
                        "acceptanceCount": 664,
                        "created": "2017-04-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94ab",
                        "refusalCount": 117,
                        "acceptanceCount": 195,
                        "created": "2017-04-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94aa",
                        "refusalCount": 188,
                        "acceptanceCount": 287,
                        "created": "2017-05-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94a9",
                        "refusalCount": 258,
                        "acceptanceCount": 671,
                        "created": "2017-05-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94a8",
                        "refusalCount": 98,
                        "acceptanceCount": 390,
                        "created": "2017-05-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94a7",
                        "refusalCount": 0,
                        "acceptanceCount": 79,
                        "created": "2017-05-13T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94a6",
                        "refusalCount": 0,
                        "acceptanceCount": 69,
                        "created": "2017-05-14T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94a5",
                        "refusalCount": 533,
                        "acceptanceCount": 553,
                        "created": "2017-04-07T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94a4",
                        "refusalCount": 0,
                        "acceptanceCount": 196,
                        "created": "2017-05-16T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94a3",
                        "refusalCount": 0,
                        "acceptanceCount": 104,
                        "created": "2017-05-21T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94a2",
                        "refusalCount": 0,
                        "acceptanceCount": 126,
                        "created": "2017-05-23T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94a1",
                        "refusalCount": 360,
                        "acceptanceCount": 1189,
                        "created": "2017-07-03T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da94a0",
                        "refusalCount": 0,
                        "acceptanceCount": 241,
                        "created": "2017-05-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da949f",
                        "refusalCount": 0,
                        "acceptanceCount": 121,
                        "created": "2017-05-26T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da949e",
                        "refusalCount": 0,
                        "acceptanceCount": 145,
                        "created": "2017-05-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da949d",
                        "refusalCount": 395,
                        "acceptanceCount": 1112,
                        "created": "2017-06-23T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da949c",
                        "refusalCount": 0,
                        "acceptanceCount": 56,
                        "created": "2017-05-27T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da949b",
                        "refusalCount": 0,
                        "acceptanceCount": 2,
                        "created": "2017-05-28T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da949a",
                        "refusalCount": 0,
                        "acceptanceCount": 53,
                        "created": "2017-05-29T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9499",
                        "refusalCount": 0,
                        "acceptanceCount": 69,
                        "created": "2017-05-30T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9498",
                        "refusalCount": 0,
                        "acceptanceCount": 271,
                        "created": "2017-06-02T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9497",
                        "refusalCount": 0,
                        "acceptanceCount": 138,
                        "created": "2017-05-19T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9496",
                        "refusalCount": 20,
                        "acceptanceCount": 145,
                        "created": "2017-07-01T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9495",
                        "refusalCount": 1,
                        "acceptanceCount": 185,
                        "created": "2017-06-04T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9494",
                        "refusalCount": 327,
                        "acceptanceCount": 586,
                        "created": "2017-04-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9493",
                        "refusalCount": 700,
                        "acceptanceCount": 3746,
                        "created": "2017-06-28T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9492",
                        "refusalCount": 50,
                        "acceptanceCount": 489,
                        "created": "2017-06-05T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9491",
                        "refusalCount": 367,
                        "acceptanceCount": 1338,
                        "created": "2017-06-20T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9490",
                        "refusalCount": 0,
                        "acceptanceCount": 84,
                        "created": "2017-05-20T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da948f",
                        "refusalCount": 491,
                        "acceptanceCount": 1438,
                        "created": "2017-06-08T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da948e",
                        "refusalCount": 294,
                        "acceptanceCount": 1344,
                        "created": "2017-06-07T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da948d",
                        "refusalCount": 0,
                        "acceptanceCount": 133,
                        "created": "2017-05-31T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da948c",
                        "refusalCount": 0,
                        "acceptanceCount": 372,
                        "created": "2017-06-03T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da948b",
                        "refusalCount": 104,
                        "acceptanceCount": 257,
                        "created": "2017-07-02T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da948a",
                        "refusalCount": 359,
                        "acceptanceCount": 1470,
                        "created": "2017-06-19T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9489",
                        "refusalCount": 356,
                        "acceptanceCount": 1757,
                        "created": "2017-06-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9488",
                        "refusalCount": 412,
                        "acceptanceCount": 2697,
                        "created": "2017-06-13T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9487",
                        "refusalCount": 169,
                        "acceptanceCount": 585,
                        "created": "2017-06-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9486",
                        "refusalCount": 0,
                        "acceptanceCount": 113,
                        "created": "2017-05-18T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9485",
                        "refusalCount": 0,
                        "acceptanceCount": 124,
                        "created": "2017-05-22T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9484",
                        "refusalCount": 386,
                        "acceptanceCount": 1822,
                        "created": "2017-06-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9483",
                        "refusalCount": 482,
                        "acceptanceCount": 2030,
                        "created": "2017-06-09T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9482",
                        "refusalCount": 284,
                        "acceptanceCount": 2588,
                        "created": "2017-06-14T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9481",
                        "refusalCount": 369,
                        "acceptanceCount": 1500,
                        "created": "2017-06-18T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9480",
                        "refusalCount": 182,
                        "acceptanceCount": 1852,
                        "created": "2017-06-15T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da947f",
                        "refusalCount": 0,
                        "acceptanceCount": 332,
                        "created": "2017-06-01T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da947e",
                        "refusalCount": 300,
                        "acceptanceCount": 1489,
                        "created": "2017-06-16T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da947d",
                        "refusalCount": 686,
                        "acceptanceCount": 3367,
                        "created": "2017-06-27T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da947c",
                        "refusalCount": 302,
                        "acceptanceCount": 1489,
                        "created": "2017-06-17T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da947b",
                        "refusalCount": 155,
                        "acceptanceCount": 1066,
                        "created": "2017-06-06T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da947a",
                        "refusalCount": 369,
                        "acceptanceCount": 2225,
                        "created": "2017-06-29T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9479",
                        "refusalCount": 628,
                        "acceptanceCount": 1859,
                        "created": "2017-06-22T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9478",
                        "refusalCount": 348,
                        "acceptanceCount": 1122,
                        "created": "2017-06-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9477",
                        "refusalCount": 19,
                        "acceptanceCount": 139,
                        "created": "2017-06-30T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9476",
                        "refusalCount": 460,
                        "acceptanceCount": 2513,
                        "created": "2017-06-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9475",
                        "refusalCount": 597,
                        "acceptanceCount": 3499,
                        "created": "2017-06-26T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9474",
                        "refusalCount": 0,
                        "acceptanceCount": 91,
                        "created": "2017-05-17T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9473",
                        "refusalCount": 279,
                        "acceptanceCount": 1174,
                        "created": "2017-06-21T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9472",
                        "refusalCount": 0,
                        "acceptanceCount": 115,
                        "created": "2017-05-15T04:00:00.000Z"
                    }
                ],
                "clicks": [
                    {
                        "_id": "595ac15fc177936eb5da9471",
                        "count": 1086,
                        "created": "2017-04-07T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9470",
                        "count": 782,
                        "created": "2017-04-08T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da946f",
                        "count": 479,
                        "created": "2017-04-09T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da946e",
                        "count": 913,
                        "created": "2017-04-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da946d",
                        "count": 312,
                        "created": "2017-04-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da946c",
                        "count": 929,
                        "created": "2017-05-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da946b",
                        "count": 138,
                        "created": "2017-05-19T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da946a",
                        "count": 196,
                        "created": "2017-05-16T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9469",
                        "count": 104,
                        "created": "2017-05-21T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9468",
                        "count": 301,
                        "created": "2017-04-05T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9467",
                        "count": 539,
                        "created": "2017-06-05T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9466",
                        "count": 124,
                        "created": "2017-05-22T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9465",
                        "count": 53,
                        "created": "2017-05-29T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9464",
                        "count": 2,
                        "created": "2017-05-28T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9463",
                        "count": 133,
                        "created": "2017-05-31T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9462",
                        "count": 475,
                        "created": "2017-05-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9461",
                        "count": 332,
                        "created": "2017-06-01T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9460",
                        "count": 113,
                        "created": "2017-05-18T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da945f",
                        "count": 121,
                        "created": "2017-05-26T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da945e",
                        "count": 1705,
                        "created": "2017-06-20T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da945d",
                        "count": 1453,
                        "created": "2017-06-21T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da945c",
                        "count": 372,
                        "created": "2017-06-03T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da945b",
                        "count": 1929,
                        "created": "2017-06-08T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da945a",
                        "count": 488,
                        "created": "2017-05-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9459",
                        "count": 69,
                        "created": "2017-05-30T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9458",
                        "count": 2512,
                        "created": "2017-06-09T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9457",
                        "count": 1020,
                        "created": "2017-04-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9456",
                        "count": 79,
                        "created": "2017-05-13T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9455",
                        "count": 2113,
                        "created": "2017-06-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9454",
                        "count": 2208,
                        "created": "2017-06-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9453",
                        "count": 165,
                        "created": "2017-07-01T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9452",
                        "count": 91,
                        "created": "2017-05-17T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9451",
                        "count": 2594,
                        "created": "2017-06-29T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9450",
                        "count": 158,
                        "created": "2017-06-30T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da944f",
                        "count": 754,
                        "created": "2017-06-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da944e",
                        "count": 186,
                        "created": "2017-06-04T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da944d",
                        "count": 2872,
                        "created": "2017-06-14T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da944c",
                        "count": 2034,
                        "created": "2017-06-15T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da944b",
                        "count": 241,
                        "created": "2017-05-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da944a",
                        "count": 1789,
                        "created": "2017-06-16T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9449",
                        "count": 1791,
                        "created": "2017-06-17T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9448",
                        "count": 1221,
                        "created": "2017-06-06T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9447",
                        "count": 361,
                        "created": "2017-07-02T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9446",
                        "count": 145,
                        "created": "2017-05-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9445",
                        "count": 56,
                        "created": "2017-05-27T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9444",
                        "count": 1869,
                        "created": "2017-06-18T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9443",
                        "count": 1829,
                        "created": "2017-06-19T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9442",
                        "count": 69,
                        "created": "2017-05-14T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9441",
                        "count": 1507,
                        "created": "2017-06-23T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9440",
                        "count": 1470,
                        "created": "2017-06-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da943f",
                        "count": 1638,
                        "created": "2017-06-07T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da943e",
                        "count": 2487,
                        "created": "2017-06-22T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da943d",
                        "count": 1549,
                        "created": "2017-07-03T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da943c",
                        "count": 3109,
                        "created": "2017-06-13T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da943b",
                        "count": 271,
                        "created": "2017-06-02T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da943a",
                        "count": 4053,
                        "created": "2017-06-27T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9439",
                        "count": 2973,
                        "created": "2017-06-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9438",
                        "count": 126,
                        "created": "2017-05-23T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9437",
                        "count": 84,
                        "created": "2017-05-20T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9436",
                        "count": 4096,
                        "created": "2017-06-26T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9435",
                        "count": 115,
                        "created": "2017-05-15T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac15fc177936eb5da9434",
                        "count": 4446,
                        "created": "2017-06-28T04:00:00.000Z"
                    }
                ],
                "impressions": []
            },
            "mainQuestion": {
                "answerList": [
                    {
                        "_id": "58765b15ccb5333bb25306cd",
                        "answer": "Quero tentar ganhar prêmios !",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "58e4d4f3ec5f4324a28238e3",
                        "answer": "Adoro pesquisas e adoro ganhar prêmios",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "58e4d4f3ec5f4324a28238e2",
                        "answer": "Continua não gostando de ganhar prêmios nem de pesquisas",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "do_nothing"
                        }
                    }
                ],
                "description": "Responda a uma pequena pesquisa e ganhe prêmios!",
                "title": "Gostaria de testar ainda mais produtos que ainda não foram lançados no mercado?"
            },
            "delivery": {
                "type": "tb",
                "targetBlankUrl": "http://springmedia.go2cloud.org/aff_c?offer_id=984&aff_id=1208&aff_sub=survey",
                "wsUrl": "http://springmedia.go2cloud.org/aff_c?offer_id=984&aff_id=1208&aff_sub=survey",
                "isUploadImage": true,
                "smallImage": "http://cdn.the-ybox.tech/banner livra.png",
                "largeImage": "http://cdn.the-ybox.tech/banner livra.png",
                "birthDate": {
                    "isBirthDate": false,
                    "mask": ""
                },
                "gender": {
                    "isGender": false,
                    "valueFemale": "",
                    "valueMale": ""
                }
            },
            "links": {
                "addClick": {
                    "acceptance": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/58765b15ccb5333bb25306cc/stats/clicks?type=acceptance&affcode=gc"
                    },
                    "refusal": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/58765b15ccb5333bb25306cc/stats/clicks?type=refusal&affcode=gc"
                    }
                },
                "addImpresssion": {
                    "method": "POST",
                    "link": "http://yhall.the-ybox.tech/api/offer/58765b15ccb5333bb25306cc/stats/impressions?affcode=gc"
                },
                "getOffer": {
                    "method": "GET",
                    "link": "http://yhall.the-ybox.tech/api/offer/58765b15ccb5333bb25306cc"
                }
            }
        },
        {
            "_id": "58e5fb3527b4835a906b38f0",
            "status": true,
            "name": "Natura FND",
            "segmentation": {
                "isMobile": false,
                "isMale": false,
                "isFemale": false,
                "isDesktop": false,
                "forbiddenDomains": [],
                "dynamicSegmentation": [],
                "dddRegion": [],
                "age": {
                    "lessThan": 0,
                    "moreThan": 0
                }
            },
            "stats": {
                "acceptance": [
                    {
                        "_id": "595ac16ac177936eb5da96ac",
                        "refusalCount": 455,
                        "acceptanceCount": 137,
                        "created": "2017-04-06T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da96ab",
                        "refusalCount": 978,
                        "acceptanceCount": 357,
                        "created": "2017-04-07T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da96aa",
                        "refusalCount": 438,
                        "acceptanceCount": 222,
                        "created": "2017-04-08T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da96a9",
                        "refusalCount": 315,
                        "acceptanceCount": 137,
                        "created": "2017-04-09T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da96a8",
                        "refusalCount": 575,
                        "acceptanceCount": 229,
                        "created": "2017-04-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da96a7",
                        "refusalCount": 639,
                        "acceptanceCount": 250,
                        "created": "2017-04-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da96a6",
                        "refusalCount": 572,
                        "acceptanceCount": 296,
                        "created": "2017-04-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da96a5",
                        "refusalCount": 407,
                        "acceptanceCount": 252,
                        "created": "2017-04-13T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da96a4",
                        "refusalCount": 536,
                        "acceptanceCount": 284,
                        "created": "2017-04-14T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da96a3",
                        "refusalCount": 1336,
                        "acceptanceCount": 581,
                        "created": "2017-04-15T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da96a2",
                        "refusalCount": 1051,
                        "acceptanceCount": 485,
                        "created": "2017-04-16T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da96a1",
                        "refusalCount": 2100,
                        "acceptanceCount": 825,
                        "created": "2017-04-17T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da96a0",
                        "refusalCount": 1252,
                        "acceptanceCount": 547,
                        "created": "2017-04-19T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da969f",
                        "refusalCount": 772,
                        "acceptanceCount": 364,
                        "created": "2017-04-20T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da969e",
                        "refusalCount": 490,
                        "acceptanceCount": 202,
                        "created": "2017-04-22T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da969d",
                        "refusalCount": 484,
                        "acceptanceCount": 250,
                        "created": "2017-04-21T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da969c",
                        "refusalCount": 397,
                        "acceptanceCount": 200,
                        "created": "2017-04-23T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da969b",
                        "refusalCount": 902,
                        "acceptanceCount": 263,
                        "created": "2017-06-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da969a",
                        "refusalCount": 1024,
                        "acceptanceCount": 543,
                        "created": "2017-04-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9699",
                        "refusalCount": 391,
                        "acceptanceCount": 220,
                        "created": "2017-06-03T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9698",
                        "refusalCount": 507,
                        "acceptanceCount": 373,
                        "created": "2017-04-29T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9697",
                        "refusalCount": 1069,
                        "acceptanceCount": 520,
                        "created": "2017-04-26T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9696",
                        "refusalCount": 555,
                        "acceptanceCount": 444,
                        "created": "2017-04-30T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9695",
                        "refusalCount": 210,
                        "acceptanceCount": 96,
                        "created": "2017-05-27T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9694",
                        "refusalCount": 530,
                        "acceptanceCount": 380,
                        "created": "2017-05-01T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9693",
                        "refusalCount": 1025,
                        "acceptanceCount": 546,
                        "created": "2017-05-03T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9692",
                        "refusalCount": 1124,
                        "acceptanceCount": 512,
                        "created": "2017-05-04T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9691",
                        "refusalCount": 1021,
                        "acceptanceCount": 426,
                        "created": "2017-05-05T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9690",
                        "refusalCount": 901,
                        "acceptanceCount": 445,
                        "created": "2017-05-06T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da968f",
                        "refusalCount": 1281,
                        "acceptanceCount": 558,
                        "created": "2017-05-08T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da968e",
                        "refusalCount": 2054,
                        "acceptanceCount": 922,
                        "created": "2017-04-18T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da968d",
                        "refusalCount": 472,
                        "acceptanceCount": 306,
                        "created": "2017-05-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da968c",
                        "refusalCount": 584,
                        "acceptanceCount": 410,
                        "created": "2017-05-09T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da968b",
                        "refusalCount": 529,
                        "acceptanceCount": 333,
                        "created": "2017-05-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da968a",
                        "refusalCount": 537,
                        "acceptanceCount": 340,
                        "created": "2017-05-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9689",
                        "refusalCount": 530,
                        "acceptanceCount": 342,
                        "created": "2017-06-06T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9688",
                        "refusalCount": 674,
                        "acceptanceCount": 476,
                        "created": "2017-04-28T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9687",
                        "refusalCount": 227,
                        "acceptanceCount": 165,
                        "created": "2017-06-07T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9686",
                        "refusalCount": 1007,
                        "acceptanceCount": 504,
                        "created": "2017-05-07T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9685",
                        "refusalCount": 457,
                        "acceptanceCount": 216,
                        "created": "2017-05-13T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9684",
                        "refusalCount": 733,
                        "acceptanceCount": 439,
                        "created": "2017-05-16T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9683",
                        "refusalCount": 773,
                        "acceptanceCount": 461,
                        "created": "2017-04-27T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9682",
                        "refusalCount": 684,
                        "acceptanceCount": 380,
                        "created": "2017-05-17T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9681",
                        "refusalCount": 757,
                        "acceptanceCount": 560,
                        "created": "2017-05-19T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9680",
                        "refusalCount": 1080,
                        "acceptanceCount": 290,
                        "created": "2017-06-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da967f",
                        "refusalCount": 633,
                        "acceptanceCount": 355,
                        "created": "2017-05-15T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da967e",
                        "refusalCount": 476,
                        "acceptanceCount": 311,
                        "created": "2017-05-20T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da967d",
                        "refusalCount": 495,
                        "acceptanceCount": 399,
                        "created": "2017-05-21T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da967c",
                        "refusalCount": 93,
                        "acceptanceCount": 38,
                        "created": "2017-06-30T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da967b",
                        "refusalCount": 473,
                        "acceptanceCount": 206,
                        "created": "2017-05-30T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da967a",
                        "refusalCount": 697,
                        "acceptanceCount": 532,
                        "created": "2017-05-18T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9679",
                        "refusalCount": 646,
                        "acceptanceCount": 501,
                        "created": "2017-05-22T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9678",
                        "refusalCount": 637,
                        "acceptanceCount": 463,
                        "created": "2017-05-23T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9677",
                        "refusalCount": 334,
                        "acceptanceCount": 239,
                        "created": "2017-05-14T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9676",
                        "refusalCount": 646,
                        "acceptanceCount": 417,
                        "created": "2017-05-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9675",
                        "refusalCount": 1097,
                        "acceptanceCount": 229,
                        "created": "2017-07-03T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9674",
                        "refusalCount": 520,
                        "acceptanceCount": 299,
                        "created": "2017-05-26T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9673",
                        "refusalCount": 19,
                        "acceptanceCount": 11,
                        "created": "2017-05-28T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9672",
                        "refusalCount": 97,
                        "acceptanceCount": 36,
                        "created": "2017-07-01T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9671",
                        "refusalCount": 360,
                        "acceptanceCount": 206,
                        "created": "2017-06-04T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9670",
                        "refusalCount": 1015,
                        "acceptanceCount": 232,
                        "created": "2017-06-23T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da966f",
                        "refusalCount": 1428,
                        "acceptanceCount": 286,
                        "created": "2017-06-26T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da966e",
                        "refusalCount": 563,
                        "acceptanceCount": 463,
                        "created": "2017-05-02T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da966d",
                        "refusalCount": 1002,
                        "acceptanceCount": 389,
                        "created": "2017-04-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da966c",
                        "refusalCount": 2221,
                        "acceptanceCount": 541,
                        "created": "2017-06-28T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da966b",
                        "refusalCount": 808,
                        "acceptanceCount": 405,
                        "created": "2017-05-31T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da966a",
                        "refusalCount": 595,
                        "acceptanceCount": 338,
                        "created": "2017-06-02T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9669",
                        "refusalCount": 449,
                        "acceptanceCount": 245,
                        "created": "2017-06-05T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9668",
                        "refusalCount": 711,
                        "acceptanceCount": 405,
                        "created": "2017-06-01T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9667",
                        "refusalCount": 1360,
                        "acceptanceCount": 345,
                        "created": "2017-06-29T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9666",
                        "refusalCount": 1572,
                        "acceptanceCount": 362,
                        "created": "2017-06-22T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9665",
                        "refusalCount": 401,
                        "acceptanceCount": 160,
                        "created": "2017-05-29T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9664",
                        "refusalCount": 474,
                        "acceptanceCount": 130,
                        "created": "2017-06-20T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9663",
                        "refusalCount": 2460,
                        "acceptanceCount": 649,
                        "created": "2017-06-27T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9662",
                        "refusalCount": 269,
                        "acceptanceCount": 44,
                        "created": "2017-07-02T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9661",
                        "refusalCount": 874,
                        "acceptanceCount": 482,
                        "created": "2017-05-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9660",
                        "refusalCount": 796,
                        "acceptanceCount": 137,
                        "created": "2017-06-21T04:00:00.000Z"
                    }
                ],
                "clicks": [
                    {
                        "_id": "595ac16ac177936eb5da965f",
                        "count": 592,
                        "created": "2017-04-06T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da965e",
                        "count": 1335,
                        "created": "2017-04-07T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da965d",
                        "count": 889,
                        "created": "2017-04-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da965c",
                        "count": 659,
                        "created": "2017-04-13T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da965b",
                        "count": 1799,
                        "created": "2017-04-19T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da965a",
                        "count": 597,
                        "created": "2017-04-23T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9659",
                        "count": 692,
                        "created": "2017-04-22T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9658",
                        "count": 1589,
                        "created": "2017-04-26T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9657",
                        "count": 1391,
                        "created": "2017-04-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9656",
                        "count": 1234,
                        "created": "2017-04-27T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9655",
                        "count": 2925,
                        "created": "2017-04-17T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9654",
                        "count": 1026,
                        "created": "2017-05-02T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9653",
                        "count": 734,
                        "created": "2017-04-21T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9652",
                        "count": 1571,
                        "created": "2017-05-03T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9651",
                        "count": 1636,
                        "created": "2017-05-04T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9650",
                        "count": 1447,
                        "created": "2017-05-05T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da964f",
                        "count": 1567,
                        "created": "2017-04-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da964e",
                        "count": 1150,
                        "created": "2017-04-28T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da964d",
                        "count": 694,
                        "created": "2017-06-05T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da964c",
                        "count": 1147,
                        "created": "2017-05-22T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da964b",
                        "count": 1839,
                        "created": "2017-05-08T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da964a",
                        "count": 868,
                        "created": "2017-04-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9649",
                        "count": 820,
                        "created": "2017-04-14T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9648",
                        "count": 862,
                        "created": "2017-05-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9647",
                        "count": 679,
                        "created": "2017-05-30T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9646",
                        "count": 877,
                        "created": "2017-05-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9645",
                        "count": 804,
                        "created": "2017-04-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9644",
                        "count": 1917,
                        "created": "2017-04-15T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9643",
                        "count": 673,
                        "created": "2017-05-13T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9642",
                        "count": 910,
                        "created": "2017-05-01T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9641",
                        "count": 1317,
                        "created": "2017-05-19T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9640",
                        "count": 1172,
                        "created": "2017-05-16T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da963f",
                        "count": 1116,
                        "created": "2017-06-01T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da963e",
                        "count": 778,
                        "created": "2017-05-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da963d",
                        "count": 894,
                        "created": "2017-05-21T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da963c",
                        "count": 1934,
                        "created": "2017-06-22T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da963b",
                        "count": 1136,
                        "created": "2017-04-20T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da963a",
                        "count": 999,
                        "created": "2017-04-30T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9639",
                        "count": 604,
                        "created": "2017-06-20T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9638",
                        "count": 933,
                        "created": "2017-06-21T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9637",
                        "count": 611,
                        "created": "2017-06-03T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9636",
                        "count": 819,
                        "created": "2017-05-26T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9635",
                        "count": 566,
                        "created": "2017-06-04T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9634",
                        "count": 1213,
                        "created": "2017-05-31T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9633",
                        "count": 30,
                        "created": "2017-05-28T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9632",
                        "count": 1064,
                        "created": "2017-05-17T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9631",
                        "count": 133,
                        "created": "2017-07-01T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9630",
                        "count": 1536,
                        "created": "2017-04-16T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da962f",
                        "count": 2976,
                        "created": "2017-04-18T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da962e",
                        "count": 1229,
                        "created": "2017-05-18T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da962d",
                        "count": 1346,
                        "created": "2017-05-06T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da962c",
                        "count": 573,
                        "created": "2017-05-14T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da962b",
                        "count": 313,
                        "created": "2017-07-02T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da962a",
                        "count": 1356,
                        "created": "2017-05-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9629",
                        "count": 306,
                        "created": "2017-05-27T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9628",
                        "count": 1247,
                        "created": "2017-06-23T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9627",
                        "count": 1165,
                        "created": "2017-06-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9626",
                        "count": 392,
                        "created": "2017-06-07T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9625",
                        "count": 660,
                        "created": "2017-04-08T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9624",
                        "count": 452,
                        "created": "2017-04-09T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9623",
                        "count": 994,
                        "created": "2017-05-09T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9622",
                        "count": 880,
                        "created": "2017-04-29T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9621",
                        "count": 872,
                        "created": "2017-06-06T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9620",
                        "count": 933,
                        "created": "2017-06-02T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da961f",
                        "count": 3109,
                        "created": "2017-06-27T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da961e",
                        "count": 561,
                        "created": "2017-05-29T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da961d",
                        "count": 131,
                        "created": "2017-06-30T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da961c",
                        "count": 1705,
                        "created": "2017-06-29T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da961b",
                        "count": 1370,
                        "created": "2017-06-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da961a",
                        "count": 1100,
                        "created": "2017-05-23T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9619",
                        "count": 787,
                        "created": "2017-05-20T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9618",
                        "count": 1714,
                        "created": "2017-06-26T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9617",
                        "count": 1063,
                        "created": "2017-05-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9616",
                        "count": 988,
                        "created": "2017-05-15T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9615",
                        "count": 2762,
                        "created": "2017-06-28T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9614",
                        "count": 1511,
                        "created": "2017-05-07T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9613",
                        "count": 1326,
                        "created": "2017-07-03T04:00:00.000Z"
                    }
                ],
                "impressions": [
                    {
                        "_id": "595ac16ac177936eb5da9612",
                        "count": 888,
                        "created": "2017-04-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9611",
                        "count": 660,
                        "created": "2017-04-13T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9610",
                        "count": 1798,
                        "created": "2017-04-19T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da960f",
                        "count": 594,
                        "created": "2017-04-23T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da960e",
                        "count": 690,
                        "created": "2017-04-22T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da960d",
                        "count": 1584,
                        "created": "2017-04-26T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da960c",
                        "count": 1385,
                        "created": "2017-04-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da960b",
                        "count": 1229,
                        "created": "2017-04-27T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da960a",
                        "count": 2915,
                        "created": "2017-04-17T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9609",
                        "count": 1023,
                        "created": "2017-05-02T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9608",
                        "count": 725,
                        "created": "2017-04-21T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9607",
                        "count": 1565,
                        "created": "2017-05-03T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9606",
                        "count": 1637,
                        "created": "2017-05-04T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9605",
                        "count": 1442,
                        "created": "2017-05-05T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9604",
                        "count": 1564,
                        "created": "2017-04-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9603",
                        "count": 1146,
                        "created": "2017-04-28T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9602",
                        "count": 693,
                        "created": "2017-06-05T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9601",
                        "count": 1155,
                        "created": "2017-05-22T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da9600",
                        "count": 1833,
                        "created": "2017-05-08T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95ff",
                        "count": 857,
                        "created": "2017-04-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95fe",
                        "count": 819,
                        "created": "2017-04-14T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95fd",
                        "count": 1176,
                        "created": "2017-05-11T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95fc",
                        "count": 678,
                        "created": "2017-05-30T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95fb",
                        "count": 978,
                        "created": "2017-05-12T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95fa",
                        "count": 103,
                        "created": "2017-04-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95f9",
                        "count": 1911,
                        "created": "2017-04-15T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95f8",
                        "count": 693,
                        "created": "2017-05-13T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95f7",
                        "count": 912,
                        "created": "2017-05-01T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95f6",
                        "count": 1344,
                        "created": "2017-05-19T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95f5",
                        "count": 1183,
                        "created": "2017-05-16T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95f4",
                        "count": 1110,
                        "created": "2017-06-01T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95f3",
                        "count": 828,
                        "created": "2017-05-10T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95f2",
                        "count": 896,
                        "created": "2017-05-21T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95f1",
                        "count": 1930,
                        "created": "2017-06-22T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95f0",
                        "count": 1127,
                        "created": "2017-04-20T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95ef",
                        "count": 999,
                        "created": "2017-04-30T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95ee",
                        "count": 604,
                        "created": "2017-06-20T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95ed",
                        "count": 934,
                        "created": "2017-06-21T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95ec",
                        "count": 612,
                        "created": "2017-06-03T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95eb",
                        "count": 823,
                        "created": "2017-05-26T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95ea",
                        "count": 567,
                        "created": "2017-06-04T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95e9",
                        "count": 1223,
                        "created": "2017-05-31T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95e8",
                        "count": 30,
                        "created": "2017-05-28T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95e7",
                        "count": 1109,
                        "created": "2017-05-17T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95e6",
                        "count": 137,
                        "created": "2017-07-01T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95e5",
                        "count": 1520,
                        "created": "2017-04-16T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95e4",
                        "count": 2971,
                        "created": "2017-04-18T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95e3",
                        "count": 1277,
                        "created": "2017-05-18T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95e2",
                        "count": 1338,
                        "created": "2017-05-06T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95e1",
                        "count": 584,
                        "created": "2017-05-14T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95e0",
                        "count": 312,
                        "created": "2017-07-02T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95df",
                        "count": 1361,
                        "created": "2017-05-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95de",
                        "count": 305,
                        "created": "2017-05-27T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95dd",
                        "count": 1246,
                        "created": "2017-06-23T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95dc",
                        "count": 1164,
                        "created": "2017-06-24T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95db",
                        "count": 392,
                        "created": "2017-06-07T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95da",
                        "count": 997,
                        "created": "2017-05-09T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95d9",
                        "count": 875,
                        "created": "2017-04-29T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95d8",
                        "count": 870,
                        "created": "2017-06-06T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95d7",
                        "count": 935,
                        "created": "2017-06-02T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95d6",
                        "count": 3106,
                        "created": "2017-06-27T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95d5",
                        "count": 561,
                        "created": "2017-05-29T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95d4",
                        "count": 131,
                        "created": "2017-06-30T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95d3",
                        "count": 1703,
                        "created": "2017-06-29T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95d2",
                        "count": 1372,
                        "created": "2017-06-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95d1",
                        "count": 1128,
                        "created": "2017-05-23T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95d0",
                        "count": 796,
                        "created": "2017-05-20T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95cf",
                        "count": 1718,
                        "created": "2017-06-26T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95ce",
                        "count": 1064,
                        "created": "2017-05-25T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95cd",
                        "count": 999,
                        "created": "2017-05-15T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95cc",
                        "count": 2763,
                        "created": "2017-06-28T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95cb",
                        "count": 1507,
                        "created": "2017-05-07T04:00:00.000Z"
                    },
                    {
                        "_id": "595ac16ac177936eb5da95ca",
                        "count": 1327,
                        "created": "2017-07-03T04:00:00.000Z"
                    }
                ]
            },
            "mainQuestion": {
                "answerList": [
                    {
                        "_id": "58e5fb3527b4835a906b38f3",
                        "answer": "Quero começar agora!",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "58e5fb3527b4835a906b38f2",
                        "answer": "Quero saber mais",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "58e5fb3527b4835a906b38f1",
                        "answer": "Não tenho interesse.",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "do_nothing"
                        }
                    }
                ],
                "description": "As consultoras da Natura não pagam nada para se inscrever e começar a trabalhar!",
                "title": "Torne-se uma franqueada Natura Digital e comece a lucrar agora."
            },
            "delivery": {
                "type": "tb",
                "targetBlankUrl": "http://springmedia.go2cloud.org/aff_c?offer_id=1820&aff_id=1208&aff_sub2=SURVEY",
                "wsUrl": "http://springmedia.go2cloud.org/aff_c?offer_id=1820&aff_id=1208&aff_sub2=SURVEY",
                "isUploadImage": false,
                "smallImage": "https://media.go2speed.org/brand/files/springmedia/1820/banner-fnd2-300x250.jpg",
                "largeImage": "https://media.go2speed.org/brand/files/springmedia/1820/banner-fnd2-300x250.jpg",
                "birthDate": {
                    "isBirthDate": false,
                    "mask": ""
                },
                "gender": {
                    "isGender": false,
                    "valueFemale": "",
                    "valueMale": ""
                }
            },
            "links": {
                "addClick": {
                    "acceptance": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/58e5fb3527b4835a906b38f0/stats/clicks?type=acceptance&affcode=gc"
                    },
                    "refusal": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/58e5fb3527b4835a906b38f0/stats/clicks?type=refusal&affcode=gc"
                    }
                },
                "addImpresssion": {
                    "method": "POST",
                    "link": "http://yhall.the-ybox.tech/api/offer/58e5fb3527b4835a906b38f0/stats/impressions?affcode=gc"
                },
                "getOffer": {
                    "method": "GET",
                    "link": "http://yhall.the-ybox.tech/api/offer/58e5fb3527b4835a906b38f0"
                }
            }
        },
        {
            "_id": "5a17fd4f643d5f38d5dc89f2",
            "status": false,
            "name": "Telefonia VC",
            "segmentation": {
                "isMobile": false,
                "isMale": false,
                "isFemale": false,
                "isDesktop": false,
                "forbiddenDomains": [],
                "dynamicSegmentation": [],
                "dddRegion": [],
                "age": {
                    "lessThan": 0,
                    "moreThan": 0
                }
            },
            "stats": {
                "acceptance": [],
                "clicks": [],
                "impressions": []
            },
            "mainQuestion": {
                "answerList": [
                    {
                        "_id": "5a17fd4f643d5f38d5dc89f4",
                        "answer": "Eu quero diminuir minha conta",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "delivery"
                        }
                    },
                    {
                        "_id": "5a17fd4f643d5f38d5dc89f3",
                        "answer": "Não me interessa.",
                        "action": {
                            "textInput": "",
                            "textConfirmation": "",
                            "fieldTag": "",
                            "field": "",
                            "type": "do_nothing"
                        }
                    }
                ],
                "description": "",
                "title": "Fique por dentro de todas as promoções e diminua sua conta de celular!"
            },
            "delivery": {
                "type": "tb",
                "targetBlankUrl": "http://track.mdsmatch.com/aff_c?offer_id=9721&aff_id=3435",
                "wsUrl": "http://track.mdsmatch.com/aff_c?offer_id=9721&aff_id=3435",
                "isUploadImage": true,
                "smallImage": "http://cdn.the-ybox.tech/300x250.jpg",
                "largeImage": "http://cdn.the-ybox.tech/300x250.jpg",
                "birthDate": {
                    "isBirthDate": false,
                    "mask": ""
                },
                "gender": {
                    "isGender": false,
                    "valueFemale": "",
                    "valueMale": ""
                }
            },
            "links": {
                "addClick": {
                    "acceptance": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/5a17fd4f643d5f38d5dc89f2/stats/clicks?type=acceptance&affcode=gc"
                    },
                    "refusal": {
                        "method": "POST",
                        "link": "http://yhall.the-ybox.tech/api/offer/5a17fd4f643d5f38d5dc89f2/stats/clicks?type=refusal&affcode=gc"
                    }
                },
                "addImpresssion": {
                    "method": "POST",
                    "link": "http://yhall.the-ybox.tech/api/offer/5a17fd4f643d5f38d5dc89f2/stats/impressions?affcode=gc"
                },
                "getOffer": {
                    "method": "GET",
                    "link": "http://yhall.the-ybox.tech/api/offer/5a17fd4f643d5f38d5dc89f2"
                }
            }
        }*/

});
