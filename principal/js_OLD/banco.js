$(document).ready(function(){	
	function carregarPedido(id){
		var idPedido = id;
		var mysql_query = "SELECT * FROM pedidos WHERE id = " + id;
		
		mysqlQuery(mysql_query, function(result){			
		    var obj = JSON.parse(result);		    
		    		    
		    if (obj == ''){
		    	limparCampos();
		    }else{		    	
			    obj.forEach(function(el){
			    	$('#id_data').val(el.data_de_compra);
			    	$('#solicitante_cep').val(el.cep);
			    	$('#solicitante_endereco').val(el.rua);
			    	$('#solicitante_complemento').val(el.bairro);
			    	$('#solicitante_cidade').val(el.cidade);
			    	$('#solicitante_uf').val(el.estado);
			    	
			    	$('#entrega_cep').val(el.cep);
			    	$('#entrega_endereco').val(el.rua);
			    	$('#entrega_complemento').val(el.bairro);
			    	$('#entrega_cidade').val(el.cidade);
			    	$('#entrega_uf').val(el.estado);
			    				    	
			    });
		    }
		});
	}
	
	function limparCampos(){
		$('#id_data').val('');
		$('#solicitante_cep').val('');
    	$('#solicitante_endereco').val('');
    	$('#solicitante_complemento').val('');
    	$('#solicitante_cidade').val('');
    	$('#solicitante_uf').val('');
    	
    	$('#entrega_cep').val('');
    	$('#entrega_endereco').val('');
    	$('#entrega_complemento').val('');
    	$('#entrega_cidade').val('');
    	$('#entrega_uf').val('');
	}
	
	$('#id_pedido').blur(function(){
		carregarPedido($(this).val());
	})
});	

