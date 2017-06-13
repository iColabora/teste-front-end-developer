var FormPedido = function(core, pedido, showContentFn) {

    var formPedido = null,
        timeoutNumero = null,
        id = 0,
        idSolicitante = 0;

    this.init = function() {
        var $this = this;

        formPedido = new FormWizard('.form-wizard.form-pedido', {
            id: {
                keyUp: function(e, field) {
                    $this.keyUpId(e, field);
                },
                hasLoading: true
            },
            data_de_compra: {
                rules: 'required',
                isDate: true,
                onChangeDate: function() {
                    
                }
            }
        }, function() {
            $this.submit();
        });
        showContentFn();
    }

    this.submit = function() {
        var values = formPedido.getAll();
        values.id = id;
        values.idSolicitante = idSolicitante;
        pedido.setData(values);
        core.paginatorForms.setSelectedPage('formSolicitante');
    }

    this.keyUpId = function(e, field) {
        var $this = this;

        if (!field.status) {
            return;
        }

        clearTimeout(timeoutNumero);
        timeoutNumero = setTimeout(function() {
            if (formPedido.get('id') == '') {
                $('.about-pedido').addClass('hide');
                return;
            }

            formPedido.setDisabled(['id', 'data_de_compra']);
            
            formPedido.showLoading('id', 0);

            Database.findPedidoById(formPedido.get('id'), function(result) {
                formPedido.setEnabled(['id']);
                if (result.length == 1) {
                    result = result[0];
                    formPedido.setValue(result);
                    formPedido.verifySubmitEnabled();

                    result.total = result.total_materiais + result.total_insumos;

                    var fieldsPedido = $('.fields-pedido');
                    for (var i in result) {
                        var value = result[i];
                        if (i == 'total_materiais' || i == 'total_insumos' || i == 'total') {
                            value = value.toFixed(2);
                        } 
                        fieldsPedido.find('li[data-field="'+i+'"] span').text(value);
                    }
                    
                    id = result.id;
                    idSolicitante = result.id_solicitante;
                    $('.about-pedido').removeClass('hide');
                } else {
                    id = 0;
                    $('.about-pedido').addClass('hide');
                }
                formPedido.setEnabled(['data_de_compra']);
                formPedido.hideLoading('id', 0);
            });
        }, 1000);
    }

    this.init();

};