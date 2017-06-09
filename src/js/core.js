var Core = {

    paginatorMenu: null,
    paginatorForms: null,
    validator: null,
    formPedido: null,
    formSolicitante: null,
    pedido: null,

    init: function() {
        var $this = this;

        this.paginatorMenu = new Paginator('.page-change', '.paginator', function(page, title, showContentFn) {
            $this.pages[page]($this, showContentFn);
        });

        this.paginatorMenu.init();

        String.prototype.replaceAll = function(search, replacement) {
            return this.replace(new RegExp(search, 'g'), replacement);
        }

        this.paginatorMenu.setSelectedPage('dashboard1');

        $('.change-sub-navbar').click(function(){
            
            $this.changeSubNavbar($(this).data('subnavbar'));
        });

        $('.navbar .navbar-nav a').click(function() {
            $('.navbar .navbar-nav li').removeClass('active');
            $(this).addClass('active');
        });
    },

    changeSubNavbar: function(sub) {
        $('.sub-navbar').addClass('hide');
        $('.sub-navbar.'+sub).removeClass('hide');
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
            if (!$this.pedido) {
                $this.pedido = new Pedido();
            }
            
            $this.paginatorForms = new Paginator('--', '.paginator.forms', function(page, title, showContentForms) {
                $this.changeTitleHeader(title);

                if (page == 'formPedido') {
                    if (!$this.formPedido) {
                        $this.formPedido = new FormPedido($this, $this.pedido, showContentForms);   
                    }
                } else if (page == 'formSolicitante') {
                    if (!$this.formSolicitante) {
                        $this.formSolicitante = new FormSolicitante($this, $this.pedido, showContentForms);
                    }
                }
            });

            $this.paginatorForms.init();
            $this.paginatorForms.setSelectedPage('formPedido');

            showContentFn();
        }
    },

    changeTitleHeader: function(title) {
        $('.title-header h2').text(title);
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