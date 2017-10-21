import {alertError} from './../util/alerts.js';

function tableInsumos() {

    /**
     * Insumos
     */
    var table = $("#table-insumos");
    var tableContent = $("#table-insumos tbody");
    var btnTable = $("#table-insumos .btn-adiciona-insumo");
    btnTable.on('click', function() {
        var campos = $('.dados-insumo input');

        var isValid = true;
        var message = "";
        campos.each(function() {
            var $this = $(this);
            if(/^$/.test($this.val())) {
                message += $this.attr('placeholder') + ' é obrigatório; <br />';
                $this.closest('.form-group').addClass('has-error');
                isValid = false;
            }
        });

        if(!isValid) {
            alertError(message);
            return ;
        }

        var tmp = tmpTrInsumos(
            $('[name=insumo-nome]').val(),
            $('[name=insumo-marca]').val(),
            $('[name=insumo-quantidade]').val(),
            $('[name=insumo-preco]').val()
        );

        tableContent.find('.remove-me').remove();
        tableContent.append(tmp);

        campos.get(0).focus();
        $(this).attr('disabled', 'disabled');
        campos.each(function() {
            $(this).val('');
        });
    });

    btnTable.attr('disabled', 'disabled');
    $('.dados-insumo input').on('keyup', function() {
        var campos = $('.dados-insumo input');

        var isValid = true;
        campos.each(function() {
            var $this = $(this);
            if(/^$/.test($this.val())) {
                isValid = false;
            }
        });
        if(!isValid) 
            btnTable.attr('disabled', 'disabled');
        else
            btnTable.removeAttr('disabled');
    });

    table.on('click', '.remove-insumo', function() {
        $(this).closest('tr').remove();
    });
}

function tmpTrInsumos(nome, marca, quantidade, preco) {
    if(!isNaN(preco))
        preco = preco.toString();

    return '<tr>' +
    '   <td>' + nome + '<input type="hidden" name="insumo-nome[]" value="' + nome + '"></td>' +
    '   <td>' + marca + '<input type="hidden" name="insumo-marca[]" value="' + marca + '"></td>' +
    '   <td>' + quantidade + '<input type="hidden" name="insumo-quantidade[]" value="' + quantidade + '"></td>' +
    '   <td>' + preco + '<input type="hidden" name="insumo-preco[]" value="' + preco.replace(/R\$\s/, '').replace(/\./g, '').replace(/\,/, '.') + '"></td>' +
    '   <td><button type="button" class="btn btn-danger reduce remove-insumo"><span class="glyphicon glyphicon-trash"></span></button></td>' +
    '<tr>';
}

export {tableInsumos, tmpTrInsumos};