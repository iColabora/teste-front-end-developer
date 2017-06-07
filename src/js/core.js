var Core = {

    paginatorMenu: null,
    validator: null,
    formPedido: null,

    init: function() {
        var $this = this;

        this.paginatorMenu = new Paginator('.page-change', '.paginator', function(page, showContentFn) {
            $this.pages[page]($this, showContentFn);
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

        String.prototype.replaceAll = function(search, replacement) {
            return this.replace(new RegExp(search, 'g'), replacement);
        }

        this.paginatorMenu.setSelectedPage('dashboard1');
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

    pages: {
        dashboard1: function($this, showContentFn) {
            Database.fetchPedidosPorDia(function(result) {
                result = $this.prepareResultPorDia(result);

                ChartPedidos.init('chartOne', '# pedidos por dia', result.labels, result.data);
                showContentFn();
            });  
        },

        dashboard2: function($this, showContentFn) {
            Database.fetchPedidosPorSolicitantes(function(result) {
                result = $this.prepareResultPorSolicitante(result);

                ChartPedidos.init('chartTwo', '# pedidos por solicitante', result.labels, result.data);
                showContentFn();
            });
        },

        dashboard3: function($this, showContentFn) {
            Database.fetchAllPedidos(function(result) {
                var data = [];

                for (var i in result) {
                    var total = Number(result[i].total_materiais) + Number(result[i].total_insumos);
                    data.push([
                        result[i].numero,
                        result[i].nome,
                        result[i].data_de_compra.replaceAll('-', '/'),
                        'R$ ' + result[i].total_materiais.toFixed(2),
                        'R$ ' + result[i].total_insumos.toFixed(2),
                        'R$ ' + total.toFixed(2)
                    ]);
                }

                $('#table-pedidos').DataTable({
                    columns: [
                        { title: 'Numero' },
                        { title: 'Solicitante' },
                        { title: 'Data de compra' },
                        { title: 'Total em Materiais' },
                        { title: 'Total em Insumos' },
                        { title: 'Total da compra' }
                    ],
                    data: data
                });
                showContentFn();
            });
        },
        
        process: function($this, showContentFn) {

        }
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