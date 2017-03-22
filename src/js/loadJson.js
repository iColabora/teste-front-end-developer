$(document).ready(function(){
  $.getJSON( "../json/pedido.json", function( jsonPedido ) {
    $.each(jsonPedido.data, function(key, value){
      $("#numeroPedido").append("<option>" + value.id +"</option>");
      });
    });
    $("#numeroPedido").on('change',function(){
      var select = this.value;
      $.getJSON( "../json/material.json", function( jsonMaterial ) {
        $.each(jsonMaterial.data, function(key,value){
          if(select == value.id){
            $("#materialSelect").val(value.name);
            $("#marcaSelect").val(value.marca);
            $("#quantidadeMaterial").val(value.quantidade);
            $("#dataCompra").val(value.dataCompra);
          }
        });
      });

      $.getJSON( "../json/solicitante.json", function( jsonSolicitante ) {
        console.log(jsonSolicitante.data);
        $.each(jsonSolicitante.data, function(key,value){
          if(select == value.id){
            $("#nomeSolicitante").val(value.solicitante);
            $("#telSolicitante").val(value.telefone);
            $("#cpfSolicitante").val(value.cpf);
            $("#cepSolicitante").val(value.cep);
            $("#numeroCasa").val(value.numero)
          }
        });
      });
   });
});
