define(['backbone', 'models/baseModel'], function (Backbone, BaseModel) {
    var taskModel = BaseModel.extend({
        data: '',
        addPedido: function(data) {
            //var mysql_query = "INSERT INTO solicitantes(nome,telefone,cpf,cep,rua,numero,bairro,cidade,estado,pais) VALUES('" +
            //    data.nome_solicitante+"','"+
            //    data.tel_solicitante+"','"+
            //    data.cpf_solicitante+"','"+
            //    data.cep_solicitante+"','"+
            //    data.end_solicitante+"',"+
            //    data.no_end_solicitante+",'"+
            //    data.bairro_solicitante+"','"+
            //    data.cidade_solicitante+"','"+
            //    data.estado_solicitante+"','Brasil');"
            //
            //console.log(mysql_query);
            //
            //
            //mysqlQuery(mysql_query, function(result){
            //    var obj = JSON.parse(result);
            //    console.log(result);
            //});
        },
        selectTodosPedidos: function() {
            var mysql_query = "SELECT * FROM pedidos";
            mysqlQuery(mysql_query, function(result){
                // mostra o resultado da query
                var obj = JSON.parse(result);
                return obj;
            });
        },
        buscaPedido: function(idPedido) {
            var mysql_query = "SELECT * FROM pedidos WHERE id="+idPedido;
            mysqlQuery(mysql_query, function(result){
                // mostra o resultado da query
                var obj = JSON.parse(result);
                if(obj.length == 0) {
                    $('.modal-body .info').text("Não existe o pedido "+idPedido);
                }
                else {
                    $('.modal-body .info').empty().html(
                        '<strong>Data do pedido:</strong> '+obj[0].data_de_compra+'<br>'+
                        '<strong>Destino: </strong>'+
                        obj[0].rua+' '+obj[0].numero+', Bairro '+obj[0].bairro+'. Cidade: '+obj[0].cidade+' - '+obj[0].estado
                    );
                }
                $('.pedido').val('');
                PNotify.removeAll();
                $('body').addClass('window-disable');
            });
        },
        parse: function (response) {
            return response.result;
        }
    });

    return taskModel;
});