var FormPedido = function(core, showContentFn) {

    var formPedido = null,
        timeoutNumero = null;

    this.init = function() {
        $this = this;

        formPedido = new FormWizard('.form-wizard.form-pedido', {
            numero: {
                rules: 'required',
                keyUp: function(e) {
                    $this.keyUpNumero(e);
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

    this.keyUpNumero = function(e) {
        var $this = this;

        clearTimeout(timeoutNumero);
        timeoutNumero = setTimeout(function() {
            formPedido.setDisabled(['numero', 'data_de_compra']);

            Database.findPedidoByNumero(formPedido.get('numero'), function(result) {
                formPedido.setEnabled(['numero', 'data_de_compra']);
                if (result.length == 1) {
                    formPedido.setValue(result[0]);
                }
            });
        }, 1000);
    }

    this.init();

};