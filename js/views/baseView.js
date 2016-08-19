define(['backbone', 'doT','text!templatesFolder/header/buscaPedido.html', 'models/task/taskModel'], function (Backbone, doT,BuscaPedidoTemplate, TaskModel) {
    var BaseView = Backbone.View.extend({
        buscaPedidoTemplate: doT.template(BuscaPedidoTemplate),
        model: new TaskModel(),
        notification_wait: function () {
            var notice = new PNotify({
                text: "Por favor aguarde...",
                type: 'info',
                icon: 'fa fa-spinner fa-pulse fa-fw',
                hide: false,
                buttons: {
                    closer: false,
                    sticker: false
                }
            });
            $('body').addClass('window-disable');
            return notice;
        },
        notification_done: function (notice) {
            var options = {
                title: "Feito!",
                type: "success",
                text: "",
                hide: true,
                buttons: {
                    closer: true,
                    sticker: true
                },
                icon: 'fa fa-check'
            };
            $('body').removeClass('window-disable');
            notice.update(options);
        },
        initialize: function (options) {
            //only to build the method afterRender

            _.bindAll(this, 'beforeRender', 'render', 'afterRender');
            obj = this;
            _this = this;
            that = this;
            //only to build the method afterRender
            this.render = _.wrap(this.render, function (render) {
                this.beforeRender();
                render(arguments);
                //////////////////////////
                this.afterRender();
                ////////////////////////////////////////////////
                return this;
            });
        },
        beforeRender: function () {
        },
        afterRender: function(){
            var that = this;
            $('a.buscaPedido').on('click',function() {
                $('.modal-body').empty().append(that.buscaPedidoTemplate({}));
                var self = that;
                $('a.busca-pedido').on('click',function(e) {
                    var idPedido = $('.pedido').val();
                    if(idPedido == '') {
                        new PNotify({
                            title: 'Error',
                            text: "Por favor, indique o número do pedido",
                            type: 'error',
                            hide: true,
                            buttons: {closer: true, sticker: true},
                            icon: 'fa fa-exclamation-circle'
                        });
                        $('.pedido').focus();
                    }
                    else {
                        self.notification_wait();
                        self.model.buscaPedido(idPedido);
                    }
                });
            });
        },
        fetch: function (arg) {
            options = arg;
            options.beforeSend = function (xhr) {
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Content-Type', 'application/json');
            };

            //Call Backbone's fetch
            return Backbone.Model.prototype.fetch.call(this, options);
        }
    });
    return BaseView;
});
