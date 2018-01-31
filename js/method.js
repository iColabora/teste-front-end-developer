// table dashboad

window.onload = function () {

    var mysql_query = "SELECT p.id,s.nome,p.data_de_compra,p.cep FROM pedidos p INNER JOIN solicitantes s on p.id_solicitante = s.id ORDER BY p.id ASC";

    mysqlQuery(mysql_query, function (result) {
        // mostra o resultado da query
        var obj = JSON.parse(result);
        var table_body = document.getElementById("pedidosPendentes");

        obj.forEach(function (pedido) {
            var html_body = "<tr>" +
                "<td>" + pedido.id + "</td>" +
                "<td>" + pedido.nome + "</td>" +
                "<td>" + pedido.data_de_compra + "</td>" +
                "<td>" + pedido.cep + "</td>" +
                "</tr>";
            table_body.innerHTML += html_body;
        });

    });
};

// graphic Pedidos por Dia

var ctx = document.getElementById("pedidosDia");
      var pedidosDia = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ["15/06", "22/06", "25/06", "01/07", "05/07", "09/07", "11/07", "15/07"],
          datasets: [{
            data: [0, 1, 0, 1, 1, 1, 1, 0],
            backgroundColor: 'rgba(153, 153, 153, 0.15)',
            borderColor: '#39bb9d',
            borderWidth: 6,
            pointBackgroundColor: '#39bb9d'
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                  max: 2,
                  stepSize: 1
              }
            }]
          },
          legend: {
            display: false,
          }
        }
      });

// graphic Pedidos por Solicitante

var ctx = document.getElementById("pedidosSolicitantes").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['2 - Benjamin Heitor de Paula', '3 - Luan Alexandre Ian Mendes', '4 - Renato Theo Cavalcanti', '5 - Yuri Kevin Caio Gomes'],
        datasets: [{
            data: [1, 2, 1, 1],
            backgroundColor: [
                'rgba(153, 102, 255, 0.25)',
                'rgba(255, 99, 132, 0.25)',
                'rgba(255, 206, 86, 0.25)',                
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(153, 102, 255, 0.9)',
                'rgba(255,99,132,0.9)',
                 'rgba(255, 206, 86, 0.9)',
                'rgba(75, 192, 192, 0.9)',
            ],
            borderWidth: 1
        }]
    },
    options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                  max: 3,
                  stepSize: 1
              }
            }]
          },
          legend: {
            display: false,
          }
        }
      });
