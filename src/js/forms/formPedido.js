var FormPedido = function(core, showContentFn) {

    var formPedido = null,
        timeoutNumero = null;

    this.init = function() {
        $this = this;

        formPedido = new FormWizard('.form-wizard.form-pedido', {
            numero: {
                rules: 'required',
                keyUp: function(e, field) {
                    $this.keyUpNumero(e, field);
                },
                hasLoading: true
            },
            data_de_compra: {
                rules: 'required',
                isDate: true
            }
        }, function() {
            core.paginatorForms.setSelectedPage('formSolicitante');
        });
    }

    this.keyUpNumero = function(e, field) {
        var $this = this;

        if (!field.status) {
            return;
        }

        clearTimeout(timeoutNumero);
        timeoutNumero = setTimeout(function() {
            if (formPedido.get('numero') == '') {
                $('.about-pedido').addClass('hide');
                return;
            }
            formPedido.setDisabled(['numero', 'data_de_compra']);
            
            formPedido.showLoading('numero');

            Database.findPedidoByNumero(formPedido.get('numero'), function(result) {
                formPedido.setEnabled(['numero']);
                if (result.length == 1) {
                    result = result[0];

                    formPedido.setValue(result);
                    formPedido.verifySubmitEnaled();

                    result.total = result.total_materiais + result.total_insumos;

                    var fieldsPedido = $('.fields-pedido');
                    for (var i in result) {
                        var value = result[i];
                        if (i == 'total_materiais' || i == 'total_insumos' || i == 'total') {
                            value = value.toFixed(2);
                        } 
                        fieldsPedido.find('li[data-field="'+i+'"] span').text(value);
                    }
                    $('.about-pedido').removeClass('hide');
                } else {
                    $('.about-pedido').addClass('hide');
                }
                formPedido.hideLoading('numero');
            });
        }, 1000);
    }

    this.init();

};