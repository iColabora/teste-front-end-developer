$(function(){
	

// select * from pedidos 
// inner join materiais on pedidos.id = materiais.id_pedido
// inner join insumos on pedidos.id = insumos.id_pedido
// right join solicitantes on pedidos.id_solicitante = solicitantes.id

// GROUP BY pedidos.id

// select * from pedidos 
// right join 

// right join solicitantes on pedidos.id_solicitante = solicitantes.id
	
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

	// submit form
	$(".bt-submit").click(function(e){
		e.preventDefault();

		// calculos


		if( validateForm() ){
			// dont submit form
			$(".bt-submit").removeClass("disabled");
		}
	});

	function validateForm(){
		var validate = true;



		return validate;
	}

	// load materiais
	loadMaterias();
	function loadMaterias(){
		var mysql_query = "SELECT * FROM materiais";

	  	mysqlQuery(mysql_query, function(result){
	    	// mostra o resultado da query
	    	var obj = JSON.parse(result);

	    	for( var i = 0; i <= 3; i++ ){
	    		var item = ""+
	    		"<tr>"+
		    		"<td>"+obj[i].nome+"</td>"+
		    		"<td>"+obj[i].marca+"</td>"+
		    		"<td>"+obj[i].quantidade+"</td>"+
		    		"<td>"+obj[i].preco+"</td>"+
	    		"</tr>";

	    		// add material
	    		$(".tb-materiais tbody").append( item );
	    	}
	  	});		
	}

	// load insumos
	loadInsumos();
	function loadInsumos(){
		var mysql_query = "SELECT * FROM insumos RIGHT JOIN materiais ON insumos.id_material = materiais.id";

	  	mysqlQuery(mysql_query, function(result){
	    	// mostra o resultado da query
	    	var obj = JSON.parse(result);

	    	console.log(obj);

	    	for( var i = 0; i <= 1; i++ ){
	    		var item = ""+
	    		"<tr>"+
		    		"<td>"+obj[i].marca+"</td>"+
		    		"<td>"+obj[i].descricao+"</td>"+
		    		"<td>"+obj[i].quantidade+"</td>"+
		    		"<td>"+obj[i].preco+"</td>"+
	    		"</tr>";

	    		// add material
	    		$(".tb-insumos tbody").append( item );
	    	}
	  	});		
	}

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