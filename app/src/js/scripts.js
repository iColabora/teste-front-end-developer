;(function($) {

  var Init = {

    $height: ($(window).height() - 230) + "px",        
    
    /*Função que inicia os serviços*/    
    construct: function(){

      this.minHeightWrap();
      this.search();
      this.menuMobile();

    },  

    /*Função que seta uma altura no wrap*/
    minHeightWrap: function(){
                                    
        $('#wrap').css("min-height", this.$height);        

        $(window).resize(function(){

          heig = ($(window).height() - 230) + "px";

          $('#wrap').css("min-height", heig);
        })         
                    
    },

    /*Função que cria animação na busca*/
    search: function(){

      $('.sch label').click(function(){

        if($('.sch #s').width() === 0){
           $('body').addClass('open-search');
        }
        

      });

      $('.sch #s').focusout(function() {

        var inp = $(this).val();

        if($('body').hasClass('open-search') && inp === ""){
            $('body').removeClass('open-search');            
        }

    });

    },

    /*Função que cria um meu para resolução menor de 991px*/
    menuMobile: function(){

      var menuHTML = '';
            menuHTML += '<ul>';
            menuHTML += '<li>'+$('.app-navbar .nv .op .sch').html()+'</li>';
            menuHTML += $('.app-navbar .nv .menu ul').html();
            menuHTML += $('.app-navbar .nv .op .dropdown .dropdown-menu').html();
            menuHTML += '</ul>';

        var menuMobile = false;

        $(window).resize(function(){

          if($(window).width() <= 991){
            menuMobile = true;
          }

        });

        if(menuMobile === true || ($(window).width() <= 991)){
          $('.menu-mobile').html(menuHTML, function(){

          });
        }
        else{
          $('.menu-mobile').html('');
        }

      $(".btn-menu").click(function () {

        if ($('body').hasClass('open-menu')) {
          $('body').removeClass("open-menu");
        }
        else {
            $('body').addClass("open-menu");
        }

      });

    }

  };

  

  var $init = Init;
  $init.construct();
  console.log($init);

})(jQuery);