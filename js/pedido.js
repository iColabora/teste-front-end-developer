$(document).ready(function () {
    // preenche os campos relacionados a tabela pedidos
    $("#btnBuscar").click(function (mostrarPedido) {
        mostrarPedido.preventDefault();

        var valorInput = $("#inputCodPed").val();
        var mysql_query = "SELECT * FROM pedidos where id = " + valorInput;
        mysqlQuery(mysql_query, function (resultPedido) {

            var obj = JSON.parse(resultPedido);
            $("#codPedido").val(obj[0].id);
            $("#dataCompra").val(obj[0].data_de_compra);

        });
    });
    // preenche os campos relacionados a tabela material
    $("#btnBuscar").click(function (mostrarMaterial) {
        mostrarMaterial.preventDefault();

        var valorInput = $("#inputCodPed").val();
        var mysql_query = "SELECT * FROM materiais where id_pedido = " + valorInput;
        mysqlQuery(mysql_query, function (resultMaterial) {

            var obj = JSON.parse(resultMaterial);
            $("#material").val(obj[0].nome);
            $("#marcaMaterial").val(obj[0].marca);
            $("#qtddMaterial").val(obj[0].quantidade);

        });
    });
    // preenche os campos relacionados a tabela insumos
    $("#btnBuscar").click(function (mostrarInsumo) {
        mostrarInsumo.preventDefault();

        var valorInput = $("#inputCodPed").val();
        var mysql_query = "SELECT * FROM insumos where id_pedido = " + valorInput;
        mysqlQuery(mysql_query, function (resultInsumo) {

            var obj = JSON.parse(resultInsumo);
            $("#insumo").val(obj[0].descricao);
            $("#qtddInsumo").val(obj[0].quantidade);
            $("#precoInsumo").val(obj[0].preco);

        });
    });
    // preenche os campos relacionados a tabela solicitantes
    $("#btnBuscar").click(function (mostrarSolicitantes) {
        mostrarSolicitantes.preventDefault();

        var valorInput = $("#inputCodPed").val();
        var mysql_query = "SELECT * FROM solicitantes s LEFT JOIN pedidos p on s.id = p.id_solicitante where p.id = " + valorInput;
        mysqlQuery(mysql_query, function (resultSolicitantes) {

            var obj = JSON.parse(resultSolicitantes);
            $("#nomeCompleto").val(obj[0].nome);
            $("#telefone").val(obj[0].telefone);
            $("#cpf").val(obj[0].cpf);
            $("#cepPedido").val(obj[0].cep);
            $("#enderecoPedido").val(obj[0].rua);
            $("#bairroPedido").val(obj[0].bairro);
            $("#cidadePedido").val(obj[0].cidade);
            $("#estadoPedido").val(obj[0].estado);
        });
    });
});
