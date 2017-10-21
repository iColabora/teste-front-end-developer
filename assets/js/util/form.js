function formFunctions()
{
    $('.money').mask("R$ #.##0,00", {reverse: true});
    $('.cep').mask("99999-999", {placeholder:"_"});
    $('.cpf').mask("999.999.999-99", {placeholder:"_"});
    $('.datetime').mask("99/99/9999 99:99:99", {placeholder:"_"});
    $('.date').mask("99/99/9999", {placeholder:"_"});
    $('.phone').mask("(99) 99999-9999", {placeholder:"_"});
    $('.phone').on('blur', function() {
        var $this = $(this);
        if($this.cleanVal().length == 10) {
            $this.unmask();
            $this.mask("(99) 9999-9999", {placeholder:"_"});
        } else {
            $this.unmask();
            $this.mask("(99) 99999-9999", {placeholder:"_"});
        }
    });
    $('.phone').on('focus', function() {
        var $this = $(this);
        $this.unmask();
        $this.mask("(99) 99999-9999", {placeholder:"_"});
    });


    $('input').on('keypress', function(event) {
        var tecla = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        
        if($(this).closest('.form-group').length) {
            if($(this).closest('.form-group').hasClass('has-error')) {
                $(this).closest('.form-group').removeClass('has-error');
            }
        }
        
        if (tecla==13) {
            event.preventDefault();
            var nextInput = $("input").get($("input").index(this) + 1);
            if (nextInput) {
               nextInput.focus();
            }
        }
    });
}

export {formFunctions};