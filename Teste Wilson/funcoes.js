$(document).ready(function(){
	 
    // No id #enviar assim que clicar executa a função
    $('#enviar').click(function(){
 
    /* veja que eu criei variáveis para guardar os item
     * e só precisei usar a função val() para
     * retornar o valor dos campo para a várivel
     */
 
        var nome = $('#nome').val();
        
 		acessa_tabelas(nome);
    // só parar testar coloco as variáveis em um alert, só para verificarmos <img src="https://s.w.org/images/core/emoji/72x72/1f642.png" alt="??" class="emoji" draggable="false">
     //   alert(nome + ' ' + idade);
    });
});
		window.onload = function(){
			var x = 1;
		    var mysql_query1 = "SELECT * FROM pedidos ORDER BY id" ;
			mysqlQuery(mysql_query1, function(result){
						// mostra o resultado da query
						var obj = JSON.parse(result);
						var select = document.getElementById("MyList");
				
						obj.forEach(function(el){

						var opt = el.id;
						var el = document.createElement("option");
						el.textContent = opt;
						el.value = opt;
						select.appendChild(el);
						});
						x = opt;						
						
					});
			
            acessa_tabelas(x);
	
			  
		};
		
		function lista_pedidos() {

            //reload();
    		var pedido_sel = document.getElementById("MyList").value;
    		
            acessa_tabelas(pedido_sel);
            
		}
		function floatToMoneyText(value) {
			var text = (value < 1 ? "0" : "") + Math.floor(value * 100);
			text = "R$ " + text;
			return text.substr(0, text.length - 2) + "," + text.substr(-2);
		}

		
        function acessa_tabelas(pedido){
            
	

			
			var mysql_query = "SELECT * FROM pedidos left JOIN materiais ON pedidos.id = materiais.id_pedido where pedidos.id =  " + pedido;


            var soma = 0;
			var tot_insumos = 0;
			var tot_materiais = 0; 
		  	mysqlQuery(mysql_query, function(result){
		    	// mostra o resultado da query
		    	var obj = JSON.parse(result);
                document.getElementById("pedidos").innerHTML = "";
		    	var table_body =  document.getElementById("pedidos");
				var soma = 0;
			    obj.forEach(function(el){
									
			    	var html_body = "<tr>"+
										"<td>"+el.id+"</td>"+
										"<td>"+el.nome+"</td>"+
										 "<td>"+el.data_de_compra+"</td>" +
										 "<td>"+el.quantidade+"</td>" +
                                        "<td>"+floatToMoneyText(el.preco)+"</td>"										
									"</tr>";
                     tot_materiais += el.quantidade * el.preco;
                                  
					table_body.innerHTML += html_body;
			    });
				
				document.getElementById("valor_pedido").innerHTML = " Total do Pedido = " + floatToMoneyText(tot_materiais);
				
			    
		  	});

			var mysql_query = "SELECT * FROM materiais left JOIN insumos ON materiais.id = insumos.id_material where materiais.id_pedido = " + pedido ;



            var soma = 0;
		  	mysqlQuery(mysql_query, function(result){
		    	// mostra o resultado da query
		    	var obj = JSON.parse(result);
				document.getElementById("conteudo").innerHTML = "";
		    	var table_body =  document.getElementById("conteudo");
				var soma = 0;
			    obj.forEach(function(el){
			    	var html_body = "<tr>"+
										"<td>"+el.marca+"</td>"+
										"<td>"+el.descricao+"</td>"+
										 "<td>"+el.quantidade+"</td>" +
                                        "<td>"+floatToMoneyText(el.preco)+"</td>"										
									"</tr>";
                     tot_insumos += el.quantidade * el.preco;;
                                  
					table_body.innerHTML += html_body;
			    });
					
					 document.getElementById("valor_insumos").innerHTML = " Total de Insumos = " + floatToMoneyText(tot_insumos);					

						    
		  	});
			var mysql_query = "SELECT * FROM solicitantes left join pedidos on pedidos.id_solicitante = solicitantes.id where pedidos.id = " + pedido ;



            var soma = 0;
		  	mysqlQuery(mysql_query, function(result){
		    	// mostra o resultado da query
		    	var obj = JSON.parse(result);
				document.getElementById("solicitante").innerHTML = "";
		    	var table_body =  document.getElementById("solicitante");
				var soma = 0;
			    obj.forEach(function(el){
			    	var html_body = "<tr>"+
										"<td>"+el.nome+"</td>"+
										"<td>"+el.telefone+"</td>"+
										 "<td>"+el.cpf+"</td>" +
                                        "<td>"+el.cep+"</td>" +
										"<td>"+el.rua+"</td>" +
										"<td>"+el.bairro+"</td>" +
										"<td>"+el.cidade+"</td>" +	
										"<td>"+el.estado+"</td>" 	
									"</tr>";
                   
                                  
					table_body.innerHTML += html_body;
			    });
					
						    
		  	});

			  var total = tot_insumos + tot_materiais;
			  document.getElementById("valor_total").innerHTML = " total = " + floatToMoneyText(total);

        }