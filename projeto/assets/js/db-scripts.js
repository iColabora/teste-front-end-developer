
// ========== HEADER E TASK ==========
//FORM
var pedido = function(id, id_css) {

	var verifica_id = "SELECT id FROM pedidos WHERE id="+id;

	mysqlQuery(verifica_id, function(r){
		
		var obj = JSON.parse(r);

		if( JSON.stringify(obj) !== '[]' ) {

			var mysql_query = "SELECT p.id, p.data_de_compra, "+ 
									"m.id_pedido, m.nome AS nm_material, m.marca, m.quantidade AS qt_material, m.preco AS vl_material, "+
									"i.quantidade AS qt_insumo, i.preco AS vl_insumo "+
									"FROM pedidos p, materiais m, insumos i "+
									"WHERE p.id = m.id_pedido AND p.id = i.id_pedido AND p.id= "+id+" "+
									"GROUP BY p.id";

				mysqlQuery(mysql_query, function(resultado){
					// mostra o resultado da query
					var obj = JSON.parse(resultado);
					// console.log(obj);

					if(obj !== null && obj !== "" ) {

						var form =  document.getElementById(id_css);

						//LIMPO DIV SE JA HOUVE UMA BUSCA
						if( $.trim($('#search-result').html()) !== '') {
							$('#search-result'). html('');
						}

						//PREENCHE FORM
						obj.forEach(function(el){

							var total_pedido = ( (el.vl_insumo * el.qt_insumo) + (el.vl_material * el.qt_material) );

							var html_body = "<div><fieldset class='block-input'><label class='label'>N° Pedido</label><input type='text' value='"	+el.id_pedido							+"' class='input little' disabled /></fieldset>"+
										"<fieldset class='block-input'><label class='label'>Material</label><input type='text' value='"			+el.nm_material					+"' class='input full' disabled /></fieldset>"+
										"<fieldset class='block-input'><label class='label'>Marca</label><input type='text' value='"			+el.marca						+"' class='input full' disabled /></fieldset>"+
										"<fieldset class='block-input'><label class='label'>Data da Compra</label><input type='text' value='"	+formataData(el.data_de_compra)	+"' class='input full' disabled /></fieldset>"+
										"<fieldset class='block-input left'><label class='label'>Qtde.</label><input type='text' value='"		+el.qt_material					+"' class='input little' disabled /></fieldset>"+
										"<fieldset class='block-input right'><label class='label'>Total</label><input type='text' value='"		+total_pedido					+"' class='input preco' disabled /></fieldset></div>";

							form.innerHTML += html_body;

						});

					}

				});
		}
		else {

			$('#search-result').append("<h1 class='not-found'>PEDIDO NÃO ENCONTRADO :'( </h1>");

		}

	});
}

// ========== TASK ==========
var buscarPedidos = function(id_css) {

	var mysql_query = "SELECT p.*, s.id, s.nome AS nm_solicitante FROM pedidos p, solicitantes s WHERE p.id = s.id";

	mysqlQuery(mysql_query, function(result){
		// mostra o resultado da query
		var obj = JSON.parse(result);
		// console.log(obj);
		var table_body =  document.getElementById(id_css);

		obj.forEach(function(el){
		var html_body = "<tr class='item_"+el.id+"' data-id="+el.id+">"+
			"<td class='td'>"+el.id+"</td>"+
			"<td class='td'>"+el.nm_solicitante+"</td>"+
			"<td class='td'>"+formataData(el.data_de_compra)+"</td>"+
			"<td class='td'><i class='fa fa-chevron-down'></i></td>"+
			"</tr>";
			table_body.innerHTML += html_body;
		});

	});
};

var buscarMateriais = function() {

	// var mysql_query = "SELECT p.*, s.id, s.nome AS nm_solicitante FROM pedidos p, solicitantes s WHERE p.id = s.id";

	// mysqlQuery(mysql_query, function(result){
	// 	// mostra o resultado da query
	// 	var obj = JSON.parse(result);
	// 	// console.log(obj);
	// 	var table_body =  document.getElementById("conteudo-pedido");

	// 	obj.forEach(function(el){
	// 	var html_body = "<tr class='item_"+el.id+"'' data-id="+el.id+">"+
	// 		"<td>"+el.id+"</td>"+
	// 		"<td>"+el.nm_solicitante+"</td>"+
	// 		"<td>"+el.data_de_compra+"</td>"+
	// 		"<td>v</td>"+
	// 		"</tr>";
	// 		table_body.innerHTML += html_body;
	// 	});

	// });
};


// ========== DASHBOARD ==========
var buscarPedidosSolicitantes = function() {

	google.charts.setOnLoadCallback(drawChart);
 
    function drawChart() {

      var mysql_query = "SELECT s.nome, COUNT(p.id_solicitante) AS qt_pedido FROM solicitantes s, pedidos p WHERE s.id = p.id_solicitante GROUP BY s.nome";
      var obj; 
      var retorno = [];
      var data;
      
      mysqlQuery(mysql_query, function(result){
        obj = JSON.parse(result);  

        //FORMATO DO GRAFICO
        retorno.push(['solicitante', 'quantidade']);

        obj.forEach(function(el){
        	//ALIMENTO O ARRAY COM DADOS DA CONSULTA, CONFORME FORMATO DO GRAFICO
        	retorno.push([el.nome, el.qt_pedido]);
        });

        // console.log(retorno);

		//DESENHA GRAFICO
	    data = google.visualization.arrayToDataTable(retorno);

        var options = {
          title: 'Pedidos por solicitante',
          is3D: true,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);

      });
    }

}

var buscarPedidosDiarios = function() {

	var mysql_query = "SELECT COUNT(id) AS qt_pedido, data_de_compra FROM pedidos GROUP BY data_de_compra" ;
    
    var obj; 
    var retorno = [];
    var data;

    mysqlQuery(mysql_query, function(result){

        obj = JSON.parse(result);

        //FORMATO DO GRAFICO
        retorno.push(['Data', 'quantidade']);

		var dt_antiga;
		var qt_pedido_dia = 1;

        obj.forEach(function(el){

        	if(dt_antiga == formataData(el.data_de_compra)) {
        		qt_pedido_dia = qt_pedido_dia + 1;
        	}

        	dt_antiga = formataData(el.data_de_compra);

        	retorno.push([formataData(el.data_de_compra), qt_pedido_dia]);

        });

        //DESENHA GRAFICO
	    data = google.visualization.arrayToDataTable(retorno);

        var options = {
          title: 'Quantidade de pedidos por dia',
          is3D: true,
        };

        var chart = new google.visualization.PieChart(document.getElementById('pedidos-dia-chart'));
        chart.draw(data, options);

    });
}

var formataData = function(data) {

	formato_brasil = new Date(data);

	var dd = formato_brasil.getDate();
	if(dd < 10) {
	    dd = '0'+ dd;
    }

	var mm = formato_brasil.getMonth()+1;
	if(mm < 10)
    {
	    mm = '0' + mm;
    }

    var yyyy = formato_brasil.getFullYear();

    var formato = dd+'/'+mm+'/'+yyyy;

	return formato;
}


