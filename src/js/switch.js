$(document).ready(function() {
   $('input[type="radio"]').click(function() {
       if($(this).attr('id') == 'normal-post') {
            $('#check-insurance').show();
       }

       else {
            $('#check-insurance').hide();
       }
   });

 });
