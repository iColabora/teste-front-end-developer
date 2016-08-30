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

function makeRoundImage(imgOb){
	$(imgOb).css({
		'display': 'block',
		'-moz-border-radius': ($(imgOb).height()/2)+'px',
		
		'-webkit-border-radius': ($(imgOb).height()/2)+'px',
		
		'border-radius': ($(imgOb).height()/2)+'px',
	});
}

function performQuerys(getPedidosQuery, getSolicitantesQuery, getInsumosQuery, getMateriaisQuery, callback){//Realiza as Query de forma síncrona	
	mysqlQuery(getSolicitantesQuery, function(result1){
		solicitantes = JSON.parse(result1);
		mysqlQuery(getPedidosQuery, function(result2){
			pedidos = setDataCompra(JSON.parse(result2));
			console.log(pedidos);
			mysqlQuery(getInsumosQuery, function(result3){
				insumos = JSON.parse(result3);
				mysqlQuery(getMateriaisQuery, function(result4){
					materiais = JSON.parse(result4);
					callback(
						createObject(pedidos, solicitantes, materiais, insumos),
						setPedidosPorSolicitante(pedidos, solicitantes),
						setPedidosPorDia(pedidos)
					);
				});
			});
		});
	});
}

function setPedidoInputHandle(){
	$("#pedidoNumberInput").mask("9999");

	$("#pedidoNumberInput").siblings().click(function(event){
		event.preventDefault();
		var num = $("#pedidoNumberInput").val();
		console.log(num);
	});

	$("#dataInput").mask("99/99/9999",{placeholder:"DD/MM/YYYY"});
}

function orderArrayByDate(dias){
	var temp;
	var day1;
	var day2;
	
	for(var i = 0; i<dias.length; i++){
		dias[i].number =  parseInt(dias[i][0])+ parseInt(dias[i][1])*200;
	}

	for(var i = 0; i<dias.length; i++){
		for(var j = i+1; j<dias.length; j++){
			if(dias[i].number>dias[j].number){
				temp = dias[i];
				dias[i] = dias[j];
				dias[j] = temp;
			}
		}
	}

	console.log(dias);
}

function setPedidosPorDia(pedidos){
	var pedidosPorDia = [];
	var dias = [];

	for(var i = 0; i<pedidos.length; i++){
		dias.push(pedidos[i].dia_de_compra.split('/'));
	}

	dias = orderArrayByDate(dias);

	console.log(dias);

	var data = {
		labels: dias,
		datasets: [
			{
				label: "Número de Pedidos",
				fill: false,
				lineTension: 0.1,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: pedidosPorDia,
				spanGaps: false,
			}
		]
	};

	return data;
}


function setPedidosPorSolicitante(pedidos, solicitantes){

	var nomes = [];
	var pedidosPorId = [];

	for(var j = 0; j<solicitantes.length; j++){
		var count=0;
		for(var i = 0; i<pedidos.length; i++){
			if(pedidos[i].id_solicitante===solicitantes[j].id){
				count++;
			}
		}
		
		var nome = solicitantes[j].nome.split(' ');
		var length = solicitantes[j].nome.split(' ').length;
		nome = nome[0]+' '+nome[length-1];
		
		nomes.push(nome);
		pedidosPorId.push(count);//Ordenado
	}
		

	var data = {
		labels: nomes,
		datasets: [
			{
				label: "Número de Pedidos",
				fill: false,
				lineTension: 0.1,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: pedidosPorId,
				spanGaps: false,
			}
		]
	};

	return data;
}

function setDataCompra(pedidos){
	for(var i = 0; i<pedidos.length; i++){
		var dia = pedidos[i].data_de_compra.split(" ")[0].split("-")[2]+"/"+pedidos[i].data_de_compra.split(" ")[0].split("-")[1];
		pedidos[i]["dia_de_compra"] = dia;
	}
	return pedidos;
}