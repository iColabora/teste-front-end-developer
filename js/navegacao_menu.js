/* JS RESPONSÁVEL PELA NAVEGAÇÃO NA APLICAÇÃO SEM A NECESSIDADE DE CRIAÇÃO
   DE VÁRIAS PÁGINAS.

   ENTRETANTO, O MELHOR CAMINHO AINDA É SEPARAR OS ARQUIVOS. FOI FEITO DESTA MANEIRA,
   LEVANDO EM CONSIDERAÇÃO A ESTE PONTO:

   PS2: A url da página não pode ser recarregada em momento algum.

*/

$(document).ready(function() {

	$("#task").fadeOut();
	$("#dashboard").fadeIn();
	

	$("#menu_dashboard").click(function() {

		$("#task").fadeOut();
		$('.custom-container-task').fadeOut();
		$("#dashboard").fadeIn();
		$('.custom-container-dashboard').fadeIn();

	});

	$(".custom-mid-button").click(function() {
		$("#task").fadeIn();
		$("#dashboard").fadeOut();
		$("#form").trigger('reset'); //jquery
		$('.custom-container-dashboard').fadeOut();
		$('.custom-container-task').fadeIn();
	});



});