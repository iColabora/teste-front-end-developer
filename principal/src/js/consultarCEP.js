$(document).ready(function(){
	
	function limpar_campos(){
		$('#solicitante_endereco').val('');
		$('#solicitante_cidade').val('');
		$('#solicitante_uf').val('');
		
		$('#entrega_endereco').val('');
		$('#entrega_cidade').val('');
		$('#entrega_uf').val('');	
	}
	
	function consulta_cep(valCep){
		var cep = valCep.replace(/\D/g, '');
		if (cep != ""){
			var validacep = /^[0-9]{8}$/;
			
			if(validacep.test(cep)){
				$('#solicitante_endereco').val('...')
				$('#solicitante_cidade').val('...')
				
				$.getJSON("//viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
					if (!("erro" in dados)){
						$('#solicitante_endereco').val(dados.logradouro);
						$('#solicitante_cidade').val(dados.localidade);
						$('#solicitante_uf').val(dados.uf);
						
						$('#entrega_endereco').val(dados.logradouro);
						$('#entrega_cidade').val(dados.localidade);
						$('#entrega_uf').val(dados.uf);				
					}else{
						limpar_campos();
						alert('CEP não encontrado');
					}
				});
			}else{				
				alert('Formato inválido!');				
			}
		}else{
			limpar_campos();
		}		
	}
	
	$("#solicitante_cep").blur(function(){
		consulta_cep($(this).val());
	});
	
	$("#entrega_cep").blur(function(){
		consulta_cep($(this).val());
	});
})
