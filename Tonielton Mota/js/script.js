$(document).ready(function(){
$("#finding").click(function(){
    $("li").toggleClass("view");
});
});

// Dados do Pedido //

$(document).ready(function(){
	$("#action").click(function(){

		//$("input").focusout(function(){
	    var btn = $("input").val();
	   // });
		if(btn.length != 0) {
			var mysql_query = "SELECT * FROM pedidos inner join materiais On pedidos.id = materiais.id_pedido where materiais.id_pedido = '" + btn + "'  and pedidos.id = " + btn + "  ";
		}

		else {
			var mysql_query = "SELECT * FROM pedidos inner join materiais On pedidos.id = materiais.id_pedido ";
		}

		mysqlQuery(mysql_query, function(result){
		    	// mostra o resultado da query
		    	var obj = JSON.parse(result);
		    	var table_body =  document.getElementById("rel_pedidos");
		    	var html_body = "";
				    obj.forEach(function(el){
				    	html_body = "<tr>"+
											"<td>"+el.id_pedido+"</td>"+
											"<td>"+el.nome+"</td>"+ //Material
											"<td>"+el.marca+"</td>"+
											"<td>"+el.data_de_compra+"</td>"+
											"<td>"+el.quantidade+"</td>"+
											"<td>"+"R$ "+el.preco+"</td>"+
										"</tr>";
						
				    });
				    table_body.innerHTML = html_body;
		  	});
	});
});

// Insumos //

$(document).ready(function(){
	$("#action").click(function(){

		//$("input").focusout(function(){
	    var btn = $("input").val();
	   // });
		if(btn.length != 0) {
			var mysql_query = "SELECT * FROM pedidos inner join insumos On pedidos.id = insumos.id_pedido inner join materiais on pedidos.id = materiais.id_pedido where (materiais.id_pedido = '" + btn + "'  and pedidos.id = '" + btn + "'') and (pedidos.id = insumos.id_pedido) ";
		}

		else {
			var mysql_query = "SELECT * FROM pedidos inner join insumos On pedidos.id = insumos.id_pedido inner join materiais on pedidos.id = materiais.id";
		}

		mysqlQuery(mysql_query, function(result){
		    	// mostra o resultado da query
		    	var obj = JSON.parse(result);
		    	var table_body =  document.getElementById("rel_insumos");
		    	var html_body = "";
				    obj.forEach(function(el){
				    	html_body = "<tr>"+
											"<td>"+el.marca+"</td>"+ //Material
											"<td>"+el.descricao+"</td>"+
											"<td>"+el.quantidade+"</td>"+
											"<td>"+"R$ "+el.preco+"</td>"+
										"</tr>";
						table_body.innerHTML = html_body;
				    });
				 table_body.innerHTML = html_body;
		  	});
	});
});

// Solicitantes //

$(document).ready(function(){
	$("#action").click(function(){

		//$("input").focusout(function(){
	    var btn = $("input").val();
	   // });
		if(btn.length != 0) {
			var mysql_query = "SELECT * FROM pedidos left join solicitantes On pedidos.id_solicitante = solicitantes.id where pedidos.id_solicitante = '" + btn + "' and solicitantes.id = '" + btn + "' ";
		}

		else {
			var mysql_query = "SELECT * FROM pedidos left join solicitantes On pedidos.id_solicitante = solicitantes.id";
		}

		mysqlQuery(mysql_query, function(result){
		    	// mostra o resultado da query
		    	var obj = JSON.parse(result);
		    	var table_body =  document.getElementById("rel_solicitantes");
		    	var html_body = "";
				    obj.forEach(function(el){
				    	 html_body = "<tr>"+
											"<td>"+el.nome+"</td>"+ //Material
											"<td>"+el.telefone+"</td>"+
											"<td>"+el.cpf+"</td>"+
											"<td>"+el.cep+"</td>"+
											"<td>"+el.rua+", "+el.numero+"</td>"+
											"<td>"+el.cidade+"</td>"+
											"<td>"+el.estado+"</td>"+
										"</tr>";
				    });
				table_body.innerHTML = html_body;
		  	});
	});
});

// Entregas //

$(document).ready(function(){
	$("#action").click(function(){

		//$("input").focusout(function(){
	    var btn = $("input").val();
	   // });
		if(btn.length != 0) {
			var mysql_query = "SELECT * FROM pedidos inner join solicitantes On pedidos.id_solicitante = solicitantes.id where pedidos.id_solicitante = '" + btn + "' and solicitantes.id = '" + btn + "' ";
		}

		else {
			var mysql_query = "SELECT * FROM pedidos inner join solicitantes On pedidos.id_solicitante = solicitantes.id";
		}

		mysqlQuery(mysql_query, function(result){
		    	// mostra o resultado da query
		    	var obj = JSON.parse(result);
		    	var table_body =  document.getElementById("rel_entregas");
		    	var html_body = "";
				    obj.forEach(function(el){
				    	html_body = "<tr>"+
											"<td>"+el.cep+"</td>"+
											"<td>"+el.rua+", "+el.numero+"</td>"+
											"<td>"+el.cidade+"</td>"+
											"<td>"+el.estado+"</td>"+
										"</tr>";
				    });
				table_body.innerHTML = html_body;
		  	});
	});
});

// Cálculos //

$(document).ready(function(){
	$("#action").click(function(){

		//$("input").focusout(function(){
	    var btn = $("input").val();
	   // });
		if(btn.length != 0) {
			var mysql_query = "SELECT quantidade, preco, round(quantidade * preco,2) as 'total' FROM pedidos inner join insumos On pedidos.id = insumos.id where pedidos.id = '" + btn + "'";
		}

		else {
			var mysql_query = "SELECT quantidade, preco, round(quantidade * preco,2) as 'total' FROM pedidos inner join insumos On pedidos.id = insumos.id";
		}

		mysqlQuery(mysql_query, function(result){
		    	// mostra o resultado da query
		    	var obj = JSON.parse(result);
		    	var table_body =  document.getElementById("rel_calculos");
		    	var html_body = "";
				    obj.forEach(function(el){
				    	html_body = "<tr>"+
											"<td>"+"R$ "+el.preco+"</td>"+
											"<td>"+el.quantidade+"</td>"+
											"<td>"+"R$ "+el.total+"</td>"+
										"</tr>";
				    });
				table_body.innerHTML = html_body;
		  	});
	});
});