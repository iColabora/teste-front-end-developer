/* JS RESPONSÁVEL PELO PREENCHIMENTO AUTOMÁTICO DO CEP DO SOLICITANTE E SE CASO
   NESECESSÁRIO, UM CEP DIFERENTE PARA O ENDEREÇO DE ENTREGA

*/

$(document).ready(function () {

	$("#cep").blur(function(){
		 var cep = this.value.replace(/[^0-9]/, "");
		 	if(cep.length!=8){
		 		$(".cep").notify("Cep inválido");
				return false;
		 	}
		 var url = "http://viacep.com.br/ws/"+cep+"/json/";
		 $.getJSON(url, function(dadosRetorno){

		 if (dadosRetorno.logradouro == null)
		 {
		 	$(".cep").notify("Cep não encontrado");
		 }


		 try{
		 // Insere os dados em cada campo
		 $("#logradouro").val(dadosRetorno.logradouro);
		 $("#bairro").val(dadosRetorno.bairro);
		 $("#cidade").val(dadosRetorno.localidade);
		 $("#estado").val(dadosRetorno.uf);
		 }catch(ex){}
		 });
 	});

	$("#entrega_cep").blur(function(){
		 var cep = this.value.replace(/[^0-9]/, "");
			if(cep.length!=8){
				$(".entrega_cep").notify("Cep inválido");
				return false;
		 	}
		 var url = "http://viacep.com.br/ws/"+cep+"/json/";
		 $.getJSON(url, function(dadosRetorno){
			
		 if (dadosRetorno.logradouro == null)
		 {
		 	$(".entrega_cep").notify("CEP não encontrado");
		 }
		 
			 try{
				 // Insere os dados em cada campo
				 $("#entrega_logradouro").val(dadosRetorno.logradouro);
				 $("#entrega_bairro").val(dadosRetorno.bairro);
				 $("#entrega_cidade").val(dadosRetorno.localidade);
				 $("#entrega_estado").val(dadosRetorno.uf);
			 } catch(ex){
			 }
		 });
	});


 
 });
 
 