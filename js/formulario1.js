var objPedido;
var objPedidos;
var objMaterial;
var objMateriais;
var id_material;
  var totalMaterial;
  var totalInsumo;
var objInsumos;
var objInsumo;
var dadosDaEntrega;

$("#pedidos").change(function() {
    objPedido.id = $(this).val();

});
//var sql_query = 'SELECT * FROM pedidos ORDER BY id ASC;';


/*Carrega os pedidos*/
$(document).ready(function() {
    var mysql_query = "SELECT * FROM pedidos";
    carrregaFormPedidos(mysql_query);


});

function carrregaFormPedidos(mysql_query) {
    mysqlQuery(mysql_query, function(result) {
        // mostra o resultado da query
        objPedidos = JSON.parse(result);
          objPedido = objPedidos[0];
        objPedidos.forEach(function(el) {
            //console.log(el.id);
            $("#pedidos").append('<option value="' + el.id + '">Pedido: ' + el.id + '</option>');
        });
    });

}

/*****************/
/*Carrega os meteriais*/
$('.btn-dadosDoPedido').click(function() {
    $("#materiais").empty();
    var id_pedido = $("#pedidos").val();

    var mysql_query = 'SELECT * FROM materiais where id_pedido=' + id_pedido + ';';
    carrregaFormMeteriais(mysql_query);
});

function carrregaFormMeteriais(mysql_query) {
    var id;
    mysqlQuery(mysql_query, function(result) {
        // mostra o resultado da query
        objMateriais = JSON.parse(result);

        objMaterial = objMateriais[0];
        //console.log(objMaterial);
        objMateriais.forEach(function(el) {
            //console.log(el.id);
            $("#materiais").append('<option value="' + el.id + '">' + el.nome + ' da ' + el.marca + '</option>');
        });
        id = objMaterial.id;
        mudaValoresFormMaterial(id);
    });


}

$("#materiais").change(function() {
    id_material = $(this).val();
    mudaValoresFormMaterial(id_material);

});

function mudaValoresFormMaterial(id) {
    //altera os valores do inputs de acordo com o material selecionado
    $("#precoMaterial").val(objMaterial.preco);
    $("#qtdMaterial").val(objMaterial.quantidade);
  totalMaterial = objMaterial.preco * objMaterial.quantidade;
    $("#totalMaterial").val(totalMaterial);


}

/***********/
/*Carrega os insumos*/

$(".btn-dadosDoMaterial").click(function(){

  $("#insumos").empty();
  console.log(objMaterial);
  var id_pedido = $("#pedidos").val();

  var id_material=  objMaterial.id;
   //alert(id_material);
  var mysql_query = 'SELECT * FROM insumos where id_pedido=' + id_pedido + ' and id_material='+id_material+';';
  carrregaFormInsumos(mysql_query);
});

function carrregaFormInsumos(mysql_query) {

    var id;
    mysqlQuery(mysql_query, function(result) {
        // mostra o resultado da query
        objInsumos = JSON.parse(result);
        //console.log(objMaterial);
        objInsumo = objInsumos[0];
        console.log(objInsumo.id);
        objInsumos.forEach(function(el) {
            //console.log(el.id);
            $("#insumos").append('<option value="' + el.id + '">Insumo numero  ' + el.id+ '</option>');
        });
        id = objInsumo.id;
        mudaValoresFormInsumo(id);
    });
}

function mudaValoresFormInsumo(id) {
    //altera os valores do inputs de acordo com o material selecionado
    console.log(objInsumo.id);
    objInsumos.forEach(function(el){
      if(el.id==id){

        console.log("objeto selecionado");
        console.log(el);
        $("#descricao").val(el.descricao);
        $("#precoInsumo").val(el.preco);
        $("#quantidadeInsumo").val(el.quantidade);
        totalInsumo = el.preco * el.quantidade;
        $("#totalInsumo").val(totalInsumo);

      }
    })


}

$("#insumos").change(function() {
    id_insumo = $(this).val();

    mudaValoresFormInsumo(id_insumo);

});


/*****************/
/*Carrega os dados do solicitante*/
$(".btn-dadosDoSolicitante").click(function(){

  var id = objPedido.id_solicitante;
  console.log(id);
  var mysql_query = 'SELECT * FROM solicitantes where id=' + id +';';
  carrregaFormDadosDoSolicitante(mysql_query);
});
function carrregaFormDadosDoSolicitante(mysql_query) {


    mysqlQuery(mysql_query, function(result) {
        // mostra o resultado da query
        objSolicitante = JSON.parse(result);
        //console.log(objMaterial);

        console.log(objSolicitante);
        $("#nome").val(objSolicitante[0].nome);
        $("#telefone").val(objSolicitante[0].telefone);
        $("#cpf").val(objSolicitante[0].cpf);

        //usar web service
        //https://viacep.com.br/ws/01001000/json/
        var xmlhttp = new XMLHttpRequest();
        var url = 'https://viacep.com.br/ws/'+objSolicitante[0].cep+'/json/';
        console.log(url);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var dados = JSON.parse(xmlhttp.responseText);
              console.log(dados);
                $("#endereco").val(dados.logradouro);
                $("#cidade").val(dados.localidade);
                $("#estado").val(dados.uf);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

    });
}


/**Dados da Entrega**/
$(".btn-dadosDaEntrega").click(function(){
  $("#total").val(totalMaterial+totalInsumo);
})


$("#cepEntrega").change(function(){
var cep=$(this).val();

          //usar web service
          //https://viacep.com.br/ws/01001000/json/
          var xmlhttp = new XMLHttpRequest();
          var url = 'https://viacep.com.br/ws/'+cep+'/json/';
          console.log(url);
          xmlhttp.onreadystatechange = function() {
              if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                  var dados = JSON.parse(xmlhttp.responseText);
                console.log(dados);
                  $("#enderecoEntrega").val(dados.logradouro);
                  $("#cidadeEntrega").val(dados.localidade);
                  $("#estadoEntrega").val(dados.uf);
              }
          };
          xmlhttp.open("GET", url, true);
          xmlhttp.send();

});
