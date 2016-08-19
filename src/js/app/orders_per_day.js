function drawChart(orders) {

    google.charts.setOnLoadCallback(drawStacked);

    function drawStacked() {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Mês');
        data.addColumn('number', 'Pedidos');

        var rows = [];

        $.each(orders, function (index, obj) {
            var row = [
                new Date(obj['date']),
                obj['total']
            ];
            rows.push(row);
        })

        data.addRows(rows);

        var options = {
            title: 'Quantidade de Pedidos por Dia'
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
}

var query = "SELECT COUNT(*) AS total, DATE(data_de_compra) AS date FROM pedidos GROUP BY date";
mysqlQuery(query, function (result) {
    var orders = JSON.parse(result);
    drawChart(orders);
});