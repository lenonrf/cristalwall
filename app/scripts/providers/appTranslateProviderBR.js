'use strict';

angular.module('gosteiclubApp')
  .provider('AppTranslateBR', function () {


    this.getTitle = function(code){

      switch (code){

        case 'pt-BR-RVD':
          return 'Gostei.club - Seu Clube de Oportunidades e Revendas'
          break;


        case 'pt-BR-AMT':
          return 'Gostei.club - Seu Clube de Oportunidades | Produtos e amostras grátis para você testar!'
          break;

        case 'pt-BR-VDC':
          return 'Gostei.club - Seu Clube de Oportunidades e Videncias'
          break;

      }
    };


    this.getLogo = function(){
      return 'http://gosteiclub-12bd.kxcdn.com/images/logo_BR.png';
    };




    this.getFields = function(){

      return {
          'BUTTON_ENTER': 'Entrar',
          'BUTTON_ICO_NAME': 'Quero participar!',
          'BUTTON_IWANT': 'Eu Quero!',
          'BUTTON_NEXT': 'Próximo >',
          'BUTTON_FINISH': 'Finalizar',
          'GENDER_M': 'Masculino',
          'GENDER_W': 'Feminino',
          'GENDER': 'Sexo',
          'EMAIL': 'Email',
          'FULL_NAME': 'Nome Completo',
          'BIRTH': 'Data de Nascimento',
          'CELLPHONE': 'Celular',
          'ZIPCODE': 'Cep',
          'NUMBER': 'Numero',
          'STREET': 'Endereço',
          'NEIBOR': 'Bairro',
          'COMPL': 'Complemento',
          'STATE': 'Estado',
          'CITY': 'Cidade',
          'BIRTHMASK' : 'dd/mm/aaaa'
      };
    };



    this.getMenuItems = function(){

      return {
        'ITSFREE_NAME': 'De graça?',
        'ITSFREE_HREF': '#degraca',
        'FREESAMPLES_NAME': 'Amostras Grátis',
        'FREESAMPLES_HREF': '#amostras',
        'OPORTUNITY_NAME': 'Oportunidades',
        'OPORTUNITY_HREF': '#oportunidade',
        'TESTIMONIALS_NAME': 'Depoimentos',
        'TESTIMONIALS_HREF': '#depoimentos',
        'BRANDS_NAME': 'Marcas',
        'BRANDS_HREF': '#marcas',
        'IWANT_PARTICIPATE' : 'Quero Participar'
      };
    };



    this.getItsFree = function(code){

      if(code === 'pt-BR-VDC'){

        return {

          'TITLE' : 'DE GRAÇA?',
          'DESC' : 'Sim, de graça. Nosso objetivo é levar as melhores oportunidades para os participantes do nosso clube. Assim, você consegue saber tudo sobre vidências, simpatias, tarot, ciganas, cartomantes, para ajudar a prever o seu futuro.',

          'ITEM1.TITLE' : 'Vidência',
          'ITEM1.MARK1' : 'Simpatias',
          'ITEM1.MARK2' : 'Videntes Grátis',
          'ITEM1.MARK3' : 'Astrologia',
          'ITEM1.MARK4' : 'Videntes Online',
          'ITEM1.IMAGE' : 'http://gosteiclub-12bd.kxcdn.com/images/mark1_videncia.jpg',

          'ITEM2.TITLE' : 'Tarot',
          'ITEM2.MARK1' : 'Consultar Tarot',
          'ITEM2.MARK2' : 'Tarot Grátis',
          'ITEM2.MARK3' : 'Simpatias poderosas',
          'ITEM2.MARK4' : 'Leitura de Tarot',
          'ITEM2.IMAGE' : 'http://gosteiclub-12bd.kxcdn.com/images/mark2_videncia.jpg',

          'ITEM3.TITLE' : 'Melhore sua Vida',
          'ITEM3.MARK1' : 'Simpatias poderosas para o amor',
          'ITEM3.MARK2' : 'Melhore seus relacionamentos',
          'ITEM3.MARK3' : 'Arrume um novo emprego',
          'ITEM3.MARK4' : 'Tenha um novo romance',
          'ITEM3.IMAGE' : 'http://gosteiclub-12bd.kxcdn.com/images/mark3_videncia.jpg'
        };
      }

      return {

        'TITLE' : 'DE GRAÇA?',
        'DESC' : 'Sim, de graça. Nosso objetivo é levar as melhores oportunidades para os participantes do nosso clube. Seja um novo trabalho, uma revenda, ou qualquer outra oportunidade na internet que  ajude nossos usuários! Veja algumas coisas que você pode revender!',

        'ITEM1.TITLE' : 'Roupas e Acessórios',
        'ITEM1.MARK1' : 'Camisetas, Camisas',
        'ITEM1.MARK2' : 'Vestidos, Saias, Bijuterias',
        'ITEM1.MARK3' : 'Bonés, Chapéus, Perfumes',
        'ITEM1.MARK4' : 'Muitos outros...',
        'ITEM1.IMAGE' : 'http://gosteiclub-12bd.kxcdn.com/images/xtra/1.jpg',

        'ITEM2.TITLE' : 'Eletrônicos e Gadgets',
        'ITEM2.MARK1' : 'Mouse, Mouse Pad',
        'ITEM2.MARK2' : 'Teclados, Mp3 Players',
        'ITEM2.MARK3' : 'Relógios, Fones',
        'ITEM2.MARK4' : 'Entre outros...',
        'ITEM2.IMAGE' : 'http://gosteiclub-12bd.kxcdn.com/images/xtra/2.jpg',

        'ITEM3.TITLE' : 'Comidas, bebidas e itens de limpeza',
        'ITEM3.MARK1' : 'Sucos, Refrigerantes',
        'ITEM3.MARK2' : 'Gelatinas e Doces',
        'ITEM3.MARK3' : 'Produtos de Limpeza',
        'ITEM3.MARK4' : 'E muito mais...',
        'ITEM3.IMAGE' : 'http://gosteiclub-12bd.kxcdn.com/images/xtra/3.jpg'
      };
    };







    this.getMain = function(code){


      switch (code){

        case 'pt-BR-RVD':

          return  {

            'TERMS' : 'Termos e Condições',
            'TITLE' : 'Ganhe Dinheiro sendo um super revendedor!',
            'DESC' : 'Faça parte do nosso clube de Oportunidades e descubra todas as revendas disponíveis no mercado para você aumentar a sua renda trabalhando de casa!',
            'TITLE_LOGIN_BOX' : 'Digite seu email para entrar!',
            'CHECKOUT_LINK' : 'ou cadastre-se',
            'BOX_DESC' : 'O Gostei é 100% Grátis. Participe!',
            'ACCESS_ACCOUNT' : 'ou acesse sua conta',
            'AGREE_WITH' : 'Concordo com os ',
            'TERMS_CONDITIONS' : 'Termos e Condições',
            'ACCEPT_EMAILS' : 'e aceito receber emails do gostei.club',
            'ACCEPT_PARTNERS' : 'Aceito receber oportunidades dos ',
            'PARTNERS' : 'Parceiros'
          };
          break;


        case 'pt-BR-VDC':

          return {

            'TERMS' : 'Termos e Condições',
            'TITLE': 'Descubra agora o seu futuro, é Grátis!',
            'DESC': 'Separamos dentro do nosso Clube de Oportunidades os melhores especialistas para você saber sobre Astrologia, Tarot, Horóscopo, entre outros!',
            'TITLE_LOGIN_BOX': 'Digite seu email para entrar!',
            'CHECKOUT_LINK': 'ou cadastre-se',
            'BOX_DESC': 'O Gostei é 100% Grátis. Participe!',
            'ACCESS_ACCOUNT': 'ou acesse sua conta',
            'AGREE_WITH': 'Concordo com os ',
            'TERMS_CONDITIONS': 'Termos e Condições',
            'ACCEPT_EMAILS' : 'e aceito receber emails do gostei.club',
            'ACCEPT_PARTNERS' : 'Aceito receber oportunidades dos ',
            'PARTNERS' : 'Parceiros'

          }
          break;


        case 'pt-BR-AMT':

          return {

            'TERMS' : 'Termos e Condições',
            'TITLE': 'Receba Produtos Grátis em Casa!',
            'DESC': 'Faça parte do nosso Clube de Oportunidades, receba produtos em casa sem pagar nada e nos conte o que achou!',
            'TITLE_LOGIN_BOX': 'Digite seu email para entrar!',
            'CHECKOUT_LINK': 'ou cadastre-se',
            'BOX_DESC': 'O Gostei é 100% Grátis. Participe!',
            'ACCESS_ACCOUNT': 'ou acesse sua conta',
            'AGREE_WITH': 'Concordo com os ',
            'TERMS_CONDITIONS': 'Termos e Condições',
            'ACCEPT_EMAILS' : 'e aceito receber emails do gostei.club',
            'ACCEPT_PARTNERS' : 'Aceito receber oportunidades dos ',
            'PARTNERS' : 'Parceiros'

          }
          break;

      }

    };




    this.getBrands = function(code) {

      switch (code) {

        case 'pt-BR-RVD':

          return {
            'TITLE': 'ALGUMAS MARCAS QUE TRABALHAMOS',
            'DESC': 'Sempre procuramos bons parceiros, com produtos interessantes, para você trabalhar.'
          };
          break;


        case 'pt-BR-AMT':

          return {
            'TITLE' : 'ALGUMAS MARCAS TESTADAS',
            'DESC' : 'Sempre procuramos bons parceiros, com produtos interessantes, para você testar e nos dizer o que acha.',
          };
          break;

      }
    };





    this.getFooter = function(){
      return {
        'DESC' : '2015. Todos os Direitos Reservados Gostei.club',
        'TERMS_CONDITIONS' : 'Termos e Condições',
        'PRIVACY_POLICY' : 'Política de Privacidade',
        'IWANT_PARTICIPATE' : 'Quero Participar!'
      };
    };





    this.getBgHome = function(code){

      switch (code) {

        case 'pt-BR-RVD':
          return 'http://gosteiclub-12bd.kxcdn.com/images/bg_home_revenda.png';
          break;


        case 'pt-BR-AMT':
          return 'http://gosteiclub-12bd.kxcdn.com/images/bg_home.png';
          break;

        case 'pt-BR-VDC':
          return 'http://gosteiclub-12bd.kxcdn.com/images/bg_home_videncia2.png';
          break;
      }
    };





    this.getOportunity = function (){

      return {
        'TITLE': 'OPORTUNIDADES DO MOMENTO',
        'DESC': 'Veja alguns produtos que estamos testando neste momento e clique para participar: ',
        'UNITIES': 'Unidades',
        'FREE' : 'Grátis'
      };
    };




    this.getTestimonials = function () {

      return {

        'TITLE': 'DEPOIMENTOS',
        'DESC': 'Várias pessoas já foram selecionadas para receber em sua casa, gratuítamente os produtos que enviamos. Faça parte deste clube você também.',

        'ITEM1.NAME': 'Jacira Pacheco',
        'ITEM1.DESC': '"Adorei receber os produtos na minha casa"',
        'ITEM1.IMAGE': 'http://gosteiclub-12bd.kxcdn.com/images/p1.jpg',

        'ITEM2.NAME': 'Alcione Oliveira',
        'ITEM2.DESC': '"Produtos novos na minha casa, sem pagar nada? Claro que quero."',
        'ITEM2.IMAGE': 'http://gosteiclub-12bd.kxcdn.com/images/p2.jpg',

        'ITEM3.NAME': 'Livia Noronha',
        'ITEM3.DESC': '"Realmente chegou. Agora vou me candidatar para todas as oportunidades!"',
        'ITEM3.IMAGE': 'http://gosteiclub-12bd.kxcdn.com/images/p6.jpg',

        'ITEM4.NAME': 'Lais Santana',
        'ITEM4.DESC': '"Nem acreditei, chegou certinho pelos correios!"',
        'ITEM4.IMAGE': 'http://gosteiclub-12bd.kxcdn.com/images/p5.jpg',

        'ITEM5.NAME': 'Lúcia Ferreira',
        'ITEM5.DESC': '"Nada melhor do que participar deste clube testando produtos"',
        'ITEM5.IMAGE': 'http://gosteiclub-12bd.kxcdn.com/images/p7.jpg',

        'ITEM6.NAME': 'Nailce Braga',
        'ITEM6.DESC': '"Gostei dos produtos e a ideia do site é fantástica!"',
        'ITEM6.IMAGE': 'http://gosteiclub-12bd.kxcdn.com/images/p8.jpg'
      };
    };



    this.getHall = function(){

      return {

        'QUESTIONS': 'Perguntas',
        'OPORTUNITIES': 'Oportunidades',
        'BUTTON_IWANT': 'Eu Quero!',
        'FREESAMPLES': 'Amostra Grátis',
        'DELIVERY': 'Entrega',

        'COREG_01' : 'Queremos conhecer melhor você:',
        'COREG_02' : 'Nos ajude a entender quais são suas preferencias:',

        'OPORTUNITY_01' : 'Aumente suas chances de ser escolhido!',
        'OPORTUNITY_02' : 'Escolha as oportunidades que combinam com você e aumente suas chances de ser escolhido:',
        'OPORTUNITY_03' : 'SIM, Eu quero esta Oportunidade!',
        'OPORTUNITY_04' : 'Não tenho interesse',

        'FREESAMPLE_01' : 'Escolha o que deseja receber:',
        'FREESAMPLE_02' : 'Diga e que você gostaria de receber e torça para ser um dos nossos selecionados:',
        'FREESAMPLE_03' : 'Unidades',
        'FREESAMPLE_04' : 'Grátis',
        'FREESAMPLE_05' : 'ESCOLHIDO',
        'FREESAMPLE_06' : 'EU QUERO!',

        'DELIVERY_01' : 'Complete seus dados:',
        'DELIVERY_02' : 'Precisamos das informação para enviar os produtos:'
      };
    };


    this.getHome = function(){

      return {

        'HOME_00': 'Olá',
        'HOME_01': ', bem-vindo ao nosso Clube de Oportunidades',
        'HOME_02': 'Oportunidades',
        'HOME_03': 'O Gostei trabalha pra te oferecer as melhores oportunidades da internet!',
        'HOME_04' : 'SIM, Eu quero esta Oportunidade!',
        'HOME_05': 'Amostras Grátis',
        'HOME_06': 'Veja Abaixo',
        'HOME_07': ' os produtos que você se candidatou para testar e navegue por outras oportunidades que temos para o momento!',
        'HOME_08': 'Unidades',
        'HOME_09': 'Grátis'

      };
    };




    this.getValidation = function(){

      return {

        'EMAIL_NOT_FOUNT': 'Email não cadastrado',
        'LOGIN_FAILED' : 'Erro ao Logar',
        'SIGNUP_FAILED' : 'Erro ao cadastrar',
        'FORM_FAILED' : 'Preencha o formulário',
        'USER_FAILED' : 'Preencha o usuário',
        'FULLNAME_FAILED' : 'Preencha com nome completo',
        'EMAIL_FAILED' : 'Preencha o email',
        'GENDER_FAILED' : 'Preencha o sexo',
        'BIRTH_FAILED' : 'Preencha a Data de Nascimento',
        'BIRTH_DAY_FAILED' : 'Preencha um dia válido',
        'BIRTH_MONTH_FAILED' : 'Preencha um mês válido',
        'CELLPHONE_FAILED' : 'Preencha o celular',
        'ZIPCODE_FAILED' : 'Preencha o cep',
        'NUMBER_FAILED' : 'Preencha o Número',
        'NEIBOR_FAILED' : 'Preencha o bairro',
        'STATE_FAILED' : 'Preencha o estado',
        'CITY_FAILED' : 'Preencha a cidade',
        'STREET_FAILED' : 'Preencha o endereço',
        'DDD_FAILED' : 'Preencha o DDD',
        'ISAGREEWITH' : 'Aceite os Termos e Condições'


      };
    };



    this.$get = [function () {
      return new AppTranslateBR();
    }];

  });
