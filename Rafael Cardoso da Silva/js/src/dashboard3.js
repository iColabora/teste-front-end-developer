$(function(){
	
	// show submenu 
	$("nav.submenu").hide();
	$("nav#dashboard").show();

	var mysql_query = "SELECT * FROM solicitantes ORDER BY nome ASC";

  	mysqlQuery(mysql_query, function(result){
    	// mostra o resultado da query
    	var obj = JSON.parse(result);

    	console.log(obj);

  	});

});