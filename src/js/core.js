var Core = {

    paginatorMenu: null,
    validator: null,

    init: function() {
        this.paginatorMenu = new Paginator('#menu ul a', '.paginator');
        this.paginatorMenu.init();

        /**
         * Form pedido
         */
        var formPedido = new FormWizard('.form-wizard.form-pedido', {
            data_de_compra: {
                isDate: true
            },
            cep: {
                mask: '00000-000'
            },
            nome: {
                rules: 'required|min:3|max:10'
            }
        });
    }

}

Core.init();