function drawChart(orders) {
    google.charts.setOnLoadCallback(drawStacked);

    function drawStacked() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Solicitante');
        data.addColumn('number', 'Pedidos');

        var rows = [];

        $.each(orders, function (index, obj) {
            var row = [
                obj['nome'],
                obj['total']
            ];
            rows.push(row);
        })

        data.addRows(rows);

        var options = {
            title: 'Quantidade de Pedidos por Solicitante'
        };

        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
}

var query = "SELECT s.id AS id, s.nome AS nome, COUNT(p.id) AS total FROM pedidos p JOIN solicitantes s ON s.id = p.id_solicitante GROUP BY id";
mysqlQuery(query, function (result) {
    var orders = JSON.parse(result);
    drawChart(orders);
});