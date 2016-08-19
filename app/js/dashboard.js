$(function(){

  var data = {
  // A labels array that can contain any sort of values
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  // Our series array that contains series objects or in this case series data arrays
  series: [
    [5, 2, 4, 2, 0]
  ]
  };
  new Chartist.Line('.ct-chart', data);

  var dataChart = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
    [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
    [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
  ]
};

var options = {
  seriesBarDistance: 15
};

var responsiveOptions = [
  ['screen and (min-width: 641px) and (max-width: 1024px)', {
    seriesBarDistance: 10,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value;
      }
    }
  }],
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 5,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
];

new Chartist.Bar('.ct-chart-1', dataChart, options, responsiveOptions);

// Pedidos pendente
var query = " SELECT * FROM materiais";
mysqlQuery(query,function(response){
  var data = JSON.parse(response);
  var htmlMaterial = "";
  data.forEach(function(el){
      htmlMaterial += ''+
      '<tr>' +
        '<td>' + el.nome + '</td>'+
        '<td>' + el.marca +'</td>'+
        '<td>' + el.quantidade +'</td>'+
        '<td>' + el.preco + '</td>'+
      '</tr>';
  });
  $(".table-pending tbody").html(htmlMaterial);

});

});
