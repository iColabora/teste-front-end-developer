google.charts.load("current", {packages : [ "corechart" ]});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

	var mysql_query = "SELECT COUNT(*) AS quantidade, DATE(data_de_compra) AS date FROM pedidos GROUP BY date";

	mysqlQuery(mysql_query, function(result) {
		// mostra o resultado da query
		var obj = JSON.parse(result);

		var data = new google.visualization.DataTable();

		data.addColumn('string', 'Data');
		data.addColumn('number', 'Quantidade');

		var rows = [];

		obj.forEach(function(el) {
			var convertDate = new Date(el.date);
			var formatedDate = (convertDate.getDate() + '/' +  (convertDate.getMonth() + 1) + '/' +  convertDate.getFullYear());
			var row = [ formatedDate, el.quantidade ];
			rows.push(row);
		})

		data.addRows(rows);

		var options = {
			title : 'Quantidade de pedidos por dia',
			is3D : true,
		};

		var chart = new google.visualization.PieChart(document
				.getElementById('piechart_3d'));
		chart.draw(data, options);

	});

}