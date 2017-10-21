import {alertError} from './../util/alerts.js';

function tableMateriais() {

    /**
     * Materiais
     */
    var table = $("#table-materiais");
    var tableContent = $("#table-materiais tbody");
    var btnTable = $("#table-materiais .btn-adiciona-material");
    btnTable.on('click', function() {
        var campos = $('.dados-material input');

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

        var tmp = tmpTrMateriais(
            $('[name=material-nome]').val(),
            $('[name=material-marca]').val(),
            $('[name=material-quantidade]').val(),
            $('[name=material-preco]').val()
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
    $('.dados-material input').on('keyup', function() {
        var campos = $('.dados-material input');
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

    table.on('click', '.remove-material', function() {
        $(this).closest('tr').remove();
    });

}

function tmpTrMateriais(nome, marca, quantidade, preco) {
    if(!isNaN(preco))
        preco = preco.toString();
    return '<tr>' +
    '   <td>' + nome + '<input type="hidden" name="insumo-nome[]" value="' + nome + '"></td>' +
    '   <td>' + marca + '<input type="hidden" name="insumo-marca[]" value="' + marca + '"></td>' +
    '   <td>' + quantidade + '<input type="hidden" name="insumo-quantidade[]" value="' + quantidade + '"></td>' +
    '   <td>' + preco + '<input type="hidden" name="insumo-preco[]" value="' + preco.replace(/R\$\s/, '').replace(/\./g, '').replace(/\,/, '.') + '"></td>' +
    '   <td><button type="button" class="btn btn-danger reduce remove-material"><span class="glyphicon glyphicon-trash"></span></button></td>' +
    '<tr>';
}

export {tableMateriais, tmpTrMateriais};