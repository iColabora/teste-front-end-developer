$(document).ready(function(){	
	var errors = 0;	
	
	//Mascaras
	$('#id_data').mask('99/99/9999');
	$('#solicitante_cpf').mask('999.999.999-99');
	$('#solicitante_cep').mask('99999-999');
	$('#entrega_cep').mask('99999-999');
	
	$('.required').parent().find('.input').on('blur',function(){
		var error_div = $(this).parent().find('.error_message');
		var field_container = $(this).parent();
		if(!$.validar_campo_vazio($(this).val())){
			error_div.html('Campo obrigatório');
			error_div.css('display','block');
			errors += 1;
		}else{
			error_div.html('');
			error_div.css('display','none');
			errors += 0;
		}		
	});
	
	$('#formulario_processo').submit(function(event){
		event.preventDefault();		
		$('.required').parent().find('.input').trigger('blur');			
		if(errors){
		 	alert('Formulário não está completo! Tente novamente.'); 
	 	}else{ 
	 		alert('Formulário OK!');
	 	}
		errors = 0;
	});
	
});

$.validar_campo_vazio = function(campo){
	if (campo.trim() == '' || campo.trim() == 0) return false;
	return true;
}