// Testando a validação usando jQuery
$(function(){
 
    // ## EXEMPLO 2
    // Aciona a validação ao sair do input
    $('.cpf_cnpj').blur(function(){
    
        // O CPF ou CNPJ
        var cpf_cnpj = $(this).val();
		
		if (cpf_cnpj.length == 0)
		{

		}
        
        // Testa a validação
        if ( valida_cpf_cnpj( cpf_cnpj )) {
            //alert('OK');
        } else {
			if (cpf_cnpj.length != 0)
			{
				//alert('CPF ou CNPJ inválido!');
				$('.cpf_cnpj').notify("CPF inválido");
			}
        }
        
    });
    
});