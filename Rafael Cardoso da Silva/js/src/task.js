$(function(){
	
	// show submenu 	
	$("nav.submenu").hide();
	$("nav#task").show();

	// blur cep, load address
	$("#cep, #cep-entrega").blur(function(){

		var cep = $(this).val();

		if( cep.length == 9 || cep.length == 8 ){
			loadAddress( $(this) );
		}
	});

	// same address delivery
	$(".same-address").change(function(){
		updateAddressDelivery();
	});

	// load order
	$("#numero").change(function(){
		loadOrder( $(this).val() );
	});

	function loadOrder(){

		var mysql_query = "SELECT count(*) as pedidos, data_de_compra FROM pedidos GROUP BY id_solicitante";

	  	mysqlQuery(mysql_query, function(result){
	    	// mostra o resultado da query
	    	var obj = JSON.parse(result);

	    	console.log(obj);

	  	});

	}

	function updateAddressDelivery(){
		if( $(".same-address").is(":checked") ){
			$("#cep-entrega").val( $("#cep").val() );
			$("#endereco-entrega").val( $("#endereco").val() );
			$("#cidade-entrega").val( $("#cidade").val() );
			$("#estado-entrega").val( $("#estado").val() );
		}
	}

	function loadAddress( cep ){

		$.ajax({
			url: "https://viacep.com.br/ws/"+cep.val()+"/json/",
			type: "GET",
			success: function(data){

				// update form data
				cep.parents(".form-container").find(".endereco").val( data.logradouro );
				cep.parents(".form-container").find(".cidade").val( data.localidade );
				cep.parents(".form-container").find(".estado").val( data.uf );

				updateAddressDelivery();
			}
		})
	}
});