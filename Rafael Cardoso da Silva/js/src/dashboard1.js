function initDashboard1(){
	
	// show submenu 
	$("nav.submenu").hide();
	$("nav#dashboard").show();

	var mysql_query = "SELECT count(*) as pedidos, DATE(data_de_compra) AS data FROM pedidos GROUP BY data_de_compra";

  	mysqlQuery(mysql_query, function(result){
    	var obj = JSON.parse(result);

    	// set callback to chart
	    google.charts.setOnLoadCallback(draw);

	    function draw() {

	        var data = new google.visualization.DataTable();
	        data.addColumn('string', 'Data');
	        data.addColumn('number', 'Pedidos');

	        var rows = [];

	        $.each(obj, function (index, obj) {
	            var row = [
	                obj['data'].substr(0, 10),
	                obj['pedidos']
	            ];
	            rows.push(row);
	        });
	        data.addRows(rows);


	        // show chart
	        var chart = new google.visualization.BarChart( document.getElementById("chart") );
	        chart.draw(data, null);
	    }

  	});

}