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
		
		pedidos[i]["isPendente"] = true;
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
			mysqlQuery(getInsumosQuery, function(result3){
				insumos = JSON.parse(result3);
				//var cleanInsumos = getCleanInsumos(insumos);

				mysqlQuery(getMateriaisQuery, function(result4){
					materiais = JSON.parse(result4);
					console.log(JSON.parse(result4));
					//var cleanMateriais = getCleanMateriais(materiais);

					$(".materialSelect").each(function(){
						$(this).append("<option value='' disabled selected hidden>Escolha um material</option>");
						for(var i = 0; i<materiais.length; i++){
							$(this).append("<option value="+materiais[i].id+">"+materiais[i].nome+" "+materiais[i].marca+"-- Preço:R$"+materiais[i].preco+",00"+"</option>");
						}
					});
					
					callback(
						createObject(pedidos, solicitantes, materiais, insumos),
						setPedidosPorSolicitante(pedidos, solicitantes),
						setPedidosPorDia(pedidos),
						insumos
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
	$(".materialQtdSelect").each(function(){
		for(var i = 1; i<16; i++){
			var id = i-1;
			$(this).append("<option value="+id+">"+i+"</option>")	
		}
	});

	$("#solicitanteNomeInput").mask("99999-999");
	$("#solicitanteCPFInput").mask("999.999.999-99");
	$("#solicitanteNumInput").mask("9999999");
	$("#entregaCEPInput").mask("99999-999");
}

function orderAndFormatArrayByDate(dias){
	var temp;
	var day1;
	var day2;
	
	for(var i = 0; i<dias.length; i++){
		for(var j = i+1; j<dias.length; j++){
			day1 = parseInt(dias[i][0])+ parseInt(dias[i][1])*31
			day2 = parseInt(dias[j][0])+ parseInt(dias[j][1])*31
			if(day1>day2){
				temp = dias[i];
				dias[i] = dias[j];
				dias[j] = temp;
			}
		}
	}

	for(var i = 0; i<dias.length; i++){
		dias[i] = dias[i][0]+"/"+dias[i][1];
	}

	return dias;
}

function getPedidosPorDias(dias, pedidos){
	var pedidosPorDia = [];
	var count;
	for(var i = 0; i<dias.length; i++){
		count = 0;
		for(var j = 0; j<pedidos.length; j++){
			if(dias[i]===pedidos[j].dia_de_compra){
				count++;
			}
		}
		pedidosPorDia.push(count);
	}
	return pedidosPorDia;
}

function setPedidosPorDia(pedidos){
	var pedidosPorDia = [];
	var dias = [];

	for(var i = 0; i<pedidos.length; i++){
		dias.push(pedidos[i].dia_de_compra.split('/'));
	}

	dias = orderAndFormatArrayByDate(dias);

	pedidosPorDia = getPedidosPorDias(dias, pedidos);

	var data = {
		labels: dias,
		datasets: [{
			label: "Número de Pedidos",
			fill: false,
			lineTension: 0.1,
			backgroundColor: "rgba(75,192,192,0.4)",
			borderColor: "rgba(75,192,192,1)",
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0,
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
		}]};

	return data;
}

function getDataSetPedidos(pedidos){
	var pedidosArray = [];
	for(var i = 0; i<pedidos.length; i++){
		if(pedidos[i].isPendente){
			pedidosArray[i] = new Array();
			pedidosArray[i].push(pedidos[i].numero);
			pedidosArray[i].push(pedidos[i].solicitante.nome);
			pedidosArray[i].push(pedidos[i].data_de_compra.split(' ')[0]);
		}
	}

	return pedidosArray;
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
		nome = nome[0];	''
		
		nomes.push(nome);
		pedidosPorId.push(count);//Ordenado
	}

	var data = {
		labels: nomes,
		datasets: [{
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
		}]
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

function getDataSetInsumos(pedidos, num){
	var dataInsumos = [];

	for(var i = 0; i<pedidos.length; i++){
		if(pedidos[i].numero === num){
			var pedido = pedidos[i];
			for(var j = 0; j<pedidos[i].materiais.length; j++){
				var material = pedidos[i].materiais[j];
				for(var k = 0; k<pedidos[i].materiais[j].insumos.length; k++){
					var insumo = pedidos[i].materiais[j].insumos[k];
					dataInsumos[k] = new Array();
					dataInsumos[k].push(material.nome+" "+material.marca);
					dataInsumos[k].push(insumo.descricao);
					dataInsumos[k].push("R$"+Math.round(parseFloat(insumo.preco/insumo.quantidade)*100)/100);
					dataInsumos[k].push(parseInt(insumo.quantidade));
					dataInsumos[k].push('<button class="myButton" id="deleteInsumosButton" type="button" name="deleteInsumosButton"><h1>X</h1></button>');
				}
			}
		}
	}

	return dataInsumos;
}