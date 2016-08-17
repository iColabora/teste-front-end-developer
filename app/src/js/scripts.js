;(function($) {

  var Init = {

    $height: ($(window).height() - 230) + "px",        
        
    construct: function(){

      this.minHeightWrap();
      this.search();

    },  

    minHeightWrap: function(){
                                    
        $('#wrap').css("min-height", this.$height);        

        $(window).resize(function(){

          heig = ($(window).height() - 230) + "px";

          $('#wrap').css("min-height", heig);
        })         
                    
    },

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

  };

  var $init = Init;
  $init.construct();
  console.log($init);

})(jQuery);