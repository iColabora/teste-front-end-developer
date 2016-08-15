// PEGA DATA ATUAL
function dataAtualFormatada(){
	var data = new Date();
	var dia = data.getDate();
	var ano = data.getFullYear();
	var mes = data.getMonth() + 1;

	if (dia.toString().length == 1)
		dia = "0" + dia;

	if (mes.toString().length == 1)
		mes = "0" + mes;

	return dia + "/" + mes + "/" + ano;
}

// FUNÇÃO AJAX
function Ajax(url, tipo, tipo_data){

	$(".content").html("");

	$.ajax({
		url: url,
		type: tipo,
		dataType: tipo_data,

		success: function(data){
			$(".content").html(data);
		},

		error: function(){
			$(".content").html("<p>Erro ao carregar página.</p>");
		}
    });
}

/*BLOQUEIA LETRAS NOS CAMPOS*/
function BloqueiaLetras(evento)
{
	var tecla;
	
	if(window.event) { 
		tecla = event.keyCode;
	}
	else {
		tecla = evento.which;
	}

	if(tecla >= 48 && tecla <= 57 || tecla == 8) 
		return true;
	else 
		return false;
}

$(document).ready(function(){

	/*MENU MOBILE*/
	$("#ico-menu-mobile").click(function(){
		$("#container-menu-mobile").slideDown("fast");
	});

	/*BT PESQUISAR*/
	$("#bt-pesquisar").click(function(){
		$("#container-pesquisar").slideDown("fast");
		$("#input-pesquisar").focus();
	});

	// BLOQUEIA LETRAS NO CAMPO PESQUISAR PEDIDO
	$("#input-pesquisar").keypress(function(){
		return BloqueiaLetras(event);
	});

	/*BT FECHAR*/
	$("#bt_fechar").click(function(){
		$("#container-pesquisar").slideUp("fast");
		$("#input-pesquisar").val("");
		$(".pedido-branco").slideUp("fast");
	});

	/*BT FECHAR MOBILE*/
	$("#bt_fechar_mobile").click(function(){
		$("#container-menu-mobile").slideUp("fast");
	});

	/*BT MOBILE DASHBOARD*/
	$("#mobile-dashboards").click(function(){
		Ajax("dashboards.html", "POST", "html");
		$("#container-menu-mobile").slideUp("fast");
	});

	/*BT MOBILE PESQUISAR*/
	$("#mobile-pesquisar").click(function(){
		Ajax("dashboards.html", "POST", "html");
		$("#container-menu-mobile").slideUp("fast");
		$("#container-pesquisar").slideDown("fast");
		$("#input-pesquisar").focus();
	});

	/*PESQUISAR PEDIDO*/
	$("#bt-pesquisar-pedido").click(function(){
		if($("#input-pesquisar").val().length < 1){
           $(".pedido-branco").slideDown("fast");
           $("#input-pesquisar").focus();
        }
        else{
			$(".pedido-branco").slideUp("fast");
			$("#container-pesquisar").slideUp("fast");

			Ajax("pesquisar_pedidos.html", "POST", "html");

			var paramPedido = $("#input-pesquisar").val();

			var mysql_query = "SELECT p.id id_pedido, p.data_de_compra, p.cep, ";
			mysql_query += "p.rua, p.numero, p.bairro, p.cidade, p.estado, p.pais ";
			mysql_query += "from pedidos p ";
			mysql_query += "where p.id = " + paramPedido;
			
			mysqlQuery(mysql_query, function(result){
		    	
		    	var obj = JSON.parse(result);

			    obj.forEach(function(el){
			    	$("#conteudo-pedido").html(
			    		"<tr>"+
							"<td>"+el.id_pedido+"</td>"+
							"<td>"+el.data_de_compra+"</td>"+
							"<td>"+el.cep+"</td>"+
							"<td>"+el.rua+"</td>"+
							"<td>"+el.numero+"</td>"+
							"<td>"+el.bairro+"</td>"+
							"<td>"+el.cidade+"</td>"+
							"<td>"+el.estado+"</td>"+
							"<td>"+el.pais+"</td>"+
						"</tr>"
					);
			    });
		  	});

		  	$("#input-pesquisar").val("");
        }
    });

	/*MENU PRINCIPAL DASHBOARD*/
	$("#pag-dashboards").click(function(){
		Ajax("dashboards.html", "POST", "html");
	});

	/*MENU SECUNDARIO DASHBOARD - ONE*/
	$("#bt-dashboard-one").live('click','#bt-dashboard-one', function(){

		$("#content-dashboard").hide();
		$("#grafico").show();

		// PEGA DATA ATUAL
		var dataAtual = dataAtualFormatada();

		var mysql_query = "SELECT COUNT(P.ID) qtde FROM pedidos P ";
		mysql_query += "WHERE P.DATA_DE_COMPRA = '" + dataAtual + "'";

	  	mysqlQuery(mysql_query, function(result){
	    	
	    	var obj = JSON.parse(result);

		    obj.forEach(function(el){
		    	var qtde_pedidos_dia = el.qtde;

				// GRÁFICO
			    google.charts.load("current", {packages:["corechart"]});
			    google.charts.setOnLoadCallback(drawChart);

			   	function drawChart() {
					var data = google.visualization.arrayToDataTable([
						['Data', 'Quantidade'],
						[dataAtual, qtde_pedidos_dia]
					]);

			        var options = {
			        	title: 'Quantidade de pedidos por dia'
			        };

					var view = new google.visualization.DataView(data);
					var chart = new google.visualization.BarChart(document.getElementById("grafico"));
			      	chart.draw(view, options);
			    }			
		    });
	  	});
	});

	/*MENU SECUNDARIO DASHBOARD - TWO*/
	$("#bt-dashboard-two").live('click','#bt-dashboard-two', function(){

		$("#content-dashboard").hide();
		$("#grafico").show();

		var mysql_query = "select s.nome nome, count(p.id) qtde from pedidos p inner join solicitantes s ";
		mysql_query += "on s.id = p.id_solicitante";

	  	mysqlQuery(mysql_query, function(result){
	    	
	    	var obj = JSON.parse(result);

		    obj.forEach(function(el){
		    	var nome_solicitante = el.nome;
		    	var qtde_pedidos = el.qtde;

				// GRÁFICO
			    google.charts.load("current", {packages:["corechart"]});
			    google.charts.setOnLoadCallback(drawChart);

			   	function drawChart() {
					var data = google.visualization.arrayToDataTable([
						['Cliente', 'Quantidade de pedidos'],
						[nome_solicitante, qtde_pedidos]
					]);

			        var options = {
			        	title: 'Quantidade de pedidos por Cliente'
			        };

					var view = new google.visualization.DataView(data);
					var chart = new google.visualization.BarChart(document.getElementById("grafico"));
			      	chart.draw(view, options);
			    }				
		    });
	  	});
	});

	/*MENU SECUNDARIO DASHBOARD - THREE*/
	$("#bt-dashboard-three").live('click','#bt-dashboard-three', function(){

		$("#grafico").hide();

		var mysql_query = "SELECT p.id id_pedido, s.nome nome_solicitante, p.data_de_compra, p.cep, ";
		mysql_query += "p.rua, p.numero, p.bairro, p.cidade, p.estado, p.pais ";
		mysql_query += "from pedidos p inner join solicitantes s ";
		mysql_query += "where p.data_de_compra is not null";

		
		mysqlQuery(mysql_query, function(result){
	    	
	    	var obj = JSON.parse(result); 

		    obj.forEach(function(el){
		    	$("#conteudo-dashboard").html(
		    		"<tr>"+
						"<td>"+el.id_pedido+"</td>"+
						"<td>"+el.nome_solicitante+"</td>"+
						"<td>"+el.data_de_compra+"</td>"+
						"<td>"+el.cep+"</td>"+
						"<td>"+el.rua+"</td>"+
						"<td>"+el.numero+"</td>"+
						"<td>"+el.bairro+"</td>"+
						"<td>"+el.cidade+"</td>"+
						"<td>"+el.estado+"</td>"+
						"<td>"+el.pais+"</td>"+
					"</tr>"
				);
		    });
	  	});

	  	$("#content-dashboard").show();

	});

	/*CADASTRO DE PEDIDOS*/
	Ajax("pedidos.html", "POST", "html");

	/*LOGO*/
	$("#logo").click(function(){
		Ajax("pedidos.html", "POST", "html");
	});

	// BLOQUEIA LETRAS NO CAMPO
	$("#num-pedido, #qtde-material, #qtde-insumo, #cep-entrega").live('keypress','#qtde-insumo, #num-pedido, #qtde-material, #cep-entrega', function(){
		return BloqueiaLetras(event);
	});

	// VALIDAR E CADASTRAR PEDIDO
    $("#bt-cadastrar-pedido").live('click','#bt-cadastrar-pedido', function(){

        if($("#num-pedido").val().length < 1){
            alert("Campo número do pedido em branco");
            $("#num-pedido").focus();
        }

        else if($("#inp-material-pedido").val().length < 1){
            alert("Campo material em branco");
            $("#inp-material-pedido").focus();
        }

        else if($("#inp-marca").val().length < 1){
            alert("Campo marca em branco");
            $("#inp-marca").focus();
        }

        else if($("#preco-material").val().length < 1){
            alert("Campo preço em branco");
            $("#preco-material").focus();
        }

        else if($("#data-compra").val().length < 1){
            alert("Campo data da compra em branco");
            $("#data-compra").focus();
        }

        else if($("#qtde-material").val().length < 1){
            alert("Campo quantidade material em branco");
            $("#qtde-material").focus();
        }

        else if($("#marca-insumo").val().length < 1){
            alert("Campo marca do insumo em branco");
            $("#marca-insumo").focus();
        }

        else if($("#desc-insumo").val().length < 1){
            alert("Campo descrição do insumo em branco");
            $("#desc-insumo").focus();
        }

        else if($("#qtde-insumo").val().length < 1){
            alert("Campo quantidade de insumo em branco");
            $("#qtde-insumo").focus();
        }

        else if($("#preco-insumo").val().length < 1){
            alert("Campo preço do insumo em branco");
            $("#preco-insumo").focus();
        }

        else if($("#nome-solicitante").val().length < 1){
            alert("Campo nome do solicitante em branco");
            $("#nome-solicitante").focus();
        }

        else if($("#telefone-solicitante").val().length < 1){
            alert("Campo telefone do solicitante em branco");
            $("#telefone-solicitante").focus();
        }

        else if($("#cpf-solicitante").val().length < 1){
            alert("Campo cpf do solicitante em branco");
            $("#cpf-solicitante").focus();
        }

        else if($("#cep-solicitante").val().length < 1){
            alert("Campo cep do solicitante em branco");
            $("#cep-solicitante").focus();
        }

        else if($("#endereco-solicitante").val().length < 1){
            alert("Campo endereço do solicitante em branco");
            $("#endereco-solicitante").focus();
        }

        else if($("#bairro-solicitante").val().length < 1){
            alert("Campo bairro do solicitante em branco");
            $("#bairro-solicitante").focus();
        }

       	else if($("#numero-solicitante").val().length < 1){
            alert("Campo número do solicitante em branco");
            $("#numero-solicitante").focus();
        }

        else if($("#cidade-solicitante").val().length < 1){
            alert("Campo cidade do solicitante em branco");
            $("#cidade-solicitante").focus();
        }

        else if($("#estado-solicitante").val().length < 1){
            alert("Campo estado do solicitante em branco");
            $("#estado-solicitante").focus();
        }

        else if($("#pais-solicitante").val().length < 1){
            alert("Campo país do solicitante em branco");
            $("#pais-solicitante").focus();
        }

        else if($("#cep-entrega").val().length < 1){
            alert("Campo cep de entrega em branco");
            $("#cep-entrega").focus();
        }

        else if($("#endereco-entrega").val().length < 1){
            alert("Campo endereço de entrega em branco");
            $("#endereco-entrega").focus();
        }

        else if($("#bairro-entrega").val().length < 1){
            alert("Campo bairro da entrega em branco");
            $("#bairro-entrega").focus();
        }

        else if($("#numero-entrega").val().length < 1){
            alert("Campo número de entrega em branco");
            $("#numero-entrega").focus();
        }

        else if($("#cidade-entrega").val().length < 1){
            alert("Campo cidade de entrega em branco");
            $("#cidade-entrega").focus();
        }

        else if($("#estado-entrega").val().length < 1){
            alert("Campo estado de entrega em branco");
            $("#estado-entrega").focus();
        }

        else if($("#pais-entrega").val().length < 1){
            alert("Campo país de entrega em branco");
            $("#pais-entrega").focus();
        }
    });

	// CARREGAR CEP SOLICITANTE
    $("#cep-solicitante").live('change','#cep-solicitante', function(){

    	var cep = $("#cep-solicitante").val();

	    $.ajax({
			url: "https://viacep.com.br/ws/"+cep+"/json",
			type: "GET",
			dataType: "json",

			success: function(data){
				$("#endereco-solicitante").val(data.logradouro);
				$("#cidade-solicitante").val(data.localidade);
				$("#estado-solicitante").val(data.uf);
			}
	    }); 
	});


	// CARREGAR CEP ENTREGA
    $("#cep-entrega").live('change','#cep-entrega', function(){

    	var cep = $("#cep-entrega").val();

	    $.ajax({
			url: "https://viacep.com.br/ws/"+cep+"/json",
			type: "GET",
			dataType: "json",

			success: function(data){
				$("#endereco-entrega").val(data.logradouro);
				$("#cidade-entrega").val(data.localidade);
				$("#estado-entrega").val(data.uf);
			}
	    }); 
	});
});