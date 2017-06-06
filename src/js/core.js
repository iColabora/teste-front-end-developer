var Core = {

    paginatorMenu: null,
    validator: null,
    formPedido: null,

    init: function() {
        var $this = this;

        this.paginatorMenu = new Paginator('#menu ul a', '.paginator');
        this.paginatorMenu.init();

        Database.fetchAllSolicitantes(function(result) {
            console.log(result);
        });

        /**
         * Form pedido
         */
        this.formPedido = new FormWizard('.form-wizard.form-pedido', {
            data_de_compra: {
                isDate: true
            },
            cep: {
                mask: '00000-000',
                onCompleteMask: function(cep) {
                    $this.searchCep(cep);
                }
            },
            nome: {
                rules: 'required|min:3|max:10'
            },
            rua: {
                rules: 'required|min:3'
            }
        });
    },

    searchCep: function(cep) {
        var $this = this;

        var fieldsAddress = ['rua', 'numero', 'complemento', 'cidade', 'estado'];

        this.formPedido.setDisabled(fieldsAddress);
        CEP.getInfo(cep, function(address) {
            $this.formPedido.setValue(address);
            $this.formPedido.setEnabled(fieldsAddress);
        });
    }

}

Core.init();