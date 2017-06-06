window.onload = function(){

			var mysql_query = "SELECT p.*, s.nome AS solicitante FROM pedidos p JOIN solicitantes s ON s.id = p.id_solicitante ORDER BY p.data_de_compra DESC";

		  	mysqlQuery(mysql_query, function(result){
		    	// mostra o resultado da query
		    	var obj = JSON.parse(result);
		    	var table_body =  document.getElementById("conteudo");

			    obj.forEach(function(el){
			    	var convertDate = new Date(el.data_de_compra);
					var formatedDate = (convertDate.getDate() + '/' +  (convertDate.getMonth() + 1) + '/' +  convertDate.getFullYear());

			    	var html_body = "<tr>"+
										"<td>"+el.id+"</td>"+
										"<td>"+el.solicitante+"</td>"+
										"<td>"+formatedDate+"</td>"+
										"<td>"+el.rua+"</td>"+
										"<td>"+el.numero+"</td>"+
										"<td>"+el.cep+"</td>"+
										"<td>"+el.bairro+"</td>"+
										"<td>"+el.cidade+"</td>"+
										"<td>"+el.estado+"</td>"+
										"<td>"+el.pais+"</td>"+
									"</tr>";
					table_body.innerHTML += html_body;
			    });

		  	});
		};