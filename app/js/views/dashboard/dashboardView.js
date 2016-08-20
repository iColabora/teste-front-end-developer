define([
    'doT'
            , 'views/baseView'
            , 'text!templatesFolder/dashboard/dashboard.html'
]
        , function (doT, BaseView, DashboardTemplate, HeaderTemplate) {

            var DashboardView = BaseView.extend({
                el: '#main-wrapper',
                template: doT.template(DashboardTemplate),
                events: {
                },
                dasboard: function(e) {
                    e.preventDefault();
                    var select = $(e.currentTarget).data('select');
                    $('.chart').addClass('hidden');
                    $('li.dashboard-selected').removeClass('active');
                    $('.chart'+select).removeClass('hidden');
                    $('.dashboard'+select).addClass('active');
                    switch(select) {
                        case 2:
                            $('.chart2').empty().append('<h2> Pedidos por Solicitante</h2><canvas id="chart2"></canvas>');
                            e.view._this.model.graficoPedidosSolicitantes();
                            break;
                        case 3:
                            $('.chart3').empty().append('<h2> Pedidos Pendentes</h2><table class="table table-d pedidos-pendentes"><thead><tr><th class="no">Número Pedido </th><th class="data">Data </th><th class="destino">Destino </th></tr></thead><tbody><tr><td></td><td>Cargando...</td></tr></tbody></table>');
                            e.view._this.model.selectTodosPedidos();
                            break;
                        default:
                            $('.chart1').empty().append('<h2> Número de Pedidos por Dia</h2><canvas id="chart1"></canvas>');
                            e.view._this.model.graficoPedidosDia();
                    }
                },
                initialize: function (options) {
                    BaseView.prototype.initialize.call(this, options); // calling super.initializeMethod()

                },
                render: function () {

                    BaseView.prototype.render.call(this);
                    this.$el.empty().append(this.template({}));
                    $('.navbar-custom .navbar-nav li.dashboard').addClass('active');
                    $('.actionbar ul.process').addClass('hidden');
                    $('.actionbar ul.dashboard').removeClass('hidden');
                    this.notification_wait();
                    this.model.graficoPedidosDia();


                    $('a.dashboard-selected').on('click', this.dasboard);
                },
                close: function () {
                    this.$el.empty().off();
                }

            });

            return DashboardView;

        });
