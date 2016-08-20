define(['views/baseView', 'doT', 'text!templatesFolder/task/task.html','text!templatesFolder/task/insumo.html','jquery.price_format','jquery-mask','jquery-cpfcnpj','jquery.validate'], function (BaseView, doT, TaskTemplate, InsumoTemplate) {
    var TaskView = BaseView.extend({
        el: '#main-wrapper',
        template: doT.template(TaskTemplate),
        insumoTemplate: doT.template(InsumoTemplate),
        taskId: null,
        dataTask: new Object(),
        qteInsumos: 2,
        valorTotal: 0.00,
        events: {
            'click .add-insumo': '_addInsumo',
            'change .cep': '_validateCEP',
            'change #tel_solicitante': '_validateTel',
            'click #endereco_igual': '_checkMesmoEndereco',
            'change .cpf': '_validateCPF',
            'click .btn-submit': '_SubmitForm',
            'change .price': '_valorTotalPedido',
            'change .quantidade': '_valorTotalPedido',
            'click .busca-pedido': '_buscaPedido'
        },
        _valorTotalPedido: function(e){
            var valor_material = ($('#valor_material').val() != '') ? $('#valor_material').val() : 0,
                qtde_material = ($('#qtde_material').val() != '') ? $('#qtde_material').val() : 0,
                valorTotalMaterial = valor_material * qtde_material,
                valorTotalInsumos = 0;
            for(var i = 1; i <= this.qteInsumos; i++) {
                var valor_insumo = ($('#valor_insumo_'+i).val() != '') ? $('#valor_insumo_'+i).val() : 0,
                    qtde_insumo = ($('#qtde_insumo_'+i).val() != '') ? $('#qtde_insumo_'+i).val() : 0;
                valorTotalInsumos += valor_insumo * qtde_insumo;
            }
            var valorTotalPedido = valorTotalMaterial + valorTotalInsumos;
            if(valorTotalPedido != 0)
                $('.total-dinheiro').text(this.roundToTwo(valorTotalPedido));
        },
        roundToTwo: function (num) {
            return +(Math.round(num + "e+2")  + "e-2");
        },
        _SubmitForm: function(e){
            e.preventDefault();
                this.dataTask.material = ($('select#material').val() != null) ? $('select#material').val() : '';
                this.dataTask.marca = $('#marca').val();
                this.dataTask.data_compra = $('#data_compra').val();
                this.dataTask.qtde_material = $('#qtde_material').val();
                this.dataTask.valor_pedido = $('#valor_material').val();
                this.dataTask.nome_solicitante = $('#nome_solicitante').val();
                this.dataTask.cpf_solicitante = $('#cpf_solicitante').val();
                this.dataTask.tel_solicitante = $('#tel_solicitante').val();
                this.dataTask.cep_solicitante = $('#cep_solicitante').val();
                this.dataTask.end_solicitante = $('#end_solicitante').val();
                this.dataTask.no_end_solicitante = $('#no_end_solicitante').val();
                this.dataTask.comp_solicitante = $('#comp_solicitante').val();
                this.dataTask.bairro_solicitante = $('#bairro_solicitante').val();
                this.dataTask.cidade_solicitante = $('#cidade_solicitante').val();
                this.dataTask.estado_solicitante = $('#estado_solicitante').val();
                this.dataTask.cep_entrega = $('#cep_entrega').val();
                this.dataTask.end_entrega = $('#end_entrega').val();
                this.dataTask.no_end_entrega = $('#no_end_entrega').val();
                this.dataTask.bairro_entrega = $('#bairro_entrega').val();
                this.dataTask.comp_entrega = $('#comp_entrega').val();
                this.dataTask.cidade_entrega = $('#cidade_entrega').val();
                this.dataTask.estado_entrega = $('#estado_entrega').val();
            if($('#endereco_igual').is(':checked')){
                this.dataTask.cep_entrega = this.dataTask.cep_solicitante;
                this.dataTask.end_entrega = this.dataTask.end_solicitante;
                this.dataTask.no_end_entrega = this.dataTask.no_end_solicitante;
                this.dataTask.bairro_entrega = this.dataTask.bairro_solicitante;
                this.dataTask.comp_entrega = this.dataTask.comp_solicitante;
                this.dataTask.cidade_entrega = this.dataTask.cidade_solicitante;
                this.dataTask.estado_entrega = this.dataTask.estado_solicitante;
            }
            this.dataTask.insumos = new Array();
            for(var i = 1; i <= this.qteInsumos; i++) {
                this.dataTask.insumos[i-1] = new Object();
                this.dataTask.insumos[i-1].descricao = $('#desc_insumo_'+i).val();
                this.dataTask.insumos[i-1].quantidade = $('#qtde_insumo_'+i).val();
                this.dataTask.insumos[i-1].preco = $('#valor_insumo_'+i).val();
            }
            if($(e.currentTarget).hasClass('disabled')){
                $('.item-task').each(function () {
                    if($(this).prop('required') && ($(this).val() == '' || $(this).val() == null)) {
                        $(this).css('border-color','red');
                    }
                });
                new PNotify({
                    title: 'Error',
                    text: "Prencha todos os campos marcados",
                    type: 'error',
                    hide: true,
                    buttons: {closer: true, sticker: true},
                    icon: 'fa fa-check'
                });
            }
            else {
                var contadorPedidos = localstorage.get('contadorPedidos');
                if (contadorPedidos== undefined) {
                    localstorage.set('contadorPedidos',5);
                    contadorPedidos = localstorage.get('contadorPedidos');
                }
                localstorage.set('contadorPedidos',contadorPedidos+1);
                this.dataTask.idPedido = localstorage.get('contadorPedidos');
                this.model.addPedido(this.dataTask);
            }

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
                $("#end_"+select).val('');
                $("#cidade_"+select).val('');
                $("#estado_"+select).val('');
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
                    $("#end_"+select).val('');
                    $("#cidade_"+select).val('');
                    $("#estado_"+select).val('');
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
        initialize: function (options) {
            BaseView.prototype.initialize.call(this, options); // calling super.initializeMethod()

        },
        render: function () {

            BaseView.prototype.render.call(this);
            var that = this;
            $('.actionbar ul.process').removeClass('hidden');
            $('.navbar-custom .navbar-nav li.dashboard').removeClass('active');
            $('.actionbar ul.dashboard').addClass('hidden');
            this.$el.empty().append(this.template({}));
            $('input#data_compra').datetimepicker({
                format: 'DD/MM/YYYY',
                locale: 'pt-br'
            });
            $('input.data').click();
            $('input.price').priceFormat({
                prefix: '',
                thousandsSeparator: ''
            });
            $('input#data_compra').mask('00/00/0000');
            $('.cep').mask('00000-000');
            $('.phone').mask('(00) 0000-0000');
            $('.cpf').mask('000.000.000-00', {reverse: true});

            $('#task').bind('change keyup', function() {
                if($(this).validate({
                        errorPlacement: function(error,element) {
                            return true;
                        }
                    }).checkForm()) {

                    $('.btn-submit').removeClass('disabled');

                } else {

                    $('.btn-submit').addClass('disabled');

                }
            });
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
            $('input.price').priceFormat({
                prefix: '',
                thousandsSeparator: ''
            });
        },
        close: function () {
            this.$el.empty().off();
        }
    });

    return TaskView;
});
