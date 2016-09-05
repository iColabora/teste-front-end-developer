$(document).ready(function(){

	//MENU
	$('.link-menu a').on('click', function(e){
		e.preventDefault();
		
		$this = $(this);
		$item = $this.attr('data-item');


		$('.link-menu a').removeClass('active-item');

		if( $item == 2 ){
			$('#tarefa').show();
			$('#dashboard').hide();
			$this.addClass('active-item');

		}
		else if( $item == 3 ){
			$('#dashboard').show();
			$('.section-dashboard').hide();
			$('#tarefa').hide();
			$this.addClass('active-item');
		}

	});

	//DASHBOARD
	$('.dash-item').on('click', function(){

		$this = $(this);

		//REMOVO O ACTIVE EM TODAS TAB
		$('.dash-item').removeClass('active-item');

		//ADC NA ESPECIFICA
		$this.addClass('active-item');
		$dash_item = $this.attr('data-graf');
		
		if( $dash_item == 1 ){

			$('#section-pedidos-solicitantes').hide();
			$('#section-pedidos-pendentes').hide();
			$('#section-pedidos-dia').show();
			buscarPedidosDiarios();

			if( $.trim( $('#section-pedidos-dia' ).html() ) == '' ){
				
				buscarPedidosDiarios();

			}
		
		}
		else if( $dash_item == 2 ) {
			
			$('#section-pedidos-solicitantes').show();
			$('#section-pedidos-pendentes').hide();
			$('#section-pedidos-dia').hide();		

			buscarPedidosSolicitantes();

			if( $.trim( $('.conteudo-pedidos-solicitantes' ).html() ) == '' ){
				
				buscarPedidosSolicitantes();

			}
		}
		else if ( $dash_item == 3 ){

			$('#section-pedidos-pendentes').show();
			$('#section-pedidos-dia').hide();
			$('#section-pedidos-solicitantes').hide();		
			buscarPedidos('conteudo-pedido-pendentes');

			if( $.trim( $('.conteudo-pedidos-solicitantes' ).html() ) == '' ){
				buscarPedidosSolicitantes();
			}

		}

	});

	//ACCORDION - TASK
	$('.tab').on('click', function(){

		$this = $(this);

		//REMOVO O ACTIVE EM TODAS TAB
		$('.tab').removeClass('active-nav');

		//ADC NA ESPECIFICA
		$this.addClass('active-nav');
		$tab = $this.attr('data-tab');
		
		if( $tab == 1 ) {
			limpaPedidos();

			if( $.trim( $('#section-pedido' ).html() ) == '' ){
				buscarPedidos('conteudo-pedido');
			}
			else {
				$('#conteudo-pedido' ).html('');
				$('#consulta-pedido').html('');
				buscarPedidos('conteudo-pedido');
			}

		}
		else if( $tab == 2 ){
			$('#section-insumo').show();
			$('#section-pedido').hide();
			$('#section-solicitante').hide();
			
			$('#search-result').html('');
			$('.search-input').val('').hide('slow');
			$('#btn-clear').hide();

			if( $.trim( $('#conteudo-insumo' ).html() ) == '' ){
				buscarMateriais();
			}

		}
		else if( $tab == 3){
			$('#section-solicitante').show();
			$('#section-pedido').hide();
			$('#section-insumo').hide();
			$('#search-result').html('');
			$('.search-input').val('').hide('slow');
			$('#btn-clear').hide();

			// if( $.trim($('#conteudo-solicitante').html()) == '' ){
			// 	buscarMateriais();
			// }
		}

	}); 

	//BUSCA - HEADER
	$('#btn-search').on('click', function() {

		$('.search-input').show('slow', function() {

			$(this).focus();
			
			$('#btn-search').css('color', '#68BF3E');

			var id = $(this).val();

			if( id !== "" && $.isNumeric( id ) ) {

		  		//TAB PEDIDO ATIVA
		  		$(".navigation .ul .li").removeClass("active-nav");
		  		$('.navigation .ul .li:first-child').addClass('active-nav');

		  		//FACO A BUSCA
		  		pedido(id, 'search-result');
		  		$('#tarefa').show();

				//LIMPO INPUT E DEMAIS SESSOES
				$('.content').hide();
				$('#dashboard').hide();
				$('#btn-search').hide();
				$('#btn-clear').show();

			}

		});
	});
});

//HEADER
$('#btn-clear').on('click', function(){
	$(".navigation .ul .li").removeClass("active-nav");
	$('#search-result > div'). html('');
	$('.search-input').val('').hide('slow');
	$('#btn-clear').hide();
	$('#btn-search').show( function(){
		$(this).css('color', '#4a5c68');
	});
});

//PEDIDO FORM - TASK
$(document).on('click', '[class*="item_"]', function(e) {

	e.preventDefault();

	var $this = $(this);
	var id = $this.attr('data-id');

	if( $('.item_'+id).hasClass('active') ){

		$this.removeClass('active');

		$('#consulta-pedido > div').remove();

		$('#consulta-pedido-dashboard > div').remove();
		

		$("tr:not(.active)").slideDown("slow");

	}
	else {

		//PEDIDO ESCOLHIDO
		$('.item_'+id).addClass('active');

		//OCULTAR DEMAIS PEDIDOS
		$("tr:not(.active)").slideUp("slow");

		//PREENCHE FORM
		$('.form-pedido').slideDown("slow", function() {
			// console.log($(this));
			if( $(this).hasClass('task') ){
				pedido(id, 'consulta-pedido');
			}
			else if( $(this).hasClass('dashboard') ){
				pedido(id, 'consulta-pedido-dashboard');	
			}

		});
	}

});