var FormInsurance = function(core, pedido, showContentFn) {

    var formInsurance = null,
        valueChecked = '';


    this.init = function() {
        var $this = this;
        formInsurance = $('.form-insurance');

        formInsurance.find('.btn-submit').click(function() {
            $this.submit();
        });

        formInsurance.find('.insurance').on('change', function() {
            valueChecked = $(this).val();
            $this.checkEnabledSubmit();
        });

        showContentFn();
    }

    this.submit = function() {
        pedido.setInsurance(valueChecked);
        core.paginatorForms.setSelectedPage('formResumo');
    }

    this.checkEnabledSubmit = function() {
        if (valueChecked != '') {
            formInsurance.find('.btn-submit').removeAttr('disabled');
        }
    }

    this.init();

}