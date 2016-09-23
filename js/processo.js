$(document).ready(function () {

    maskElements();

    $("#buscarPedido").click(function () {
        var idPedido = $('#inputBusca').val();
        buscaPedido(idPedido);
    })

    $('.btnPrev').click(function () {
        $('.nav-tabs > .active').prev('li').find('a').trigger('click');
    });

    $('#btnNextPedido').click(function () {
        if (formValidate($('#formPedido'))) {
            $('.tab-item').removeClass('active');
            $('#insumos-tab').attr('data-toggle', "tab");
            $('#insumos-tab').parent().fadeIn();
            $('#insumos-tab').tab('show');
        }
        ;
    });

    $('#btnNextInsumo').click(function () {
        if ($('.table-insumos tr').length >= 3) {
            if (formValidate($('#formInsumos'))) {
                $('.tab-item').removeClass('active');
                $('#solicitante-tab').attr('data-toggle', "tab");
                $('#solicitante-tab').parent().fadeIn();
                $('#solicitante-tab').tab('show');
                $('#alertInsumos').hide();
            }
        } else {
            $('#alertInsumos').show();
        }
    });

    $('#btnNextSolic').click(function () {
        if (formValidate($('#formSolicitante'))) {
            $('.tab-item').removeClass('active');
            $('#entrega-tab').attr('data-toggle', "tab");
            $('#entrega-tab').parent().fadeIn();
            $('#entrega-tab').tab('show');
        }
        ;
    });

    $('#btnNextEntrega').click(function () {
        if (formValidate($('#formEntrega'))) {
            $('.tab-item').removeClass('active');
            $('#finalizado-tab').attr('data-toggle', "tab");
            $('#finalizado-tab').parent().fadeIn();
            $('#finalizado-tab').tab('show');
        }
        ;
    });

    $("#pedidoDataCompra").datepicker({
        dateFormat: 'dd/mm/yy',
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        changeMonth: true,
        changeYear: true
    });

    $('.remove-insumo').click(function (e) {
        e.preventDefault();
        $(this).closest('tr').remove();
    });

    $('.tab').tab();



    $('#btnBuscaCepSolic').click(function () {
        var cep = $("#solicCep");
        var rua = $("#solicEndereco");
        var comp = $("#solicComp");
        var est = $("#solicEstado");
        var cidade = $("#solicCidade");
        var alertDiv = $("#alertSolic");
        buscaCep(cep, rua, comp, est, cidade, alertDiv);
    });

    $('#btnBuscaCepEnt').click(function () {
        var cep = $("#entregaCep");
        var rua = $("#entregaEndereco");
        var comp = $("#entregaComp");
        var est = $("#entregaEstado");
        var cidade = $("#entregaCidade");
        var alertDiv = $("#alertEntrega");
        buscaCep(cep, rua, comp, est, cidade, alertDiv);
    });

    $("#mesmoEndereco").on('change', function () {
        var bMesmoEnd = $(this).prop('checked');
        mesmoEndereco(bMesmoEnd);
    });

    $('#incluirInsumo').click(function () {
        addInsumo();
    })
});

function buscaPedido(idPedido) {
    var query = "SELECT\n\
                     p.id, p.data_de_compra, p.cep, p.rua, p.numero,\n\
                     p.bairro, p.cidade, p.estado, s.nome, s.telefone \n\
                FROM \n\
                    pedidos p \n\
                        INNER JOIN solicitantes s ON s.id = p.id_solicitante \n\
                WHERE \n\
                    p.id = " + idPedido;
    mysqlQuery(query, function (result) {
         var obj = JSON.parse(result);         
        if (obj.length > 0) {
            $('#alertPedido').hide();
            obj = obj[0];            
            $('#modalPedidoLabel').html('Pedido ' + obj.id);
            $('#resBuscaIdpedido').val(obj.id);
            $('#resBuscaDataCompra').val(obj.data_de_compra);
            $('#resBuscaNome').val(obj.nome);
            $('#resBuscaTel').val(obj.telefone);
            $('#resBuscaRua').val(obj.rua);
            $('#resBuscaNumero').val(obj.numero);
            $('#resBuscaBairro').val(obj.bairro);
            $('#resBuscaCidade').val(obj.cidade);
            $('#resBuscaEstado').val(obj.estado);
            $('#modalPedido').modal('show');
        } else {
            $('#alertPedido').show();
        }

    });

}

function addInsumo() {
    if (formValidate($('#formInsumos'))) {
        var form = formSerialize($('#formInsumos'));
        var marca_desc = $('#insumoMarca option:selected').text();
        var valor = '';
        if (form.insumoPreco.indexOf(',') > -1) {
            valor = form.insumoPreco;
        } else {
            valor = form.insumoPreco + ',00';
        }
        var row = "<tr><td><a href='#' class='remove-insumo'><span class='glyphicon glyphicon-remove'></span></a></td><td>" + marca_desc + "</td><td>" + form.insumoDesc + "</td><td>" + form.insumoQnt + "</td><td>" + valor + "</td></tr>";
        $('#tBodyInsumo').append(row);
    }
}

function formValidate(form) {
    var formArray = form.serializeArray();
    var erro = 0;
    for (var i in formArray) {
        var el = $('#' + formArray[i].name);
        if ((!el.hasClass('not-required')) && (el.val() == '' || el.val() == null)) {
            el.parent().removeClass('has-success');
            el.parent().addClass('has-error');
            erro++;
        } else {
            el.parent().removeClass('has-error');
            el.parent().addClass('has-success');
        }
    }
    if (erro == 0) {
        return true;
    } else {
        return false;
    }
}

function maskElements() {

    $('.preco').mask('000.000.000.000.000,00', {reverse: true});
    $('.cep').mask('00000-000', {reverse: false});
    $('#solicCpf').mask('000.000.000-00', {reverse: true});
    $('#solicTel').mask('(00) 0000-0000', {reverse: false});
}

function formSerialize(form) {
    form = form.serializeArray();
    var form_values = new Array();
    for (var i in form) {
        form_values[form[i].name] = form[i].value;
    }
    return form_values;
    ;
}

function mesmoEndereco(isSame) {
    if (isSame) {
        var cep = $("#solicCep").val();
        var rua = $("#solicEndereco").val();
        var comp = $("#solicComp").val();
        var est = $("#solicEstado").val();
        var cidade = $("#solicCidade").val();
        $("#entregaCep").val(cep);
        $("#entregaEndereco").val(rua);
        $("#entregaComp").val(comp);
        $("#entregaEstado").val(est);
        $("#entregaCidade").val(cidade);
    } else {
        $("#entregaCep").val("");
        $("#entregaEndereco").val("");
        $("#entregaComp").val("");
        $("#entregaEstado").val("");
        $("#entregaCidade").val("");
    }
}

function buscaCep(cep, rua, comp, est, cidade, alertDiv) {
    var nCep = cep.val();
    $.ajax({
        type: 'GET',
        url: "https://viacep.com.br/ws/" + nCep + "/json/",
        success: function (data) {
            $('.p-loading').hide();
            $(alertDiv).hide();
            if (!data.erro) {
                $(rua).val(data.logradouro);
                $(comp).val(data.complemento);
                $(est).val(data.uf);
                $(cidade).val(data.localidade);
            } else {
                $(alertDiv).show();
            }
        },
        error: function () {
            $('.p-loading').hide();
            $(alertDiv).show();
        },
        beforeSend: function () {
            $('.p-loading').show();
        }
    });
}
