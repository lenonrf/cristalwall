'use strict';


angular.module('gosteiclubApp')
  .directive('survey', function ($rootScope, $window, lodash, User, SessionLanding, $location) {
    
    return {

    			scope: true,
                restrict: 'AE',
                replace: false,
                templateUrl: 'views/directives/survey.html',

                link: function($scope, elem, attrs, $http) {

                    if($scope.dynamicSegmentation){

                        for (var x = 0; $scope.dynamicSegmentation.length>x; x++) { 
                            for (var y = 0; $scope.dynamicSegmentation[x].offers.length>y; y++) {                             
                                $('#offer_'+$scope.dynamicSegmentation[x].offers[y]).css("display", "none");
                            }
                        }                        
                    }


                    $scope.printRadioChoise = function(answerList, labelRadioId){

                        for(var x=0; x<answerList.length; x++){
                            $('#label_radio_'+answerList[x]._id).attr('class', 'surveyButton');
                        }

                        $('#label_radio_'+labelRadioId).attr('class', 'itemSurveyShowClicked');
                    };


                    $scope.verifyAnswers = function(itemAnswer, survey){

                        var answerList = survey.mainQuestion.answerList;

                        for (var i = 0; answerList.length > i; i++) {
                            $('#answer_'+answerList[i]._id).css('display', 'none');
                        }

                        
                        switch(itemAnswer.action.type){

                            case 'do_nothing':

                                lodash.remove($scope.deliveryWS.survey, function(currentObject) { 
                                    return currentObject._id === survey._id;
                                });

                            break;

                            case 'delivery':
                                $scope.defineDeliveryStrategy(itemAnswer, survey);
                            break;    

                            case 'confirm_user_fields':
                            case 'open_new_input_field':

                                $('#answer_'+itemAnswer._id).css('display', 'block');
                                $scope.defineDeliveryStrategy(itemAnswer, survey);

                            break;
                        }

                        $scope.isNextStepAvaliableForSurvey(
                            $scope.getOffersAvailable($scope.survey));

                    };



                    $scope.getOffersAvailable = function(offerList){

                        var radioChoise = '';
                        var avaliableOffers = [];

                        for (var x = 0; offerList.length>x; x++) { 

                            if(offerList[x].segmentation.dynamicSegmentation.length>0){
                                
                                for (var y = 0; offerList[x].segmentation.dynamicSegmentation.length>y; y++) { 
                 
                                    radioChoise = $scope.getRadioChoiseValue(
                                        offerList[x].segmentation.dynamicSegmentation[y]._id);
                                                    
                                    if(radioChoise === 'show_offer'){
                                        avaliableOffers.push(offerList[x]);
                                    }
                                }

                            }else{
                                avaliableOffers.push(offerList[x]);
                            }
                        }

                        return avaliableOffers;
                    };

                    $scope.getRadioChoiseValue = function (id){
                        return $("input:radio[name ='answer_"+id+"']:checked").val();
                    }





                    $scope.defineDeliveryStrategy = function(itemAnswer, offer){
                    
                        if(offer.delivery.type === 'tb'){


                            var urlProtocolPrefix = '';
                            var queryParamPrefix = '&';

                            if(offer.delivery.targetBlankUrl.indexOf('http') === -1){
                                urlProtocolPrefix = 'http://';
                            }


                            if(offer.delivery.targetBlankUrl.indexOf('?') === -1){
                                queryParamPrefix = '?';
                            }


                            $window.open(urlProtocolPrefix
                                +offer.delivery.targetBlankUrl
                                +queryParamPrefix
                                +'aff_sub=survey'
                                +'&aff_sub5='+SessionLanding.getOriginTraficSource($location)
                                +'&aff_sub4='+SessionLanding.getOriginMedium($location));

                                
                        }else if(offer.delivery.type === 'ws'){

                            offer.delivery.itemAnswer = itemAnswer;

                            $scope.deliveryWS.survey.push(offer);

                            $scope.deliveryWS.survey = 
                                lodash.uniq($scope.deliveryWS.survey, function(item, key, _id) { 
                                    return item._id;
                                });

                        }
                    };

                }
            };
  });
