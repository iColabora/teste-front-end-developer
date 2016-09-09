var limpaPedidos = function() {

	$('#section-pedido').show();
	$('#section-insumo').hide();
	$('#section-solicitante').hide();
	$('#section-material').hide();


	$('#search-result').html('');
	$('.search-input').val('').hide('slow');
	$('#btn-clear').hide();
	$('#btn-search').show( function(){
		$(this).css('color', '#4a5c68');
	});

}

var limpaInsumos = function() {
	$('#section-insumo').show();
	$('#section-pedido').hide();
	$('#section-solicitante').hide();
	$('#section-material').hide();

			
	$('#search-result').html('');
	$('.search-input').val('').hide('slow');
	$('#btn-clear').hide();
	$('#btn-search').show( function(){
		$(this).css('color', '#4a5c68');
	});
}

var limpaSolicitantes = function() {

	$('#section-solicitante').show();
	$('#section-pedido').hide();
	$('#section-insumo').hide();
	$('#section-material').hide();

	$('#search-result').html('');
	$('.search-input').val('').hide('slow');
	$('#btn-clear').hide();
	$('#btn-search').show( function(){
		$(this).css('color', '#4a5c68');
	});
}

var limpaMateriais = function() {

	$('#section-material').show();
	$('#section-solicitante').hide();
	$('#section-pedido').hide();
	$('#section-insumo').hide();
	
	$('#search-result').html('');
	$('.search-input').val('').hide('slow');
	$('#btn-clear').hide();
	$('#btn-search').show( function(){
		$(this).css('color', '#4a5c68');
	});

}