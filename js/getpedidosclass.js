function createObject(pedidos, solicitantes, materiais, insumos){

	function addSolicitanteToPedido(nPedido, solicitante){
		pedidos[nPedido]["solicitante"] = solicitante;
	}

	function addMaterialToPedido(nPedido, material){
		pedidos[nPedido]["materiais"] = [];
		pedidos[nPedido].materiais.push(material);
	}

	function addInsumoToMaterial(nPedido, idMaterial, insumo){
		for(var i = 0; i<pedidos[nPedido].materiais.length; i++){
			if(pedidos[nPedido].materiais[i].id===idMaterial){
				pedidos[nPedido].materiais[i].insumos.push(insumo);
			}
		}
	}

	for(var i = 0; i<pedidos.length; i++){

		for(var j = 0; j<solicitantes.length; j++){//Verifica quem é o solicitante de cada pedido
			if(pedidos[i].id_solicitante === solicitantes[j].id){
				addSolicitanteToPedido(i, solicitantes[j]);
			}
		}

		for(var j = 0; j<materiais.length; j++){

			if(pedidos[i].id === materiais[j].id_pedido){//Verifica se material faz parte do pedido
				materiais[j]["insumos"] = [];
				addMaterialToPedido(i, materiais[j]);

				//Material foi adicionado, então deve adicionar seus insumos
				for(var k = 0; k<insumos.length; k++){
					if(pedidos[i].id === insumos[k].id_pedido){
						addInsumoToMaterial(i, materiais[j].id, insumos[k]);
					}
				}
			}
		}
	}
	
	return pedidos;
}

function performQuerys(getPedidosQuery, getSolicitantesQuery, getInsumosQuery, getMateriaisQuery, callback){//Realiza as Query de forma síncrona
	var solicitantes;
	var pedidos;
	var insumos;
	var materiais;
	
	mysqlQuery(getSolicitantesQuery, function(result1){
		solicitantes = JSON.parse(result1);
		mysqlQuery(getPedidosQuery, function(result2){
			pedidos = JSON.parse(result2);
			mysqlQuery(getInsumosQuery, function(result3){
				insumos = JSON.parse(result3);
				mysqlQuery(getMateriaisQuery, function(result4){
					materiais = JSON.parse(result4);
					if(typeof callback === "function"){
						console.log()
					}
					callback(createObject(pedidos, solicitantes, materiais, insumos));
				});
			});
		});
	});
}