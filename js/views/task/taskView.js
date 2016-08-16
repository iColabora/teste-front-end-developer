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
            'click .add-insumo': '_addInsumo',
            'change .cep': '_validateCEP',
            'change #tel_solicitante': '_validateTel',
            'click #endereco_igual': '_checkMesmoEndereco',
            'change .cpf': '_validateCPF',
        },
        _validateCPF: function(e) {
            var cpfRegex = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/;
            if ($(e.currentTarget).val() === '' || !cpfRegex.test($(e.currentTarget).val())) {
                new PNotify({
                    title: 'Error',
                    text: "CPF inválido",
                    type: 'error',
                    hide: true,
                    buttons: {closer: true, sticker: true},
                    icon: 'fa fa-exclamation-circle'
                });
                $(e.currentTarget).val('');
                return false;
            }
        },
        _validateTel: function(e){
            var foneRegex = /^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [5-9][0-9]{3}-[0-9]{4})$/;
            if ($(e.currentTarget).val() === '' || !foneRegex.test($(e.currentTarget).val())) {
                new PNotify({
                    title: 'Error',
                    text: "Telefone inválido",
                    type: 'error',
                    hide: true,
                    buttons: {closer: true, sticker: true},
                    icon: 'fa fa-exclamation-circle'
                });
                $(e.currentTarget).val('');
                return false;
            }
        },
        initialize: function (options) {
            BaseView.prototype.initialize.call(this, options); // calling super.initializeMethod()
        },
        _checkMesmoEndereco: function(e){
            if(e.currentTarget.checked){
                $(".group-entrega").hide();
            }
            else {
                $(".group-entrega").show();
                $("#cep_entrega").val('');
                $("#end_entrega").val('');
                $('#comp_entrega').val('');
                $("#cidade_entrega").val('');
                $("#estado_entrega").val('');
            }
        },
        _validateCEP: function(e){
            var cep = $(e.currentTarget).val().replace(/[^0-9]/, ""),
                select = $(e.currentTarget).data('info'),
                notice = this.notification_wait();
            if(cep.length!=8){
                notice.remove();
                var options = {
                    title: "Error!",
                    type: "error",
                    text: "Cep "+select+" inválido",
                    hide: true,
                    icon: 'fa fa-exclamation-circle',
                    buttons: {closer: true, sticker: true}
                };
                $(e.currentTarget).val('');
                $('body').removeClass('window-disable');
                notice.update(options);
                return false;
            }
            var url = "http://viacep.com.br/ws/"+cep+"/json/",
                that = this;
            $.getJSON(url, function(response){
                if (response.logradouro == null)
                {
                    notice.remove();
                    var options = {
                        title: "Error!",
                        type: "error",
                        text: "Cep "+select+" não encontrado",
                        hide: true,
                        buttons: {closer: true, sticker: true},
                        icon: 'fa fa-exclamation-circle'
                    };
                    $('body').removeClass('window-disable');
                    notice.update(options);
                    $(e.currentTarget).val('');
                    return false;
                }
                try{
                    $("#end_"+select).val(response.logradouro+" "+response.bairro);
                    $("#cidade_"+select).val(response.localidade);
                    $("#estado_"+select).val(response.uf);
                    that.notification_done(notice);
                }catch(ex){}

            });
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
            $('.phone').mask('(00) 0000-0000');
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
