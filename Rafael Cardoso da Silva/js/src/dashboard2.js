$(function(){

	// show submenu 
	$("nav.submenu").hide();
	$("nav#dashboard").show();
	
	var mysql_query = "SELECT count(*) as pedidos, data_de_compra FROM pedidos GROUP BY id_solicitante";

  	mysqlQuery(mysql_query, function(result){
    	// mostra o resultado da query
    	var obj = JSON.parse(result);

    	console.log(obj);

  	});

});