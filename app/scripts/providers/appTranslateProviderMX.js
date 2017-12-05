'use strict';

angular.module('gosteiclubApp')
  .provider('AppTranslateMX', function () {


    this.getTitle = function(){

      return 'Me gusta - Su club de oportunidades'

    };


    this.getLogo = function(){
      return 'http://gosteiclub-12bd.kxcdn.com/images/logo_MX.png';
    };


    this.getFields = function(){

      return {
        'BUTTON_ENTER': 'Entrar',
        'BUTTON_ICO_NAME': 'Quiero participar',
        'BUTTON_IWANT': '¡Quiero!',
        'BUTTON_NEXT': 'Siguiente paso',
        'BUTTON_FINISH': 'Terminar mi registro',
        'GENDER_M': 'Hombre',
        'GENDER_W': 'Mujer',
        'GENDER': 'Género',
        'EMAIL': 'Correo electrónico',
        'FULL_NAME': 'Apellido/ Nombre',
        'BIRTH': 'Fecha de nacimiento',
        'CELLPHONE': 'Teléfono celular',
        'TELEPHONE': 'Teléfono',
        'ZIPCODE': 'Código postal',
        'NUMBER': 'Número',
        'STREET': 'Dirección',
        'NEIBOR': 'Barrio',
        'COMPL': 'Complemento',
        'STATE': 'Comunidad Autónoma',
        'CITY': 'Ciudad',
        'BIRTHMASK' : 'dd/mm/aaaa',
        'NAME' : 'Ciudad',
        'LASTNAME': 'Nombre'
      };
    };



    this.getMenuItems = function(){

      return {
        'ITSFREE_NAME': 'Gratis?',
        'ITSFREE_HREF': '#degraca',
        'FREESAMPLES_NAME': 'Muestras gratuitas',
        'FREESAMPLES_HREF': '#amostras',
        'OPORTUNITY_NAME': 'Oportunidades',
        'OPORTUNITY_HREF': '#oportunidade',
        'TESTIMONIALS_NAME': 'Testimonio',
        'TESTIMONIALS_HREF': '#depoimentos',
        'BRANDS_NAME': 'Marcas',
        'BRANDS_HREF': '#marcas',
        'IWANT_PARTICIPATE' : 'Quiero participar'
      };
    };



    this.getItsFree = function(){

      return {

        'TITLE' : 'GRATIS?',
        'DESC' : 'Si, gratis. Nuestra meta es compartir tu opinión en la calidad de los productos a todos los miembros de nuestra comunidad de testadores. Queremos hacer descubrirte marcas, con toda transparencia y ayudarte a comprar en el cotidiano.',

        'ITEM1.TITLE' : 'Ropa y accesorios',
        'ITEM1.MARK1' : 'Camisas y camisetas',
        'ITEM1.MARK2' : 'Vestidos, faldas, joyas',
        'ITEM1.MARK3' : 'Gorras, gorros, perfumes',
        'ITEM1.MARK4' : 'Aún más...',
        'ITEM1.IMAGE' : 'http://gosteiclub-12bd.kxcdn.com/images/xtra/1.jpg',

        'ITEM2.TITLE' : 'Electrónico y gadget',
        'ITEM2.MARK1' : 'Ratón, pad',
        'ITEM2.MARK2' : 'Teclado, Lector de MP3',
        'ITEM2.MARK3' : 'Reloj, auriculares',
        'ITEM2.MARK4' : 'Entre otros...',
        'ITEM2.IMAGE' : 'http://gosteiclub-12bd.kxcdn.com/images/xtra/2.jpg',

        'ITEM3.TITLE' : 'Alimentos, bebidas, productos de limpieza',
        'ITEM3.MARK1' : 'Zumos, soda',
        'ITEM3.MARK2' : 'Postres',
        'ITEM3.MARK3' : 'Productos domesticos',
        'ITEM3.MARK4' : 'Y mucho más...',
        'ITEM3.IMAGE' : 'http://gosteiclub-12bd.kxcdn.com/images/xtra/3.jpg'
      };
    };







    this.getMain = function(){

          return  {

            'TERMS' : 'Política de privacidad',
            'TITLE': 'Recibe gratuitamente tus productos a casa',
            'DESC' : '¡Sé parte de nuestro Club de Oportunidades, recibe produtos en casa sin pagar nada y comparte tu opinión con nosotros!',
            'TITLE_LOGIN_BOX' : 'Introduce tu correo electrónico para entrar',
            'CHECKOUT_LINK' : 'o regístrate',
            'BOX_DESC' : 'Me Gusta es 100% gratis',
            'ACCESS_ACCOUNT' : 'O acceder a mi cuenta',
            'AGREE_WITH' : 'Acepto las ',
            'TERMS_CONDITIONS' : 'condiciones generales de venta ',
            'ACCEPT_EMAILS' : 'y acepto recibir correos de Me Gusta',
            'ACCEPT_PARTNERS' : 'Acepto recibir las ofertas del  ',
            'PARTNERS' : 'Patrocinador'

          };
    };




    this.getBrands = function() {

          return {
            'TITLE': 'QUELQUES MARQUES TESTÉES',
            'DESC': 'Estamos siempre buscando nuevos socios, con productos interesantes, para que puedas testar y darnos tu opinión.'
          };

    };





    this.getFooter = function(){
      return {
        'DESC' : '2016. Todos los Derechos Reservados Megusta.com.mx',
        'TERMS_CONDITIONS' : 'Condiciones generles de venta',
        'PRIVACY_POLICY' : 'Protección de los dados',
        'IWANT_PARTICIPATE' : '¡Quiero participar !'
      };
    };





    this.getBgHome = function(){
      return 'http://gosteiclub-12bd.kxcdn.com/images/bonecos_home_mx.png';
    };





    this.getOportunity = function (){

      return {
        'TITLE': 'OPORTUNIDADES DEL MOMENTO',
        'DESC': 'Echa un vistazo a los productos que testamos et haz clic para participar.',
        'UNITIES': 'unidades',
        'FREE' : 'gratuitas'
      };
    };




    this.getTestimonials = function () {

      return {

        'TITLE': 'TESTIMONIOS',
        'DESC': 'Varias personas ya han sido selecionadas para recibir a casa, de manera totalmente gratuita, los productos que hacemos testar. Sé parte tu tambien de nuestra comunidad de testadores.',

        'ITEM1.NAME': 'Maria Lopez',
        'ITEM1.DESC': '“Me encantó recibir productos directamente a mi casa”',
        'ITEM1.IMAGE': 'http://gosteiclub-12bd.kxcdn.com/images/p1.jpg',

        'ITEM2.NAME': 'Rocio León',
        'ITEM2.DESC': '“ ¿Productos exclusivos, sin pagar nada? ¡Que encanto!”',
        'ITEM2.IMAGE': 'http://gosteiclub-12bd.kxcdn.com/images/p2.jpg',

        'ITEM3.NAME': 'Mari Luz Paredes ',
        'ITEM3.DESC': '“A la diferencia de otras paginas web, los productos fueron enviados de verdad. Entonces he vuelto a intentar de ganar otros productos!”',
        'ITEM3.IMAGE': 'http://gosteiclub-12bd.kxcdn.com/images/p6.jpg',

        'ITEM4.NAME': 'Lidia Puertas',
        'ITEM4.DESC': '“Por muy increíble que pueda parecer, no es estafa, recibí los productos de verdad”',
        'ITEM4.IMAGE': 'http://gosteiclub-12bd.kxcdn.com/images/p5.jpg',

        'ITEM5.NAME': 'Gloria Gomez',
        'ITEM5.DESC': '“¡Me ha encantado recebir nuevos productos para probar gratuitamente ! Gracias :)”',
        'ITEM5.IMAGE': 'http://gosteiclub-12bd.kxcdn.com/images/p7.jpg',

        'ITEM6.NAME': 'Patrícia Perez',
        'ITEM6.DESC': '“Me encantaron los productos e el concept de la págína web!”',
        'ITEM6.IMAGE': 'http://gosteiclub-12bd.kxcdn.com/images/p8.jpg'
      };
    };

    this.getHall = function(){

      return {

        'QUESTIONS': 'Preguntas',
        'OPORTUNITIES': 'Oportunidades',
        'BUTTON_IWANT': '¡Quiero!',
        'FREESAMPLES': 'Muestras Gratuítas',
        'DELIVERY': 'Entrega',

        'COREG_01' : 'Queremos saber más sobre tí',
        'COREG_02' : 'Ayudános a entender mejor tus intereses',

        'OPORTUNITY_01' : 'Aumenta tus posibilidades de estar seleccionado(a)',
        'OPORTUNITY_02' : 'Elige una de las oportunidades que te coresponden y aumenta tus posibilidades de ser seleccionado(a)',
        'OPORTUNITY_03' : 'Si, quiero beneficiarme de esta oportunidad',
        'OPORTUNITY_04' : 'No me interesa',

        'FREESAMPLE_01' : 'Elige lo que quieres recibir',
        'FREESAMPLE_02' : 'Díme lo que tu gustaría recibir para esperar hacer parte de las personas seleccionadas',
        'FREESAMPLE_03' : 'unidades',
        'FREESAMPLE_04' : 'gratuitas',
        'FREESAMPLE_05' : 'ELIGE',
        'FREESAMPLE_06' : 'QUIERO',

        'DELIVERY_01' : 'Completa las informaciones',
        'DELIVERY_02' : 'Necesitamos estas informaciones para mandarte los productos'
      };
    };



    this.getHome = function(){

      return {

        'HOME_00': 'Buenos dias',
        'HOME_01': ', bienvenido a nuestro Club de Oportunidades',
        'HOME_02': 'Oportunidades',
        'HOME_03': 'Trabajamos para oferecerte las mejores astucias del web.',
        'HOME_04' : '¡Si, quiero esta oportunidad!',
        'HOME_05': 'Muestras Gratuítas',
        'HOME_06': 'Aqui encontrarás',
        'HOME_07': ' el listado de productos que has deseado recibir.  ¡No dudes en echar un vistazo a las demás oportunidades del momento!',
        'HOME_08': 'unidades',
        'HOME_09': 'gratuitas'

      };
    };



    this.getValidation = function(){

      return {

        'EMAIL_NOT_FOUNT': 'Correo no reconocido',
        'LOGIN_FAILED' : 'Error al introducir tu correo electrónico',
        'SIGNUP_FAILED' : 'Error al registrarse',
        'FORM_FAILED' : 'Rellena el formulário',
        'USER_FAILED' : 'Rellena el usuario',
        'FULLNAME_FAILED' : 'Rellena el apellido completo',
        'EMAIL_FAILED' : 'Rellena el correo electrónico',
        'GENDER_FAILED' : 'Rellena el Genero',
        'BIRTH_FAILED' : 'Rellena la fecha de nacimiento',
        'BIRTH_DAY_FAILED' : 'Rellena un día valido',
        'BIRTH_MONTH_FAILED' : 'Rellena un mes valido',
        'TELEPHONE_FAILED' : 'Rellena el número de teléfono',
        'CELLPHONE_FAILED' : 'Rellena el número de celular',
        'ZIPCODE_FAILED' : 'Rellena el código postal',
        'NUMBER_FAILED' : 'Rellena los números',
        'CITY_FAILED' : 'Rellena la Ciudad',
        'STREET_FAILED' : 'Rellena la dirección postal',
        'DDD_FAILED' : 'Rellena la comunidad autónoma',
        'ISAGREEWITH' : 'Acepta los términos y condiciones'

      };
    };


    this.$get = [function () {
      return new AppTranslateMX();
    }];

  });
