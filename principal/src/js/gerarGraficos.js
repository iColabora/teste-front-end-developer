// JS responsável por gerar os gráficos dos dasbhboards com seus respectivos valores.

	var cores = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"]; // Array contendo todas as cores possíveis.
	var labels = []; // Array dos labels
	var label = '';
	var data = [];
	
	// Verifica qual foi o dashboard chamado
	if (document.getElementById("grafPedDia") != null){
		graficoPedidosDia();
	}else if(document.getElementById("grafPedSolicitante") != null){
		graficoPedidosSolicitante();
	}else{
		
	}
	
	function converterData(data){
		var novaData = new Date(data);
		var dia = novaData.getDate();
		var mes = novaData.getMonth() + 1;
		var ano = novaData.getFullYear();		
		return (dia +'/'+ mes +'/'+ ano);
	}

	function graficoPedidosDia(){
		// Carregar Dados
		var mysql_query = "SELECT data_de_compra as dtcompra, count(*) as qtde FROM pedidos GROUP BY data_de_compra ";
		
		// Busca
		mysqlQuery(mysql_query, function(result){
		    var obj = JSON.parse(result);
		    var count = 0;
		    label = 'N. Pedidos';
		    
		    obj.forEach(function(el){
		    	count += 1;		    	
		    	date = converterData(el.dtcompra);
		    	labels.push(date);
		    	data.push(el.qtde);
		    })
		});
		
		var ctx = $("#grafPedDia");
		Chart.defaults.global.responsive = true;
		
		var myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [{
					label: label,
					data: data,
					backgroundColor: [
					                  'rgba(255, 99, 132, 0.2)',
					                  'rgba(54, 162, 235, 0.2)',
					                  'rgba(255, 206, 86, 0.2)',
					                  'rgba(75, 192, 192, 0.2)',
					                  'rgba(153, 102, 255, 0.2)',
					                  'rgba(255, 159, 64, 0.2)'
					                  ],
					                  borderColor: [
					                                'rgba(255,99,132,1)',
					                                'rgba(54, 162, 235, 1)',
					                                'rgba(255, 206, 86, 1)',
					                                'rgba(75, 192, 192, 1)',
					                                'rgba(153, 102, 255, 1)',
					                                'rgba(255, 159, 64, 1)'
					                                ],
					                                borderWidth: 1
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});		
	}
	
	function graficoPedidosSolicitante(){
		
		var mysql_query = "SELECT sol.nome as nome, count(*) as qtde FROM pedidos ped " +
							" INNER JOIN solicitantes sol ON ped.id_solicitante = sol.id" +
							" GROUP BY ped.id_solicitante";
		
		// Busca
		mysqlQuery(mysql_query, function(result){
		    var obj = JSON.parse(result);
		    var count = 0;
		    label = 'N. Pedidos';
		    
		    obj.forEach(function(el){
		    	count += 1;
		    	labels.push(el.nome);
		    	data.push(el.qtde);
		    })
		});
		
		var ctx = $("#grafPedSolicitante");
		Chart.defaults.global.responsive = true;
		
		var myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [{
					label: label,
					data: data,
					backgroundColor: [
					                  'rgba(255, 99, 132, 0.2)',
					                  'rgba(54, 162, 235, 0.2)',
					                  'rgba(255, 206, 86, 0.2)',
					                  'rgba(75, 192, 192, 0.2)',
					                  'rgba(153, 102, 255, 0.2)',
					                  'rgba(255, 159, 64, 0.2)'
					                  ],
					                  borderColor: [
					                                'rgba(255,99,132,1)',
					                                'rgba(54, 162, 235, 1)',
					                                'rgba(255, 206, 86, 1)',
					                                'rgba(75, 192, 192, 1)',
					                                'rgba(153, 102, 255, 1)',
					                                'rgba(255, 159, 64, 1)'
					                                ],
					                                borderWidth: 1
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});
	}
	
	function pedidosPendentes(){
		// Deve ser implementado a lista de pedidos pendentes. 
		// Estes irão vir do formulário?
	}
	