$(function(){var data={labels:["Mon","Tue","Wed","Thu","Fri"],series:[[5,2,4,2,0]]};new Chartist.Line(".ct-chart",data);var dataChart={labels:["Jan","Feb","Mar","Apr","Mai","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],series:[[5,4,3,7,5,10,3,4,8,10,6,8],[3,2,9,5,4,6,4,6,7,8,7,4]]},options={seriesBarDistance:15},responsiveOptions=[["screen and (min-width: 641px) and (max-width: 1024px)",{seriesBarDistance:10,axisX:{labelInterpolationFnc:function(value){return value}}}],["screen and (max-width: 640px)",{seriesBarDistance:5,axisX:{labelInterpolationFnc:function(value){return value[0]}}}]];new Chartist.Bar(".ct-chart-1",dataChart,options,responsiveOptions);var query=" SELECT * FROM materiais";mysqlQuery(query,function(response){var data=JSON.parse(response),htmlMaterial="";data.forEach(function(el){htmlMaterial+="<tr><td>"+el.nome+"</td><td>"+el.marca+"</td><td>"+el.quantidade+"</td><td>"+el.preco+"</td></tr>"}),$(".table-pending tbody").html(htmlMaterial)})});