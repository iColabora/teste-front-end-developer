google.charts.load("current", {packages : [ "corechart" ]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

	var mysql_query = "SELECT s.id AS id, s.nome AS nome, COUNT(p.id)" +
			"AS quantidade FROM pedidos p JOIN " +
			"solicitantes s ON s.id = p.id_solicitante GROUP BY id";

	mysqlQuery(mysql_query, function(result) {
		// mostra o resultado da query
		var obj = JSON.parse(result);

		var data = new google.visualization.DataTable();

		data.addColumn('string', 'Solicitante');
		data.addColumn('number', 'Quantidade');

		var rows = [];

		obj.forEach(function(el) {
			var row = [ el.nome, el.quantidade ];
			rows.push(row);
		})

		data.addRows(rows);

		var options = {
			title : 'Pedidos por solicitante',
			is3D : true,
		};

		var chart = new google.visualization.PieChart(document
				.getElementById('piechart_3d'));
		chart.draw(data, options);

	});

}