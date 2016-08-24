/* JS RESPONSÁVEL POR COPIAR OO ENDEREÇO CASO A ENTREGA SEJA O MESMO DO SOLICITANTE 
*/

$(document).ready(function() {

	$('#endereco_igual').change(function() {
		
		if ($("#endereco_igual").is(":checked"))
		{
	
			var cep = $("#cep").val();
			var logradouro = $("#logradouro").val();
			var numero = $("#numero").val();
			var complemento = $("#complemento").val();
			var cidade = $("#cidade").val();
			var estado = $("#estado").val();
			
		
			$("#entrega_cep").val(cep);
			$("#entrega_logradouro").val(logradouro);
			$("#entrega_numero").val(numero);
			$("#entrega_complemento").val(complemento);
			$("#entrega_cidade").val(cidade);
			$("#entrega_estado").val(estado);
		}
		else
		{
			
			$("#entrega_cep").val("");
			$("#entrega_logradouro").val("");
			$("#entrega_numero").val("");
			$("#entrega_complemento").val("");
			$("#entrega_cidade").val("");
			$("#entrega_estado").val("");
		}
		
	});

});