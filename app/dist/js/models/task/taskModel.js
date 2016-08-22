define(["backbone","models/baseModel"],function(e,t){var n=t.extend({data:"",label:"Número de Pedidos",addPedido:function(e){var t=localstorage.get("pedidos");t==undefined&&(localstorage.set("pedidos",new Array),t=localstorage.get("pedidos")),t.push(e),localstorage.set("pedidos",t),new PNotify({title:"Feito",text:"Pedido adicionado com éxito; pedido número "+e.idPedido,type:"sucess",hide:!0,buttons:{closer:!0,sticker:!0},icon:"fa fa-exclamation-circle"}),router.navigate("dashboard",{trigger:!0})},graficoPedidosSolicitantes:function(){var e="SELECT s.nome as nome, count(*) as quantidade FROM pedidos p  INNER JOIN solicitantes s ON p.id_solicitante = s.id GROUP BY p.id_solicitante",t=this,n=new Array,r=new Array;mysqlQuery(e,function(e){var i=JSON.parse(e);i.forEach(function(e){n.push(e.nome),r.push(e.quantidade)});var s=localstorage.get("pedidos")||new Array;for(var o=0;o<s.length;o++){n.push(s[o].nome_solicitante);var u=0;for(var a=0;a<s.length;a++)s[a].nome_solicitante==s[o].nome_solicitante&&u++;r.push(u)}var f=$("#chart2");Chart.defaults.global.responsive=!0,new Chart(f,{type:"line",data:{labels:n,datasets:[{label:t.label,data:r}]}})})},selectTodosPedidos:function(){var e="SELECT * FROM pedidos",t=this;mysqlQuery(e,function(e){var t=JSON.parse(e);$("table.pedidos-pendentes tbody").empty(),t.forEach(function(e){$("table.pedidos-pendentes tbody").append("<tr><td>"+e.id+"</td>"+"<td>"+e.data_de_compra.slice(0,10).replace(/(\d{4})\-(\d{2})\-(\d{2})/,"$3/$2/$1")+"</td>"+"<td>"+e.rua+" "+e.numero+", Bairro "+e.bairro+". Cidade: "+e.cidade+" - "+e.estado+"</td>"+"</tr>")});var n=localstorage.get("pedidos")||new Array;for(var r=0;r<n.length;r++)$("table.pedidos-pendentes tbody").append("<tr><td>"+n[r].idPedido+"</td>"+"<td>"+n[r].data_compra+"</td>"+"<td>"+n[r].end_entrega+" "+n[r].no_end_entrega+", Bairro "+n[r].bairro_entrega+". Cidade: "+n[r].cidade_entrega+" - "+n[r].estado_entrega+"</td>"+"</tr>")})},graficoPedidosDia:function(){var e="SELECT data_de_compra as data, count(*) as quantidade FROM pedidos GROUP BY data_de_compra",t=this,n=new Array,r=new Array;mysqlQuery(e,function(e){var i=JSON.parse(e);i.forEach(function(e){var t=e.data.slice(0,10).replace(/(\d{4})\-(\d{2})\-(\d{2})/,"$3/$2/$1");n.push(t),r.push(e.quantidade)});var s=localstorage.get("pedidos")||new Array;for(var o=0;o<s.length;o++){n.push(s[o].data_compra);var u=0;for(var a=0;a<s.length;a++)s[a].data_compra==s[o].data_compra&&u++;r.push(u)}var f=$("#chart1");Chart.defaults.global.responsive=!0,new Chart(f,{type:"line",data:{labels:n,datasets:[{label:t.label,data:r}]}}),PNotify.removeAll(),$("body").addClass("window-disable")})},buscaPedido:function(e){var t="SELECT * FROM pedidos WHERE id="+e,n=this;mysqlQuery(t,function(t){var n=JSON.parse(t);if(n.length==0){var r=localstorage.get("pedidos")||new Array,i=!1;if(r.length>0)for(var s=0;s<=r.length;s++){var o=r[s];s==r.length&&!i?$(".modal-body .info").text("Não existe o pedido "+e):s!=r.length&&o.idPedido==e&&(i=!0,$(".modal-body .info").empty().html("<strong>Data do pedido:</strong> "+o.data_compra+"<br>"+"<strong>Destino: </strong>"+o.end_entrega+" "+o.no_end_entrega+", Bairro "+o.bairro_entrega+". Cidade: "+o.cidade_entrega+" - "+o.estado_entrega))}else $(".modal-body .info").text("Não existe o pedido "+e)}else $(".modal-body .info").empty().html("<strong>Data do pedido:</strong> "+n[0].data_de_compra.slice(0,10).replace(/(\d{4})\-(\d{2})\-(\d{2})/,"$3/$2/$1")+"<br>"+"<strong>Destino: </strong>"+n[0].rua+" "+n[0].numero+", Bairro "+n[0].bairro+". Cidade: "+n[0].cidade+" - "+n[0].estado);$(".pedido").val(""),PNotify.removeAll(),$("body").addClass("window-disable")})},parse:function(e){return e.result}});return n});