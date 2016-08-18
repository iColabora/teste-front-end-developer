$(document).ready(function() {
	$("#dashboardDia").click(function(){
		$("#dashboard").load("dashboard.html");
		hideWelcome()
	})
	
	$("#dashboardSolicitante").click(function(){
		$("#dashboard").load("dashboard2.html");
		hideWelcome()
	})
	
	$("#dashboardPendentes").click(function(){
		$("#dashboard").load("dashboard3.html");
		hideWelcome()
	})
	
	$("#iniciar_processo").click(function(){
		$("#formulario").load("formulario.html");
		hideWelcome()
	})
	
	$("#iniciar_processo_button").click(function(){
		$("#formulario").load("formulario.html");
		hideWelcome()
	})
	
	function hideWelcome(){
		$("#welcome").css('display','none');
	}	
});

