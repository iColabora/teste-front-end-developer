window.onload = function(){

	var mysql_query = "SELECT * FROM pedido ORDER BY nome DESC";

  	mysqlQuery(mysql_query, function(result){
    	// mostra o resultado da query
    	var obj = JSON.parse(result);
    	var table_body =  document.getElementById("conteudo");

	    obj.forEach(function(el){
	    	var html_body = "<tr>"+
								"<td>"+el.id+"</td>"+
								"<td>"+el.material+"</td>"+
								"<td>"+el.marca+"</td>"+
								"<td>"+el.datacompra+"</td>"+
								"<td>"+el.quantmaterial+"</td>"+
								"<td>"+el.precototal+"</td>"+
							"</tr>";
			table_body.innerHTML += html_body;
	    });

  	});

  	var mysql_query = "SELECT * FROM insumo ORDER BY nome DESC";

  	mysqlQuery(mysql_query, function(result){
    	// mostra o resultado da query
    	var obj = JSON.parse(result);
    	var table_body =  document.getElementById("conteudo02");

	    obj.forEach(function(el){
	    	var html_body = "<tr>"+
								"<td>"+el.marca+"</td>"+
								"<td>"+el.descricao+"</td>"+
								"<td>"+el.quantidade+"</td>"+
								"<td>"+el.preco+"</td>"+
							"</tr>";
			table_body.innerHTML += html_body;
	    });

  	});

  	var mysql_query = "SELECT * FROM solicitantes ORDER BY nome DESC";

  	mysqlQuery(mysql_query, function(result){
    	// mostra o resultado da query
    	var obj = JSON.parse(result);
    	var table_body =  document.getElementById("conteudo03");

	    obj.forEach(function(el){
	    	var html_body = "<tr>"+
								"<td>"+el.nome+"</td>"+
								"<td>"+el.telefone+"</td>"+
								"<td>"+el.cpf+"</td>"+
								"<td>"+el.cep+"</td>"+
								"<td>"+el.endereco+"</td>"+
								"<td>"+el.complemento+"</td>"+
								"<td>"+el.cidade+"</td>"+
								"<td>"+el.estado+"</td>"+
							"</tr>";
			table_body.innerHTML += html_body;
	    });

  	});

  	var mysql_query = "SELECT * FROM entrega ORDER BY nome DESC";

  	mysqlQuery(mysql_query, function(result){
    	// mostra o resultado da query
    	var obj = JSON.parse(result);
    	var table_body =  document.getElementById("conteudo04");

	    obj.forEach(function(el){
	    	var html_body = "<tr>"+
								"<td>"+el.cep+"</td>"+
								"<td>"+el.endereco+"</td>"+
								"<td>"+el.complemento+"</td>"+
								"<td>"+el.cidade+"</td>"+
								"<td>"+el.estado+"</td>"+
							"</tr>";
			table_body.innerHTML += html_body;
	    });

  	});
  	
};