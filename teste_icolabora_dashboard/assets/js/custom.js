$(document).ready(function() {
	
	function dados_entrega()
	{
		if($("#endereco_igual").is(':checked') == true){
			
			$("#cep_entrega").val($("#cep").val());
			$("#endereco_entrega").val($("#endereco").val());
			$("#complemento_entrega").val($("#complemento").val());
			$("#cidade_entrega").val($("#cidade").val());
			$("#estado_entrega").val($("#estado").val());
			
			$("#cep_entrega").attr("disabled", true);
			$("#endereco_entrega").attr("disabled", true);
			$("#complemento_entrega").attr("disabled", true);
			$("#cidade_entrega").attr("disabled", true);
			$("#estado_entrega").attr("disabled", true);
		
		}
		else{
			
			$("#cep_entrega").val("");
			$("#endereco_entrega").val("");
			$("#complemento_entrega").val("");
			$("#cidade_entrega").val("");
			$("#estado_entrega").val("");
			
			$("#cep_entrega").attr("disabled", false);
			$("#endereco_entrega").attr("disabled", false);
			$("#complemento_entrega").attr("disabled", false);
			$("#cidade_entrega").attr("disabled", false);
			$("#estado_entrega").attr("disabled", false);
		}
		
	}
	
	//chama a função para igualar os dados
	$("#endereco_igual").change(function() {
        dados_entrega();
    });
	
	new Chartist.Bar('.ct-chart', {
	  labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'],
	  series: [
		[2, 4, 3, 7, 5, 10, 3],
	  ]
	}, {

	  reverseData: true,
	  horizontalBars: false,
	  axisY: {
		onlyInteger: true,
	  }
	  
	});
	
	new Chartist.Bar('.ct-chart-sol', {
	  labels: ['Robison', 'Pedro', 'José', 'Marcos'],
	  series: [85, 60, 120, 200]
	}, {
	  reverseData: true,
	  distributeSeries: true,
	  axisY: {
		onlyInteger: true,
	  }
	});
	
});
		