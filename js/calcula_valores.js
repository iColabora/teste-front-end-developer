/* JS RESPONSÁVEL POR REALIZAR OS CÁLCULOS
Total do pedido ((preço dos insumos x quantidades) + (preço do material x quantidades));
*/

$(document).ready(function() {
	
	var qtd_pedido, qtd_insumo;
	var vlr_pedido, vlr_insumo;
	var total_insumo, total_pedido;
	var total;

	qtd_pedido = 0;
	qtd_insumo = 0;
	vlr_pedido = 0;
	vlr_insumo = 0;
	total_insumo = 0;
	total_pedido = 0;
	vlr_final = 0;

	$("#calcula_valores").click(function () {

		$('input[name^="insumo_quantidade"]').each(function( idx ) {
			qtd_insumo = parseInt($(this).val());

			$('input[name^="insumo_preco"]').each(function( idx2 ) {

				vlr_insumo = parseFloat($(this).val());

				if (idx == idx2) //Verifica se possuem o mesmo índice para calcular os insumos
					total_insumo += vlr_insumo * qtd_insumo;
			});


		});

		$('input[name^="pedido_quantidade"]').each(function( idx3 ) {
			
			qtd_pedido = parseInt($(this).val());

			$('input[name^="pedido_preco"]').each(function( idx4 ) {

				vlr_pedido = parseFloat($(this).val());

				if (idx3 == idx4) //Verifica se possuem o mesmo índice para calcular os insumos
					total_pedido += vlr_pedido * qtd_pedido;
			});


		});

		if (isNaN(total_insumo))
		{
			total_insumo = 0;
		}

		if (isNaN(total_pedido))
		{
			total_pedido = 0;
		}

		vlr_final = total_pedido + total_insumo;

		$("#total").val(vlr_final.toFixed(2));

			qtd_pedido = 0;
			qtd_insumo = 0;
			vlr_pedido = 0;
			vlr_insumo = 0;
			total_insumo = 0;
			total_pedido = 0;
	});
});