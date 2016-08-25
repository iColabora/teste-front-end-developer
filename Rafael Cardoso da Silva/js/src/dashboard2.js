function initDashboard2(){

	// show submenu 
	$("nav.submenu").hide();
	$("nav#dashboard").show();
	
	var mysql_query = "SELECT count(*) AS pedidos, s.nome FROM pedidos p JOIN solicitantes s ON p.id_solicitante = s.id GROUP BY s.id";

  	mysqlQuery(mysql_query, function(result){
    	var obj = JSON.parse(result);

    	// set callback to chart
	    google.charts.setOnLoadCallback(draw);

	    function draw() {

	        var data = new google.visualization.DataTable();
	        data.addColumn('string', 'Solicitante');
	        data.addColumn('number', 'Pedidos');

	        var rows = [];

	        $.each(obj, function (index, obj) {
	            var row = [
	                obj['nome'],
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