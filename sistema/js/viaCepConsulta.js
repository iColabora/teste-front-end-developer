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

	$("#endEntrega_cep").blur(function(){
		 var cep = this.value.replace(/[^0-9]/, "");
			if(cep.length!=8){
				$(".endEntrega_cep").notify("Cep inválido");
				return false;
		 	}
		 var url = "http://viacep.com.br/ws/"+cep+"/json/";
		 $.getJSON(url, function(dadosRetorno){
			
		 if (dadosRetorno.logradouro == null)
		 {
		 	$(".endEntrega_cep").notify("CEP não encontrado");
		 }
		 
			 try{
				 // Insere os dados em cada campo
				 $("#endEntrega_logradouro").val(dadosRetorno.logradouro);
				 $("#endEntrega_bairro").val(dadosRetorno.bairro);
				 $("#endEntrega_cidade").val(dadosRetorno.localidade);
				 $("#endEntrega_estado").val(dadosRetorno.uf);
			 } catch(ex){
			 }
		 });
	});


 
 });
 
 