import mysql from './../util/mysql_lib.js';
import moment from 'moment';
import chart from 'charts';

export default function pedidosPorDia() {
    var query = 'SELECT DATE(data_de_compra) as data, count(id) as total FROM pedidos GROUP BY  DATE(data_de_compra) ORDER BY DATE(data_de_compra) ASC';
    mysql(query, function(json) {
        var pedidos = JSON.parse(json);

        google.charts.load('current', {'packages':['corechart', 'bar']});
        google.charts.setOnLoadCallback(drawChart);
  
        function drawChart() {

            var graphData = pedidos.map(function(item) {
                return [
                    moment(item.data).format('DD/MM/YYYY'),
                    parseInt(item.total)
                ];
            });

            graphData.unshift(['Solicitantes', 'Qtd. Pedidos']);

            var data = google.visualization.arrayToDataTable(
                graphData
            );

            var options = {
                title: 'Gráfico de Pedidos por Data'
            };
  
            var chart = new google.visualization.ColumnChart(document.getElementsByClassName('pedidos-dia')[0]);

            chart.draw(data, options);
        }
    });

}