'use strict';


angular.module('gosteiclubApp')
  .directive('dynamicSegmentation', function ($rootScope, $http, Stats) {
    
    return {

    			scope: true,
                restrict: 'AE',
                replace: false,
                templateUrl: 'views/directives/dynamicSegmentation.html',

                link: function($scope, elem, attrs) {


                	$scope.printRadioChoise = function(answerList, labelRadioId){

                		for(var x=0; x<answerList.length; x++){
                			$('#label_radio_'+answerList[x]._id).attr('class', 'itemSurveyShowOffer');
                		}

                		$('#label_radio_'+labelRadioId).attr('class', 'itemSurveyShowClicked');
                	};


				    $scope.verifyOffersAvailable = function(){
				      				      	
				      	$scope.showSurveySegmented();
				      	$rootScope.questionHall = $scope.getQuestionHallSegmented();
										      
				    };




				    $scope.showSurveySegmented = function (){

				   	 	for (var x = 0; $scope.survey.length>x; x++) { 					   	 				 
					      	$('#offer_'+$scope.survey[x]._id).css("display", 'none');

					 	}

				   	 	var surveyList = $scope.getOffersAvailable($scope.survey);

				   	 	for (var x = 0; x<surveyList.length; x++) { 	
					      	
					      	$('#offer_'+surveyList[x]._id).css("display", 'block');
					      	//$http.post('/api/yhall/offer/'+surveyList[x]._id+'/stats/impressions');
					      	Stats.setImpression(surveyList[x]._id);

				   	 	}

				   	 	$scope.isNextStepAvaliableForSurvey(surveyList);
				    	
				    };



				    $scope.getQuestionHallSegmented = function(){				    	

				    	return $scope.getOffersAvailable($scope.offers.questionHall);
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
				    };




				    $scope.isSurveyFromDynamicSegmentation = function (itemSurvey, itemDynSeg){

				    	if(itemDynSeg.offers.indexOf(itemSurvey._id) > -1){
				    		return true;
				    	}

				    	return false;
				    };



                }
            };


  });
