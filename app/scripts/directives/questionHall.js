'use strict';


angular.module('gosteiclubApp')
  .directive('questionHall', function ($rootScope, User, $http, SessionLanding, 
    $location, $window, lodash, WsUriBuilder, WsClient, Stats) {
    
    return {

    			scope: true,
                restrict: 'AE',
                replace: false,
                templateUrl: 'views/directives/questionHall.html',

                link: function($scope, elem, attrs) {

                    console.log('$rootScope.questionHall', $rootScope.questionHall);


                    $scope.indexItemQuestionHall = 0;
                    $scope.showButtomOpportunity = false;

                    $scope.$watch('indexItemQuestionHall', function () {

                        if($scope.indexItemQuestionHall < $rootScope.questionHall.length){
                            
                            //$http.post('/api/yhall/offer/'+$rootScope.questionHall[$scope.indexItemQuestionHall]._id+'/stats/impressions');
                            
                            Stats.setImpression(
                                $rootScope.questionHall[$scope.indexItemQuestionHall]._id);
                        }

                    });


                    $scope.nextItemQuenstionHall = function(offer, answer){

                        if(!answer){
                            //$http.post('/api/yhall/offer/'+offer._id+'/stats/clicks?type=refusal');
                            Stats.setClick(offer._id, 'refusal', $scope.user._id);
                        }

                        $scope.showButtomOpportunity = false;
                        $scope.indexItemQuestionHall += 1;

                        $rootScope.percentageProgressBar = 
                            Math.round(($scope.indexItemQuestionHall / $rootScope.questionHall.length)*100);

                        if($rootScope.questionHall.length === $scope.indexItemQuestionHall){
                            $location.path('/balcao');
                        }

                    };




                    $scope.verifyAnswersQuestionHall = function(itemAnswer, offer){

                        $scope.itemAnswerSelected = itemAnswer; 

                        var answerList = offer.mainQuestion.answerList;
                        $scope.showButtomOpportunity = false;

                        for (var i = 0; answerList.length > i; i++) {
                            $('#answer_question_'+answerList[i]._id).css('display', 'none');
                            $('#button_answer_question_'+answerList[i]._id).css('display', 'none');
                        }
                  
                        switch(itemAnswer.action.type){

                            case 'do_nothing':
                                
                                $scope.nextItemQuenstionHall(offer, true);
                                //$http.post('/api/yhall/offer/'+offer._id+'/stats/clicks?type=refusal');
                                Stats.setClick(offer._id, 'refusal', $scope.user._id);
                            
                            break;

                            case 'delivery':
                                $scope.defineDeliveryStrategy(itemAnswer, offer);
                            break;    

                            case 'confirm_user_fields':
                            case 'open_new_input_field':

                                $('#answer_question_'+itemAnswer._id).css('display', 'block');
                                $('#button_answer_question_'+itemAnswer._id).css('display', 'block');

                            break;
                        }
                    };




                    $scope.defineDeliveryStrategy = function(itemAnswerSelected, offer){

                        //$http.post('/api/yhall/offer/'+offer._id+'/stats/clicks?type=acceptance');
                        Stats.setClick(offer._id, 'acceptance', $scope.user._id);
                        User.setPoints(15);

                        switch(offer.delivery.type){

                            case 'tb':
                                
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
                                    +'aff_sub=corredor'
                                    +'&aff_sub5='+SessionLanding.getOriginTraficSource($location)
                                    +'&aff_sub4='+SessionLanding.getOriginMedium($location));

 
                                $scope.nextItemQuenstionHall(offer, true);
                                break;
                            

                            case 'ws':
                                $scope.deliveryWS(itemAnswerSelected, offer);
                                break;

                        }
                    };




                    $scope.deliveryWS = function(itemAnswerSelected, offer){
                        
                        if($scope.validateInputField(itemAnswerSelected)){
                            
                            $scope.executeWsInQuestionHall(offer, itemAnswerSelected);
                            $scope.nextItemQuenstionHall(offer, true);
                        }                        
                    };




                    $scope.validateInputField = function(itemAnswerSelected){
                       
                        if(!$scope.showButtomOpportunity){
                            return true;
                        }

                        switch(itemAnswerSelected.action.type){

                            case 'open_new_input_field':
                                var value = $('#'+itemAnswerSelected._id+'_userfield_custom').val();
                                return (!lodash.isEmpty(value));
                                                            
                            case 'confirm_user_fields':
                                return $scope.validateUserInput(itemAnswerSelected.action.field);
                        }

                        return false;
                    };




                    $scope.validateUserInput = function(field){

                        switch(field){

                            case 'cellphone':
                                return (!lodash.isEmpty($scope.user.cellphone));
                            
                            case 'email':
                                return (!lodash.isEmpty($scope.user.email));
                            
                            case 'name':
                                return (!lodash.isEmpty($scope.user.name));

                            case 'zipcode':
                                return (!lodash.isEmpty($scope.user.address.zipcode));

                        }

                        return false;
                    };




                    $scope.executeWsInQuestionHall = function(offer, itemAnswerSelected){

                        var uri = '';

                        if(!itemAnswerSelected){
                            WsClient.executeUri(uri, 'questionHall', offer, $scope.user);
                            return null;
                        }

                        if(itemAnswerSelected.action.type === 'open_new_input_field'){
                            
                            var customKey   = itemAnswerSelected.action.fieldTag;
                            var customValue = $('#'+itemAnswerSelected._id+'_userfield_custom').val();

                            uri = WsUriBuilder.buildUriCustom(
                                $scope.user, 'questionHall', offer.delivery.wsUrl, customKey, customValue);

                            WsClient.executeUri(uri, 'questionHall', offer, $scope.user);

                        
                        }else{

                            uri = WsUriBuilder.buildUri(
                                $scope.user, 'questionHall', offer.delivery.wsUrl);
                            
                            WsClient.executeUri(uri, 'questionHall', offer, $scope.user);
                        }
                
                        
                       
                    };


                }
            };
  });
