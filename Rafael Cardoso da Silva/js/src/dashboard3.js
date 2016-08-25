function initDashboard3(){
	
	// show submenu 
	$("nav.submenu").hide();
	$("nav#dashboard").show();

	var mysql_query = "SELECT "+
	"p.id, DATE(p.data_de_compra) AS data_de_compra, p.cep, p.rua, p.cidade, p.estado, " +
	"s.nome, s.telefone, s.cpf " +
	"FROM pedidos p "+
	"JOIN solicitantes s ON p.id_solicitante = s.id "+
	"ORDER BY p.id";

  	mysqlQuery(mysql_query, function(result){
    	
    	var obj = JSON.parse(result);

    	for( key in obj ){

    		// data de compra
    		data_de_compra = obj[key].data_de_compra.substr(0, 10);

    		var item = ""+
    		"<tr>"+
    		 "<td>"+(Number(key)+1)+"</td>"+
    		 "<td>"+obj[key].nome+"</td>"+
    		 "<td>"+obj[key].telefone+"</td>"+
    		 "<td>"+obj[key].cpf+"</td>"+
    		 "<td>"+obj[key].cep+"</td>"+
    		 "<td>"+obj[key].rua+"</td>"+
    		 "<td>"+data_de_compra+"</td>"+
    		"</tr>";


    		$(".tb-pedidos").append(item);
    	}

  	});

}