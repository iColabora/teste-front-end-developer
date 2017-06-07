var Core = {

    paginatorMenu: null,
    validator: null,
    formPedido: null,

    init: function() {
        var $this = this;

        this.paginatorMenu = new Paginator('#menu ul a', '.paginator', function(page, showContentFn) {
            if (page == 'graph1') {
                showContentFn();
            }
        });
        
        this.paginatorMenu.init();

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

        this.createGraphOne();
        this.createGraphTwo();
        this.createTable();
    },

    createTable: function() {
      $('#table-pedidos').DataTable();  
    },

    searchCep: function(cep) {
        var $this = this;

        var fieldsAddress = ['rua', 'numero', 'complemento', 'cidade', 'estado'];

        this.formPedido.setDisabled(fieldsAddress);
        CEP.getInfo(cep, function(address) {
            $this.formPedido.setValue(address);
            $this.formPedido.setEnabled(fieldsAddress);
        });
    },

    createGraphOne: function() {
        $this = this;

        Database.fetchPedidosPorDia(function(result) {
            result = $this.prepareResultPorDia(result);

            ChartPedidos.init('chartOne', '# pedidos por dia', result.labels, result.data);
        });  
    },

    createGraphTwo: function() {
        $this = this;

        Database.fetchPedidosPorSolicitantes(function(result) {
            result = $this.prepareResultPorSolicitante(result);

            ChartPedidos.init('chartTwo', '# pedidos por solicitante', result.labels, result.data);
        });
    },

    prepareResultPorSolicitante: function(result) {
        var ret = {
            labels: [],
            data: []            
        };

        for (var i in result) {
            ret.labels.push(result[i].nome);
            ret.data.push(result[i].total);
        }

        return ret;
    },

    prepareResultPorDia: function(result) {
        var ret = {
            data: [],
            labels: []
        };

        for (var i in result) {
            ret.labels.push(this.prepareNumber(result[i].day));
            ret.data.push(result[i].total);
        }
        
        return ret;
    },

    prepareNumber: function(number) {
        return number < 10 ? "0"+number : number;
    }

}

Core.init();