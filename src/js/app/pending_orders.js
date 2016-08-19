var query = "SELECT p.*, s.nome AS solicitante FROM pedidos p JOIN solicitantes s ON s.id = p.id_solicitante ORDER BY p.data_de_compra DESC";

mysqlQuery(query, function (result) {
    var orders = JSON.parse(result);
    fillTable(orders);
});

function fillTable(orders) {
    var $table = $("#orders-rows");

    $.each(orders, function (index, value) {
        var tds = "";

        tds += createElement('td', value['id']);
        tds += createElement('td', value['solicitante']);
        tds += createElement('td', value['cep']);
        tds += createElement('td', value['rua']);
        tds += createElement('td', value['numero']);
        tds += createElement('td', value['bairro']);
        tds += createElement('td', value['cidade']);
        tds += createElement('td', value['estado']);
        tds += createElement('td', value['pais']);
        tds += createElement('td', value['data_de_compra']);

        var tableRow = createElement('tr', tds);
        $table.append(tableRow);
    });
}