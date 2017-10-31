import mysql from './../util/mysql_lib.js';
import moment from 'moment';

export default function pedidosPendentes() {

    var query = 'SELECT p.id, s.nome, p.data_de_compra, p.cep, p.rua, p.numero, p.bairro, p.cidade, p.estado, p.pais FROM pedidos p INNER JOIN solicitantes s ON s.id = p.id_solicitante ORDER BY p.data_de_compra ASC';
    mysql(query, function(json) {
        var table = $(".pedidos-pendentes table tbody");

        var pedidos = JSON.parse(json);
        pedidos.forEach(function(pedido){
            var date = moment(pedido.data_de_compra, 'YYYY-MM-DD HH:mm:ii');
            var html = "<tr>" +
                    "<td>" + pedido.id + "</td>" +
                    "<td>" + pedido.nome + "</td>" +
                    "<td>" + date.format('DD/MM/YYYY HH:mm') + "</td>" +
                    "<td>" + 
                        pedido.rua + ', '+ pedido.numero + ' - ' + pedido.bairro + ' - ' +
                        pedido.cidade + ' - ' + pedido.estado + ', CEP: ' + pedido.cep.substr(0,5) + '-' +
                        pedido.cep.substr(5,3) + ' ' + pedido.pais +
                    "</td>" +
                "</tr>";
            
            table.append(html);
        });
    });

}