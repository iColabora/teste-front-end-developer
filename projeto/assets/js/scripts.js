var limpaPedidos = function() {

	$('#section-pedido').show();
	$('#section-insumo').hide();
	$('#section-solicitante').hide();

	$('#search-result').html('');
	$('.search-input').val('').hide('slow');
	$('#btn-clear').hide();
	$('#btn-search').show( function(){
		$(this).css('color', '#4a5c68');
	});

}
