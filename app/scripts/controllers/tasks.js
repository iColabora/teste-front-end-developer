'use strict';

/**
 * @ngdoc function
 * @name appShipment.controller:TasksCtrl
 * @description
 * # TasksCtrl
 * Controller of the testeFrontEndDeveloperApp
 */
angular.module('appShipment')
  .controller('TasksCtrl', function (pedidosPorDia) {
    var vm = this;

    vm.pedidos = pedidosPorDia;

    var somaPedidos = [];
    // Config gráfico
    var dados = {
        labels: [],
        datasets: [
            {
                label: "Numero de vendas no dia",
                backgroundColor: 'rgba(56, 187, 157, 0.2)',
                borderColor: 'rgba(56, 187, 157, 1)',
                borderWidth: 1,
                data: [],
    }]};

    // Soma total de pedidos por dia
    pedidosPorDia.map(function(e){
      // Verificador de registro encontrado
      var check = false;

      for(var i = 0; i < somaPedidos.length; i++){
        if(somaPedidos[i].data == e.data_de_compra){
          somaPedidos[i].total += 1;
          check = true;
         }
       }

       if(somaPedidos.length == 0){
         somaPedidos.push({ total: 1, data: e.data_de_compra});
       }

       if(!check){
         somaPedidos.push({ total: 1, data: e.data_de_compra});
       }
     });

     // Meses do ano em String
     var month = [];
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Abr";
        month[4] = "Mai";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Ago";
        month[8] = "Set";
        month[9] = "Out";
        month[10] = "Nov";
        month[11] = "Dez";

     // Insere dados no gráfico
     somaPedidos.map(function(e){
       var data = new Date(e.data);
       dados.labels.push(data.getDate() +"/"+month[data.getMonth()]);
       dados.datasets[0].data.push(e.total);
     });

     // Seta elemento e gera gráfico
     var ctx = document.getElementById("myChart");
     var myBarChart = new Chart(ctx, {
       type: 'line',
       data: dados,
     });

});
