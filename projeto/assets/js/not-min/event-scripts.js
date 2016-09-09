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
		else if( $item == 1 ){
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

			if( $.trim( $('#section-pedidos-dia' ).html() ) == '' ) {
				
				buscarPedidosDiarios();

			}
		
		}
		else if( $dash_item == 2 ) {
			
			$('#section-pedidos-solicitantes').show();
			$('#section-pedidos-pendentes').hide();
			$('#section-pedidos-dia').hide();		

			buscarPedidosSolicitantes();

			if( $.trim( $('.conteudo-pedidos-solicitantes' ).html() ) == '' ) {
				
				buscarPedidosSolicitantes();

			}
		}
		else if ( $dash_item == 3 ){

			$('#section-pedidos-pendentes').show();
			$('#section-pedidos-dia').hide();
			$('#section-pedidos-solicitantes').hide();		
			buscarPedidos('conteudo-pedido-pendentes');

			if( $.trim( $('.conteudo-pedidos-solicitantes' ).html() ) == '' ) {
				buscarPedidosSolicitantes();
			}

		}

	});

	//TASK
	$('.tab').on('click', function(){

		$this = $(this);

		//REMOVO O ACTIVE EM TODAS TAB
		$('.tab').removeClass('active-nav');

		//ADC NA ESPECIFICA
		$this.addClass('active-nav');
		$tab = $this.attr('data-tab');
		
		if( $tab == 1 ) {

			limpaPedidos();

			if( $.trim( $('#section-pedido' ).html() ) == '' ) {
				buscarPedidos('conteudo-pedido');
			}
			else {
				$('#conteudo-pedido' ).html('');
				$('#consulta-pedido').html('');
				buscarPedidos('conteudo-pedido');
			}

		}
		else if( $tab == 2 ){

			limpaInsumos();

			if( $.trim( $('#conteudo-insumo' ).html() ) == '' ) {
				buscarInsumos(2);
			}
			else {
				$('#conteudo-insumo' ).html('');
				$('#consulta-insumo').hide();
				$('#visualizar-mais-insumo').prop('disabled', false);
				buscarInsumos(2);
			}

		}
		else if( $tab == 3) {

			limpaSolicitantes();
			
			if( $.trim($('#conteudo-solicitante').html()) == '' ) {
				buscarSolicitantes();
			}
			else {
				$('#conteudo-solicitante' ).html('');
				buscarSolicitantes();
			}
		}
		else if( $tab == 4 ) {

			limpaMateriais();

			if( $.trim($('#conteudo-material').html()) == '' ) {
				buscarMateriais();
			}
			else {
				$('#conteudo-material' ).html('');
				$('.consulta-material').hide();
				buscarMateriais();
			}

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
		$('#tb-pedido thead tr').addClass('active');

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

//INSUMOS
$('#visualizar-mais-insumo').on('click', function(e){
	e.preventDefault();

	var total_linhas = $('#conteudo-insumo tr').length;
	var limit = total_linhas + 1;

	$('#conteudo-insumo').html('');
	buscarInsumos(limit);

	if( total_linhas == 8 ){
		$('#visualizar-mais-insumo').prop('disabled', true);
	}
	
});

//SOLICITANTE
$(document).on('click', '[class*="solicitante_"]', function(e) {

	e.preventDefault();

	var $this = $(this);
	var id = $this.attr('data-id');
	var cep = $(this).closest('tr').find('td[data-cep]').data('cep');

	if( $('.solicitante_'+id).hasClass('active') ) {

		$this.removeClass('active');

		// $('#tb-solicitante thead tr').addClass('active');

		$('.form-solicitante').slideUp("slow");

		$("tr:not(.active)").slideDown("slow");

	}
	else {

		//SOLICITANTES ESCOLHIDO
		$('#tb-solicitante thead tr').addClass('active');
		$('.solicitante_'+id).addClass('active');

		//OCULTAR DEMAIS SOLICITANTES
		$("tr:not(.active)").slideUp("slow");

		//PREENCHE FORM
		$('.form-solicitante').slideDown("slow", function() {

			$("#rua").val("...");
            $("#bairro").val("...");
            $("#cidade").val("...");
            $("#estado").val("...");

            $.getJSON("//viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                if (!("erro" in dados)) {
                    //Atualiza os campos com os valores da consulta.
                    $("#rua").val(dados.logradouro);
                    $("#bairro").val(dados.bairro);
                    $("#cidade").val(dados.localidade);
                    $("#estado").val(dados.uf);
            	}
                else {
                    alert("CEP não encontrado.");
                }
            });

		});
	}

});

//MATERIAL
$(document).on('click', '[class*="material_"]', function(e) {

	e.preventDefault();

	var $this = $(this);
	var id = $this.attr('data-id');

	if( $('.material_'+id).hasClass('active') ) {

		$this.removeClass('active');

		$('.form-material').slideUp("slow");

		$("tr:not(.active)").slideDown("slow");

	}
	else {

		//MATERIAL ESCOLHIDO
		$('#tb-material thead tr').addClass('active');
		$('.material_'+id).addClass('active');

		//OCULTAR DEMAIS MATERIAL
		$("#tb-material tr:not(.active)").slideUp("slow");
		$("#conteudo-pedido-material tr").remove();

		//MOSTRA PEDIDOS RELACIONADO AO MATERIAL
		$('.form-material').slideDown("slow", function() {
			// console.log($(this));
			buscarMaterialPedido(id);
		});

	}

});