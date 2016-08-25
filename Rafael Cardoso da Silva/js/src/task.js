function initTask(){
	
	// show submenu 	
	$("nav.submenu").hide();
	$("nav#task-menu").show();

	// blur cep, load address
	$("#cep, #cep-entrega").blur(function(){
		var cep = $(this).val();

		// valida cep
		if( cep.length == 9 || cep.length == 8 )
			loadAddress( $(this) );
	});

	// same address delivery
	$(".same-address").change(function(){
		updateAddressDelivery();
	});

	// load order
	$("#bt-search").click(function(){
		if( $("#numero").val() != "" )
			loadOrder( $("#numero").val() );
	});

	// open modal insurance
	$(".bt-modal-insurance").click(function(e){
		e.preventDefault();
	});

	// add new insurance
	$(".bt-add-insurance").click(function(){

		var insurance = {
			marca: $("#marca-insumo").val(),
			descricao: $("#descricao-insumo").val(),
			quantidade: $("#quantidade-insumo").val(),
			preco: $("#preco-insumo").val()
		}

		// valida
		if( validateForm( $("#form-insurance") ) ){

			// close modal
			$("#modal-insurance .close").click();

			// add  new insurance on DOM
			var item = ""+
			"<tr>"+
	    		"<td>"+insurance.marca+"</td>"+
	    		"<td>"+insurance.descricao+"</td>"+
	    		"<td class='qtd'>"+insurance.quantidade+"</td>"+
	    		"<td class='preco'>"+insurance.preco+"</td>"+
			"</tr>";

			$(".tb-insumos tbody").append(item);

			// calcula
			calculaTotal();
		}
	});

	// submit form
	$(".bt-submit").click(function(e){
		e.preventDefault();
		if( validateForm( $("#form-task") ) ){
			
			// dont submit form
			$(".bt-submit").removeClass("disabled");
		}
	});

	function validateForm(form){
		var validate = true;

		// remove errors
		$("div.has-error").removeClass("has-error");
		$("span.help-block").remove();

		// verify all itens
		form.find("input[type='text'], input[type='number'], input[type='tel']").each(function(){

			var iVal = $(this).val(),
				item = $(this);

			// verify value
			if( iVal == "" || iVal.length == 0 ){

				// add error
				item.parents(".form-group").addClass("has-error");
				item.parents(".form-group").append("<span class='help-block'>Ops! esse campo está inválido</span>");

				validate = false;
			}

		});

		return validate;
	}

	// load materiais
	loadMaterias();
	function loadMaterias(){
		var mysql_query = "SELECT * FROM materiais";

	  	mysqlQuery(mysql_query, function(result){
	    	// mostra o resultado da query
	    	var obj = JSON.parse(result);

	    	showMaterial(obj, 4);  	
	  	});		
	}

	// load insumos
	loadInsurance();
	function loadInsurance(){
		var mysql_query = "SELECT * FROM insumos RIGHT JOIN materiais ON insumos.id_material = materiais.id";

	  	mysqlQuery(mysql_query, function(result){
	    	// mostra o resultado da query
	    	var obj = JSON.parse(result);

	    	showInsurance(obj, 2);
	  	});		
	}

	// calcula
	function calculaTotal(){
		// calculo materiais
		var materiais = 0;
		$(".tb-materiais tr").each(function(){
			materiais += Number($(".qtd", this).text()) * Number($(".preco", this).text());
		});

		// calculo insumos
		var insurance = 0;
		$(".tb-insumos tr").each(function(){
			insurance += Number($(".qtd", this).text()) * Number($(".preco", this).text());
		});

		// total
		var total = materiais + insurance;
		$("#preco-total").val( total );
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

	function loadOrder(id){

		// query dados do solicitante e entrega
		var mysql_query = "SELECT "+
		"p.id, DATE(p.data_de_compra) AS data_de_compra, " +
		"p.cep AS cep_pedido, p.rua AS endereco_pedido, p.cidade AS cidade_pedido, p.estado AS estado_pedido, " +
		"s.nome, s.telefone, s.cpf, s.cep, s.rua, s.cidade, s.estado " +
		"FROM pedidos p "+
		"JOIN solicitantes s ON p.id_solicitante = s.id "+
		"WHERE p.id = "+id+" "+
		"ORDER BY p.id";

		mysqlQuery(mysql_query, function(result){
	    	var obj = JSON.parse(result)[0];

	    	// show on DOM
	    	// dados do solicitante
	    	$(".dados-solicitante #nome").val( obj.nome );
	    	$(".dados-solicitante #telefone").val( obj.telefone );
	    	$(".dados-solicitante #cpf").val( obj.cpf );
	    	$(".dados-solicitante #cep").val( obj.cep );
	    	$(".dados-solicitante #endereco").val( obj.rua );
	    	$(".dados-solicitante #cidade").val( obj.cidade );
	    	$(".dados-solicitante #estado").val( obj.estado );

	    	// dados da entrega
	    	$("#cep-entrega").val( obj.cep_pedido );
	    	$("#endereco-entrega").val( obj.endereco_pedido );
	    	$("#cidade-entrega").val( obj.cidade_pedido );
	    	$("#estado-entrega").val( obj.estado_pedido );

	    	// dados do pedido
	    	$("#data").val(obj.data_de_compra.substr(0, 10));
	    });

	    // materiais
	    mysql_query = "SELECT * FROM materiais WHERE id_pedido = "+id;

		mysqlQuery(mysql_query, function(result){
	    	var obj = JSON.parse(result);

	    	$(".tb-materiais tbody").html("");
	    	showMaterial(obj, obj.length);
	    });

	    //insumos
	    mysql_query = "SELECT "+
	    "i.descricao AS descricao, i.preco AS preco, i.quantidade AS quantidade, "+
	    "m.marca AS marca  "+
	    "FROM insumos i "+
	    "JOIN materiais m ON i.id_material = m.id "+
	    "WHERE i.id_pedido = "+id;

		mysqlQuery(mysql_query, function(result){
	    	var obj = JSON.parse(result);

	    	$(".tb-insumos tbody").html("");
	    	showInsurance(obj, obj.length);
	    });
	}

	function showMaterial(obj, length){

    	for( var i = 0; i < length; i++ ){
    		var item = ""+
    		"<tr>"+
	    		"<td>"+obj[i].nome+"</td>"+
	    		"<td>"+obj[i].marca+"</td>"+
	    		"<td class='qtd'>"+obj[i].quantidade+"</td>"+
	    		"<td class='preco'>"+obj[i].preco+"</td>"+
    		"</tr>";

    		// add material
    		$(".tb-materiais tbody").append( item );

    		// calcula total
    		calculaTotal();
    	}
	}

	function showInsurance(obj, length){

    	for( var i = 0; i < length; i++ ){
    		var item = ""+
    		"<tr>"+
	    		"<td>"+obj[i].marca+"</td>"+
	    		"<td>"+obj[i].descricao+"</td>"+
	    		"<td class='qtd'>"+obj[i].quantidade+"</td>"+
	    		"<td class='preco'>"+obj[i].preco+"</td>"+
    		"</tr>";

    		// add material
    		$(".tb-insumos tbody").append( item );

    		// calcula total
    		calculaTotal();
    	}
	}	
}