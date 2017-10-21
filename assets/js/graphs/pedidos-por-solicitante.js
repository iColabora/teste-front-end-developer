import mysql from './../util/mysql_lib.js';
import moment from 'moment';
import chart from 'charts';

export default function pedidosPorSolicitante() {
    var query = 'SELECT s.nome, count(s.id) total FROM pedidos p INNER JOIN solicitantes s ON s.id = p.id_solicitante GROUP BY s.id';
    mysql(query, function(json) {
        var pedidos = JSON.parse(json);

        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
  
        function drawChart() {

            var graphData = pedidos.map(function(item) {
                return [
                    item.nome,
                    parseInt(item.total)
                ];
            });

            graphData.unshift(['Solicitantes', 'Qtd. Pedidos']);

            var data = google.visualization.arrayToDataTable(
                graphData
            );

            var options = {
                title: 'Gráfico de Pedidos por Solicitantes',
            };
  
            var chart = new google.visualization.PieChart(document.getElementsByClassName('pedidos-solicitante')[0]);

            chart.draw(data, options);
        }
    });

}