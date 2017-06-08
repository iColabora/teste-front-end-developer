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
                }
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
            formPedido.setDisabled(['numero', 'data_de_compra']);

            Database.findPedidoByNumero(formPedido.get('numero'), function(result) {
                formPedido.setEnabled(['numero']);
                if (result.length == 1) {
                    formPedido.setValue(result[0]);
                    formPedido.verifySubmitEnaled();
                }
            });
        }, 1000);
    }

    this.init();

};