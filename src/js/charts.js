$(document).ready(function(){
  $('#tabela-pedidos-pendentes').DataTable();
  document.getElementById("first-tab").click();
  var myChart = Highcharts.chart('chart-produto-dia', {
      chart: {
          type: 'bar'
      },
      title: {
          text: 'Produtos por Dia'
      },
      subtitle: {
          text: 'Comparação 3 últimos anos'
      },
      xAxis: {
          categories: ['20/03', '21/03', '22/03', '23/03', '24/03', '25/03'],
          title: {
              text: null
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Pedidos',
              align: 'high'
          },
          labels: {
              overflow: 'justify'
          }
      },
      tooltip: {
          valueSuffix: ' Pedidos'
      },
      plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
          shadow: true
      },
      credits: {
          enabled: false
      },
      series: [{
          name: 'Ano 2015',
          data: [107, 31, 635, 203, 2]
      }, {
          name: 'Ano 2016',
          data: [133, 156, 947, 408, 6]
      }, {
          name: 'Ano 2017',
          data: [1052, 954, 4250, 740, 38]
      }]
  });

  var chartSolicitantes = Highcharts.chart('chart-solicitantes', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Pedidos por solicitantes'
    },
    xAxis: {
        categories: ['20/03/2017', '21/03/2017', '22/03/2017', '23/03/2017', '24/03/2017']
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Barry Allen',
        data: [5, 3, 4, 7, 2]
    }, {
        name: 'Tony Stark',
        data: [2, 2, 3, 2, 1]
    },{
       name: 'Victor Stone',
       data: [2, 2, 3, 2, 1]
   }, {
        name: 'Edward Nygma',
        data: [3, 4, 4, 0, 5]
    }]
});
});
