var pedido;
function createObject(pedidos, solicitantes, materiais, insumos){

	function addSolicitanteToPedido(nPedido, solicitante){
		pedidos[nPedido]["solicitante"] = solicitante;
	}

	function addMaterialToPedido(nPedido, material){
		pedidos[nPedido]["materiais"] = [];
		pedidos[nPedido].materiais.push(material);
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
				pedidos[i]["insumos"] = [];
				addMaterialToPedido(i, materiais[j]);

				//Material foi adicionado, então deve adicionar seus insumos
				for(var k = 0; k<insumos.length; k++){
					if(pedidos[i].id === insumos[k].id_pedido){
						pedidos[i].insumos.push(insumos[k]);
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

function performQuerys(getPedidosQuery, getSolicitantesQuery, getInsumosQuery, getMateriaisQuery, callback){//Realiza as Query
	mysqlQuery(getSolicitantesQuery, function(result1){
		solicitantes = JSON.parse(result1);
		mysqlQuery(getPedidosQuery, function(result2){
			pedidos = setDataCompra(JSON.parse(result2));
			mysqlQuery(getInsumosQuery, function(result3){
				insumos = JSON.parse(result3);
				mysqlQuery(getMateriaisQuery, function(result4){
					materiais = JSON.parse(result4);
					$(".materialSelect").each(function(){
						$(this).append("<option value='-1' disabled selected hidden>Escolha um material</option>");
						for(var i = 0; i<materiais.length; i++){
							$(this).append("<option value="+materiais[i].id+">"+materiais[i].nome+" "+materiais[i].marca+"-- Preço:R$"+materiais[i].preco+",00"+"</option>");
						}
					});
					
					callback(
						createObject(pedidos, solicitantes, materiais, insumos),
						setPedidosPorSolicitante(pedidos, solicitantes),
						setPedidosPorDia(pedidos),
						insumos,
						materiais
					);
				});
			});
		});
	});
}

function setDomListenersAndLike(pedidosPendentes, insumosTable, pedidosTable, materiais, insumos){

	//Listener para os inputs e máscaras
	$("#pedidoNumberInput").mask("9");
	$("#dataInput").mask("99/99/9999",{placeholder:"DD/MM/YYYY"});
	$(".materialQtdSelect").each(function(){
		for(var i = 1; i<16; i++){
			var id = i-1;
			$(this).append("<option value="+id+">"+i+"</option>")	
		}});
	$("#solicitanteCEPInput").mask("99999-999");

	$("#solicitanteCPFInput").mask("999.999.999-99");
	$("#solicitanteNumInput").mask("9999999");
	$("#entregaCEPInput").mask("99999-999");

	//Listener para procurar pedido pelo search
	$("#pedidoNumberInput").siblings().click(function(event){
		event.preventDefault();
		var id = $("#pedidoNumberInput").val();
		pedido = setPedidoFromNum(insumosTable, pedidosPendentes, id);
		updateTotalCost(pedido);
	});

	$('#pedidosTable tbody').on( 'click', 'tr', function(){
		
		$(this).addClass('selected').siblings().removeClass('selected');

		var id = parseInt($(this).find('td').first().html());
		pedido = setPedidoFromNum(insumosTable, pedidosPendentes, id);
		updateTotalCost(pedido);
		
	});

	$("#addInsumosButton").click(function(){
		var insumoToAdd = $(this).siblings();

		if(insumoToAdd[0].value != -1){
			for(var i = 0; i<insumos.length; i++){
				if(insumos[i].id==insumoToAdd[0].value){
					pedido.insumos.push(insumos[i]);
					pedido.insumos[pedido.insumos.length-1].id_pedido = pedido.id;
					pedido.insumos[pedido.insumos.length-1].quantidade = parseInt(insumoToAdd[1].value)+1;
					setInsumosTable(insumosTable, pedido);
					updateTotalCost(pedido);
					return;
				}
			}
		}
	});

	$(".materialSelect").change(function(){
		var myMateriais = [];
		$(".materialSelect").each(function(){			
			for(var i = 0; i<materiais.length; i++){
				if(materiais[i].id==this.value){
					myMateriais.push(materiais[i]);
					myMateriais[myMateriais.length-1].quantidade = parseInt($(this).siblings()[0].value)+1;
					myMateriais[myMateriais.length-1].id_pedido = pedido.id;
				}
			}
		});
		pedido.materiais = myMateriais;
		updateTotalCost(pedido);
	});

	$(".materialQtdSelect").change(function(){
		if($(this).siblings()[0].value != -1){
			var qtd = parseInt(this.value)+1;
			for(var i = 0; i<pedido.materiais.length; i++){
				if(pedido.materiais[i].id==$(this).siblings()[0].value){
					pedido.materiais[i].quantidade = qtd;
				}
			}
			updateTotalCost(pedido);
		}
	});

	
	$("#searchSolicitanteCEPButton").click(function(){
		getEndPeloCep($("#solicitanteCEPInput")[0].value.replace("-", ""), function(data){
			console.log(data);
			$("#solicitanteCEPInput")[0].value = data.cep;
			$("#solicitanteCidadeInput")[0].value = data.localidade;
			$("#solicitanteUFInput")[0].value = data.uf;
			$("#solicitanteEndInput")[0].value = data.logradouro;
			$("#solicitanteBairroInput")[0].value = data.bairro;
			$("#solicitanteNumInput")[0].value = [];

			$("#entregaCEPInput")[0].value = data.cep;
			$("#entregaCidadeInput")[0].value = data.localidade;
			$("#entregaUFInput")[0].value = data.uf;
			$("#entregaEndInput")[0].value = data.logradouro;
			$("#entregaBairroInput")[0].value = data.bairro;
			$("#entregaNumInput")[0].value = [];
		});
	});

	$("#finishPedidoButton").click(function(){
		if(pedido.insumos.length>1){
			if(pedido.materiais.length==4){							
				if(pedidos[pedido.id-1].id == pedido.id){
					
					pedido.isPendente = false;	
					pedidos[pedido.id-1] = pedido;
					setPedidosTable(pedidosTable, pedidos);
					clearAll();
					$('#pedidosTable tbody').on( 'click', 'tr', function(){
		
						$(this).addClass('selected').siblings().removeClass('selected');

						var id = parseInt($(this).find('td').first().html());
						pedido = setPedidoFromNum(insumosTable, pedidosPendentes, id);
						updateTotalCost(pedido);
						
					});

					console.log(pedidos);

				}
			}else if(pedido.materiais.length<4){
				alert("Por favor, escolha 4 materiais");
			}else{
				alert("HOW DID THIS HAPPEN");
			}
		}else{
			alert("Escolha, no mínimo, dois insumos");
		}
	});

	updateTotalCost(pedido);
}

function orderAndFormatArrayByDate(dias){
	var temp;
	var day1;
	var day2;
	
	for(var i = 0; i<dias.length; i++){
		for(var j = i+1; j<dias.length; j++){
			day1 = parseInt(dias[i][0])+ parseInt(dias[i][1])*31;
			day2 = parseInt(dias[j][0])+ parseInt(dias[j][1])*31;
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
		if(!pedidos[i].isPendente){
			pedidos.splice(i, 1);
		}
	}

	for(var i = 0; i<pedidos.length; i++){
		if(pedidos[i].isPendente){
			pedidosArray[i] = new Array();
			pedidosArray[i].push(pedidos[i].id);
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

function getDataSetInsumos(pedido){
	var dataInsumos = [];

	for(var j = 0; j<pedido.materiais.length; j++){
		var material = pedido.materiais[j];
		for(var k = 0; k<pedido.insumos.length; k++){
			var insumo = pedido.insumos[k];	
			dataInsumos[k] = new Array();
			dataInsumos[k].push(insumo.descricao);
			dataInsumos[k].push("R$"+Math.round(parseFloat(insumo.preco)*100)/100);
			dataInsumos[k].push(parseInt(insumo.quantidade));
			dataInsumos[k].push('<button data-id="'+insumo.id+'" data-qtd="'+insumo.quantidade+'" class="myButton" id="deleteInsumosButton" type="button" name="deleteInsumosButton">X</button>');
		}
	}

	return dataInsumos;
}

function setInsumosSelect(insumos){
	for(var i = 0; i<insumos.length; i++){
		var preco = "R$"+Math.round(parseFloat(insumos[i].preco)*100)/100;
		$("#insumosSelect").append("<option value="+insumos[i].id+">"+insumos[i].descricao+" -- "+preco+"</option>");
	}
}


function setPedidoFromNum(insumosTable, pedidos, id){
	clearMaterialSelect();

	for(var i = 0; i<pedidos.length; i++){
		if(pedidos[i].id == id && pedidos[i].isPendente){
			var pedido = pedidos[i];
			$("#pedidoNumberInput")[0].value = pedido.id;
			$("#dataInput")[0].value = pedido.data_de_compra.split(' ')[0];
			$("#nomeInput")[0].value = pedido.solicitante.nome;
			$("#solicitanteCPFInput")[0].value = pedido.solicitante.cpf;
			$("#solicitanteCEPInput")[0].value = pedido.cep;
			$("#solicitanteCidadeInput")[0].value = pedido.cidade;
			$("#solicitanteUFInput")[0].value = pedido.estado;
			$("#solicitanteEndInput")[0].value = pedido.rua;
			$("#solicitanteBairroInput")[0].value = pedido.bairro;
			$("#solicitanteNumInput")[0].value = pedido.numero;

			$("#entregaCEPInput")[0].value = pedido.cep;
			$("#entregaCidadeInput")[0].value = pedido.cidade;
			$("#entregaUFInput")[0].value = pedido.estado;
			$("#entregaEndInput")[0].value = pedido.rua;
			$("#entregaBairroInput")[0].value = pedido.bairro;
			$("#entregaNumInput")[0].value = pedido.numero;

			setInsumosTable(insumosTable, pedido)

			setMateriaisSelect(pedido);

			updateTotalCost(pedido);

			return pedido;
		}
	}

	clearAll();

	updateTotalCost(pedido);
}

function setSelectedValue(id, valueToSet) {
	var selectObj = $("#"+id)[0];
	for (var i = 0; i < selectObj.options.length; i++) {
		if (selectObj.options[i].value == valueToSet) {
			selectObj.options[i].selected = true;
			return;
		}
	}
}

function setPedidosTable(pedidosTable, pedidos){

	var dataSetPedidos = getDataSetPedidos(pedidos);

	console.log(dataSetPedidos);

	$("#pedidosTableWrap").children().remove();

	$("#pedidosTableWrap").append("<table id='pedidosTable'></table>")

	pedidosTable = $('#pedidosTable').DataTable({
		"lengthMenu": [5],
		data: dataSetPedidos,	
			columns: [
			{title: "Número do Pedido Pendente" },
			{title: "Solicitante" },
			{title: "Data de Compra" },
		]
	});
}


function setInsumosTable(insumosTable, pedido){
	var dataSetInsumos = getDataSetInsumos(pedido);

	$("#tableSectionInsumos").children().remove();

	$("#tableSectionInsumos").append("<table id='insumosTable'></table>")

	var insumosTable = $('#insumosTable').DataTable({
		"lengthMenu": [8],
		data: dataSetInsumos,
		columns: [
			{ title: "Insumo" },
			{ title: "Preço" },
			{ title: "Qtd" },
			{ title: "Apagar" },
		]
	});

	$('#insumosTable tbody').on( 'click', 'tr', function(event){
		console.log(event.target.id+"");
		if(event.target.id == "deleteInsumosButton"){
			for(var i = 0; i<pedido.insumos.length; i++){
				var insumo = pedido.insumos[i];
				if(insumo.id==$(event.target).attr("data-id") && insumo.quantidade==$(event.target).attr("data-qtd")){
					console.log(pedido.insumos);
					pedido.insumos.splice(i, 1);
					setInsumosTable(insumosTable, pedido);
					console.log(pedido.insumos);
					updateTotalCost(pedido);
					return pedido;
				}
			}
		}
	});
}

function setMateriaisSelect(pedido){
	for(var i = 0; i<pedido.materiais.length; i++){
		setSelectedValue(i, pedido.materiais[i].id);
		setSelectedValue(i+""+i, pedido.materiais[i].quantidade);
	}
}

function clearInsumoTable(){
	$("#tableSectionInsumos").children().remove();

	$("#tableSectionInsumos").append("<table id='insumosTable'></table>")

	var insumosTable = $('#insumosTable').DataTable({
		"lengthMenu": [8],
		data: [],
		columns: [
			{ title: "Insumo" },
			{ title: "Preço" },
			{ title: "Qtd" },
			{ title: "Apagar" },
		]
	});
}

function clearMaterialSelect(){
	for(var i = 0; i<4; i++){
		setSelectedValue(i, -1);
	}
}

function getEndPeloCep(cep, callback){
	$.ajax({
		type: 'get',
		url: "http://viacep.com.br/ws/"+cep+"/json/",
		dataType: 'json',
		success: function(data){
			callback(data);
		}
	});
}

function updateTotalCost(pedido){
	if(typeof pedido != "undefined"){
		var cost = 0;
		for(var i = 0; i<pedido.materiais.length; i++){
			cost += pedido.materiais[i].preco* pedido.materiais[i].quantidade;
		}

		for(var i = 0; i<pedido.insumos.length; i++){
			cost += pedido.insumos[i].preco* pedido.insumos[i].quantidade;
		}

		$("#finishButtonText").text("Preço Total: R$"+parseFloat(Math.round(cost*100)/100).toFixed(2));
	}else{
		$("#finishButtonText").text("Preço Total: R$0,00");
	}	
}

function clearAll(){
	$("#dataInput")[0].value = [];
	$("#nomeInput")[0].value = [];
	$("#solicitanteCPFInput")[0].value = [];
	$("#solicitanteCEPInput")[0].value = [];
	$("#solicitanteCidadeInput")[0].value = [];
	$("#solicitanteUFInput")[0].value = [];
	$("#solicitanteEndInput")[0].value = [];
	$("#solicitanteBairroInput")[0].value = [];
	$("#solicitanteNumInput")[0].value = [];

	$("#entregaCEPInput")[0].value = [];
	$("#entregaCidadeInput")[0].value = [];
	$("#entregaUFInput")[0].value = [];
	$("#entregaEndInput")[0].value = [];
	$("#entregaBairroInput")[0].value = [];
	$("#entregaNumInput")[0].value = [];

	$("#finishButtonText").text("Preço Total: R$0,00");
	clearInsumoTable();
	clearMaterialSelect();
}

window.onload = function(){
	var solicitantes;
	var pedidos;
	var insumos;
	var materiais;

	var getSolicitantes = "SELECT * FROM solicitantes";
	var getPedidos = "SELECT * FROM pedidos ORDER BY id ASC";
	var getInsumos = "SELECT * FROM insumos";
	var getMateriais = "SELECT * FROM materiais";

	var mPedidos;
	performQuerys(getPedidos, getSolicitantes, getInsumos, getMateriais, function(pedidosPendentes, pedidosPorSolicitanteData, pedidosPorDiaData, insumos, 
				materiais){
		//Charts. Todos os pedidos(Tanto pendentes quanto concluidos)
		var pedidosPorSolicitanteChart = new Chart($("#myLeftChart"), {
			type: 'bar',
			data: pedidosPorSolicitanteData,
			options: {
				responsive: false,
				title: {
					display: true,
					text: 'Pedidos por Solicitante'
				},
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true,
							max: 5,
							min: 0,
							stepSize: 1
						}
					}]
				}
				}});
		var pedidosPorDiaChart = new Chart($("#myRightChart"), {
			type: 'bar',
			data: pedidosPorDiaData,
			options: {
				responsive: false,
				min: 1,
				title: {
					display: true,
					text: 'Pedidos por Dia'
				},
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true,
							max: 5,
							min: 0,
							stepSize: 1
						}
					}]
				}
				}});

		var insumosTable = $('#insumosTable').DataTable({
			data: [],
			columns: [
				{ title: "Insumo" },
				{ title: "Preço" },
				{ title: "Qtd" },
				{ title: "Apagar" },
			]
		});
		var pedidosTable = $('#pedidosTable').DataTable({
			data: [],
				columns: [
				{title: "Número do Pedido Pendente" },
				{title: "Solicitante" },
				{title: "Data de Compra" },
			]
		});

		setPedidosTable(pedidosTable, pedidosPendentes);

		setDomListenersAndLike(pedidosPendentes, insumosTable, pedidosTable, materiais, insumos);

		setInsumosSelect(insumos);				
	});

	$("body, html").mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 30);
		event.preventDefault();
	});

	makeRoundImage($("#profileImg").find('img')[0]);
};