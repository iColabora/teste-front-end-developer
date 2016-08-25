var nomes = ["Joao", "Pedro", "Marcos"];
var qtd = [10,2,3];
var y=[];
var cont=0;



function carregaNome(){

      var mysql_query = "SELECT * FROM solicitantes";
      mysqlQuery(mysql_query, function(result) {
              // mostra o resultado da query
              var obj = JSON.parse(result);
              obj.forEach(function(el) {
                      nomes.push(el.nome);
                      var mysql_query = "SELECT count(*) FROM pedidos where id_solicitante="+el.id;
                      mysqlQuery(mysql_query, function(result) {
                              // mostra o resultado da query
                              var pedidos = JSON.parse(result);
                              pedidos.forEach(function(aux) {
                                //alert(aux["count(*)"]);
                                      qtd.push(aux["count(*)"]);

                                        });

                          x = nomes;
                          //alert(qtd);
                           carregaGraficoY(qtd);
                          });
                        });
          x = nomes;
          carregaGraficoX(x);
          });

}

$(document).ready(function() {
  var x;
carregaNome();
  //alert(nomes);
$('#grafico').highcharts({
   title: {
       text: 'Relatorio iColabora',
       x: -20 //center
   },
   subtitle: {
       text: 'Quantidade de Pedidos por clientes',
       x: -20
   },
   xAxis: {
       categories: [10,3,3,4,2,3,3],
       min: 0,
       max: 5
   },
   yAxis: {
       title: {
           text: 'Quantidade de Pedidos'
       },
       min: 0,
       max: 15,
       plotLines: [{
           value: 0,
           width: 1,
           color: '#808080'
       }]
   },
   tooltip: {
       valueSuffix: ' pedidos'
   },
   legend: {
       layout: 'vertical',
       align: 'right',
       verticalAlign: 'middle',
       borderWidth: 0
   },
   series: [{
        name: 'qtdPedidos',
         data: [10,3,3,4,2,3,3]
   }]
 });

});

function carregaGraficoX(x){
  $('#grafico').highcharts({
     title: {
         text: 'Relatorio iColabora',
         x: -20 //center
     },
     subtitle: {
         text: 'Quantidade de Pedidos por clientes',
         x: -20
     },
     xAxis: {
         categories: x,
         min: 0,
         max: x.length-1
     },
     yAxis: {
         title: {
             text: 'Quantidade de Pedidos'
         },
         min: 0,
         max: 15,
         plotLines: [{
             value: 0,
             width: 1,
             color: '#808080'
         }]
     },
     tooltip: {
         valueSuffix: ' pedidos'
     },
     legend: {
         layout: 'vertical',
         align: 'right',
         verticalAlign: 'middle',
         borderWidth: 0
     },
     series: [{
          name: 'qtdPedidos',
           data: y
     }]
   });
}


function carregaGraficoY(y){
  $('#grafico').highcharts({
     title: {
         text: 'Relatorio iColabora',
         x: -20 //center
     },
     subtitle: {
         text: 'Quantidade de Pedidos por clientes',
         x: -20
     },
     xAxis: {
         categories: x,
         min: 0,
         max: x.length-1
     },
     yAxis: {
         title: {
             text: 'Quantidade de Pedidos'
         },
         min: 0,
         max: 15,
         plotLines: [{
             value: 0,
             width: 1,
             color: '#808080'
         }]
     },
     tooltip: {
         valueSuffix: ' pedidos'
     },
     legend: {
         layout: 'vertical',
         align: 'right',
         verticalAlign: 'middle',
         borderWidth: 0
     },
     series: [{
          name: 'qtdPedidos',
           data: y
     }]
   });
}
