'use strict';

/**
 * @ngdoc service
 * @name gosteiclubApp.Product
 * @description
 * # User
 * Factory in the gosteiclubApp.
 */
angular.module('gosteiclubApp')
  .factory('Survey', function (WsClient, WsUriBuilder, $http, Stats) {


    this.getRadioGroupChoise = function(id){
      return $("input:radio[name ='"+id+"']:checked").val();
    };


    this.isAllChoisesSelected = function(dynamicSegmentation, avaliableOffers){
      
      var isAllDynamicSegSelecteds = true;
      var isAllSurveySelecteds = false;

      if(dynamicSegmentation){

        isAllDynamicSegSelecteds = dynamicSegmentation.every(function(element, index, array){
          return ($("input:radio[name ='answer_"+element._id+"']:checked").val());
        });      
      }

      isAllSurveySelecteds = avaliableOffers.every(function(element, index, array){
        return ($("input:radio[name ='answer_survey_"+element._id+"']:checked").val());
      });

      return (isAllDynamicSegSelecteds && isAllSurveySelecteds);

    };




    this.sendSurvey = function(surveyList, user){

      var uri = '';

      for (var i = 0; i < surveyList.length; i++) { 

          var actionTypeArr = (this.getRadioGroupChoise('answer_survey_'+surveyList[i]._id));

          Stats.setImpression(surveyList[i]._id);

          if(actionTypeArr){
            
            actionTypeArr = actionTypeArr.split('_-_');

            var action = {
              type: actionTypeArr[0],
              answerId : actionTypeArr[1]
            }; 

            if(action.type !== 'do_nothing'){

              surveyList[i].actionType = action.type;
              
              //uri = this.getSurveyURI(surveyList[i], user, action);
              WsClient.executeUri('survey', surveyList[i], user);
              //$http.post('/api/yhall/offer/'+surveyList[i]._id+'/stats/clicks?type=acceptance');
              Stats.setClick(surveyList[i]._id, 'acceptance', user._id);

            
            }else{
              //$http.post('/api/yhall/offer/'+surveyList[i]._id+'/stats/clicks?type=refusal');
              Stats.setClick(surveyList[i]._id, 'refusal', user._id);

            }

          }
      };
    };




    this.getSurveyURI = function(survey, user, action){


      var uri = '';

      switch(action.type){

        case 'delivery':
        case 'confirm_user_fields':
          return WsUriBuilder.buildUri(user, 'survey', survey.delivery.survey.wsUrl);;


        case 'open_new_input_field':
          
          var customKey   = $('#userfield_custom_tag_'+action.answerId).val();
          var customValue = $('#userfield_custom_'+action.answerId).val();

          return WsUriBuilder.buildUriCustom(user, 'survey', 
            survey.delivery.survey.wsUrl, customKey, customValue);

      }
    };

    return this;

  });
