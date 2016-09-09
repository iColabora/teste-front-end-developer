'use strict';

/**
 * @ngdoc function
 * @name appShipment.controller:SolicitantesCtrl
 * @description
 * # SolicitantesCtrl
 * Controller of the appShipment
 */
angular.module('appShipment')
  .controller('SolicitantesCtrl', function (pedidosPorSolicitante) {

    var vm = this;

    vm.pedidos = pedidosPorSolicitante;

    var somaPedidos = [];

    // Config gráfico
    var dados = {
        labels: [],
        datasets: [
            {
                label: "Número de pedidos",
                backgroundColor: 'rgba(56, 187, 157, 0.2)',
                borderColor: 'rgba(56, 187, 157, 1)',
                borderWidth: 1,
                data: [],
    }]};

    // Soma total de pedidos por dia
    pedidosPorSolicitante.map(function(e){
      // Verificador de registro encontrado
      var check = false;

      for(var i = 0; i < somaPedidos.length; i++){
        if(somaPedidos[i].solicitante == e.nome){
          somaPedidos[i].total += 1;
          check = true;
         }
       }

       if(somaPedidos.length == 0){
         somaPedidos.push({ total: 1, solicitante: e.nome});
       }

       if(!check){
         somaPedidos.push({ total: 1, solicitante: e.nome});
       }
     });

     // Insere dados no gráfico
     somaPedidos.map(function(e){
       var data = new Date(e.data);
       dados.labels.push(e.solicitante);
       dados.datasets[0].data.push(e.total);
     });

     // Seta elemento e gera gráfico
     setTimeout(function(){
       var ctx = document.getElementById("chartSolicitante");
       var myBarChart = new Chart(ctx, {
         type: 'bar',
         data: dados,
         options: {
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0
                    }
                }]
            }
        }
       });
     },0)

  });
