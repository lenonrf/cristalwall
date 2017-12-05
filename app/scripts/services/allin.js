'use strict';

angular.module('gosteiclubApp')
  .service('Allin', function (Utils) {

    this.sendDataToWelcomeLifeCycle = function(data){

      var allin = {
        evento : 'Novo Cadastro',
        nm_email: data.email,
        lista:{
          nm_lista: 'gosteiclub',
          nome: data.name,
          sexo: data.gender,
          dt_cadastro: Utils.getDateAllin()
        }
      };

      try{
        lc.sendData(allin);
      }catch (e){
        console.log('Erro ao enviar Allin', e);
      }

    };

  });
