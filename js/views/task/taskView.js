define(['views/baseView', 'doT', 'text!templatesFolder/task/task.html','text!templatesFolder/task/insumo.html', 'models/task/taskModel', 'text!templatesFolder/header/header.html','jquery.price_format','jquery-mask','jquery-cpfcnpj'], function (BaseView, doT, TaskTemplate, InsumoTemplate, TaskModel, HeaderTemplate) {
    var TaskView = BaseView.extend({
        el: '#main-wrapper',
        model: new TaskModel(),
        template: doT.template(TaskTemplate),
        headerTemplate: doT.template(HeaderTemplate),
        insumoTemplate: doT.template(InsumoTemplate),
        taskId: null,
        qteInsumos: 1,
        events: {
            'click .add-insumo': '_addInsumo'
        },
        initialize: function (options) {
            BaseView.prototype.initialize.call(this, options); // calling super.initializeMethod()
        },
        _validateTask: function () {
            return true;
        },
        _goBack: function (e) {
            e.preventDefault();
            window.history.back();
        },
        beforeRender: function () {
            BaseView.prototype.beforeRender.call(this); // calling super.afterRenderMethod()
        },
        render: function (taskId) {
            this.taskId = taskId;
            this.model.loading = true;
            BaseView.prototype.render.call(this); // calling super.afterRenderMethod()
            var that = this;
            this.$el.html(this.headerTemplate({}));
            $('.actionbar ul.process').removeClass('hidden');
            var that = this;
            if(this.taskId == null){
                this.$el.append(this.template({}));
            }
            else {
                var notice = this.notification_wait();
            }
            $('input#data_compra').datetimepicker({
                format: 'DD/MM/YYYY',
                locale: 'pt-br'
            });
            $('input.data').click();
            $('input.price').priceFormat({
                prefix: '',
                centsSeparator: ',',
                thousandsSeparator: '.'
            });
            $('input#data_compra').mask('00/00/0000');
            $('.cep').mask('00000-000');
            $('.phone').mask('(00) 00000-0000');
            $('.cpf').mask('000.000.000-00', {reverse: true});
        },
        _addInsumo: function() {
            var that = this;
            this.qteInsumos++;
            $('.insumos').append(this.insumoTemplate({'insumo':this.qteInsumos}));

            $('.close-insumo').on('click',function(e){
                var idInsumo = $(e.currentTarget).data('id');
                $('.insumo-'+idInsumo).remove();
                that.qteInsumos--;
            });
        },
        close: function () {
            this.$el.empty().off();
        }
    });

    return TaskView;
});
