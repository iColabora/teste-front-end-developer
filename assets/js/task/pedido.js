import consultaCep from './../util/cep.js';
import {alertError, alertSuccess} from './../util/alerts.js';
import mysqlQuery from './../util/mysql_lib';
import moment from 'moment';
import {tmpTrMateriais} from './materiais.js';
import {tmpTrInsumos} from './insumos.js';

export default function formPedido() {
    
    $('[name="pedido-cep"]').on('keyup', function() {
        var $this = $(this);
        if($this.cleanVal().length == 8) {
            consultaCep($this.cleanVal(), function(json) {
                $('[name="pedido-endereco"]').val(json.logradouro);
                $('[name="pedido-cidade"]').val(json.localidade);
                $('[name="pedido-estado"]').val(json.uf);
                $('[name="pedido-complemento"]').val(json.complemento);
            }, function(error) {
                alertError('Falha ao consultar endereço pelo cep');
            })
        }
    });

    $(".copia-endereco-solicitante").on('click', function() {
        $('[name="pedido-cep"]').val($('[name="solicitante-cep"]').val());
        $('[name="pedido-endereco"]').val($('[name="solicitante-endereco"]').val());
        $('[name="pedido-complemento"]').val($('[name="solicitante-complemento"]').val());
        $('[name="pedido-cidade"]').val($('[name="solicitante-cidade"]').val());
        $('[name="pedido-estado"]').val($('[name="solicitante-estado"]').val());
    });

    $('.buscar').attr('disabled', 'disabled');
    $('[name="pedido-numero"]').on('keyup', function() {
        if($(this).val() != "")
            $('.buscar').removeAttr('disabled');
    });
    $('.buscar').on('click', function() {
        var $this = $('[name="pedido-numero"]');
        if($this.val() == "") {
            alertError('Para buscar informe o número de pedido.');
            return ;
        }

        var sql = 'SELECT ' +
            ' p.id, p.data_de_compra, p.cep, p.rua, p.bairro, p.cidade, p.estado ' +
            ' FROM pedidos p ' +
            ' WHERE p.id = ' + $this.val();

        mysqlQuery(sql, function(result) {
            var result = JSON.parse(result);
            var obj = result[0];

            if(obj == undefined) {
                alertError('Pedido não existe');
                return ;
            }
            
            $('[name="pedido-data-de-compra"').val(moment(obj.data_de_compra).format('DD/MM/YYYY HH:mm:ss'));
            $('[name="pedido-cep"]').val(obj.cep);
            $('[name="pedido-endereco"]').val(obj.rua);
            $('[name="pedido-cidade"]').val(obj.cidade);
            $('[name="pedido-estado"]').val(obj.estado);

            $('[name="solicitante-cep"]').val(obj.cep);
            $('[name="solicitante-endereco"]').val(obj.rua);
            $('[name="solicitante-cidade"]').val(obj.cidade);
            $('[name="solicitante-estado"]').val(obj.estado);

            var sqlSolicitante = 
                'SELECT ' + 
                ' s.id, s.nome, s.telefone, s.cpf '+
                ' FROM solicitantes s ' +
                ' INNER JOIN pedidos p ON p.id_solicitante = s.id '
                ' WHERE p.id = '+ $this.val();

            mysqlQuery(sqlSolicitante, function(result) {
                var result = JSON.parse(result);
                var obj = result[0];
                $('[name="solicitante-nome"]').val(obj.nome);
                $('[name="solicitante-cpf"]').val(obj.cpf);
                $('[name="solicitante-telefone"]').val(obj.telefone);

                var sqlMateriais = 
                    'SELECT ' + 
                    ' m.nome, m.marca, m.quantidade,  m.preco ' +
                    ' FROM materiais m ' +
                    ' WHERE m.id_pedido = ' + $this.val();

                mysqlQuery(sqlMateriais, function(result) {
                    var result = JSON.parse(result);
                    $("#table-materiais tbody").html('');
                    result.forEach(function(item) {
                        $("#table-materiais tbody").append(
                            tmpTrMateriais(
                                item.nome,
                                item.marca,
                                item.quantidade,
                                item.preco.toString().replace(/\./, ',')
                            )
                        );
                    });
                    

                    var sqlInsumos = 
                        'SELECT ' + 
                        ' i.descricao, i.preco, i.quantidade ' +
                        ' FROM insumos i ' +
                        ' WHERE i.id_pedido = ' + $this.val();
                    
                    mysqlQuery(sqlInsumos, function(result) {
                        var result = JSON.parse(result);
                        $("#table-insumos tbody").html('');
                        result.forEach(function(item) {
                            $("#table-insumos tbody").append(
                                tmpTrInsumos(
                                    item.descricao,
                                    item.descricao,
                                    item.quantidade,
                                    item.preco.toString().replace(/\./, ',')
                                )
                            );
                        });

                        alertSuccess('Pedido encontrado');
                        $('.required').trigger('change');
                    });
                });
            });
        });

    });

    var sqlMateriais = 
        'SELECT ' + 
        ' m.nome, m.marca, m.quantidade,  m.preco ' +
        ' FROM materiais m ' +
        ' WHERE m.id IN(1,2,3,4)';

    mysqlQuery(sqlMateriais, function(result) {
        var result = JSON.parse(result);
        $("#table-materiais tbody").html('');
        result.forEach(function(item) {
            $("#table-materiais tbody").append(
                tmpTrMateriais(
                    item.nome,
                    item.marca,
                    item.quantidade,
                    item.preco.toString().replace(/\./, ',')
                )
            );
        });
        

        
    });

    var sqlInsumos = 
        'SELECT ' + 
        ' i.descricao, i.preco, i.quantidade ' +
        ' FROM insumos i ' +
        ' WHERE i.id IN(1,2)';

    mysqlQuery(sqlInsumos, function(result) {
        var result = JSON.parse(result);
        $("#table-insumos tbody").html('');
        result.forEach(function(item) {
            $("#table-insumos tbody").append(
                tmpTrInsumos(
                    item.descricao,
                    item.descricao,
                    item.quantidade,
                    item.preco.toString().replace(/\./, ',')
                )
            );
        });
    });

    $('#pedido input.required, #pedido select.required').on('keyup change', function() {
        var campos = $('#pedido input.required, #pedido select.required');
        var tabelas = $('#pedido #table-materiais tbody, #pedido #table-insumos tbody');
        var isValid = true;
        
        campos.each(function() {
            var $this = $(this);
            if(/^$/.test($this.val())) {
                isValid = false;
            }
        });

        tabelas.each(function() {
            var $this = $(this);
            if(/^$/.test($this.html())) {
                isValid = false;
            }
        });

        if(!isValid) 
            $('.continua, .extra-insurance').attr('disabled', 'disabled');
        else
            $('.continua, .extra-insurance').removeAttr('disabled');
    });

    $('.continua').on('click', function() {
        console.log($('#pedido').serialize());
        alertSuccess('Prosseguindo para postagem.');
    });

    $('.extra-insurance').on('click', function() {
        console.log($('#pedido').serialize());
        alertSuccess('Prosseguindo para processo de seguro extra.');
    });

}