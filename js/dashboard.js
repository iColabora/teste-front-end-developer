$(document).ready(function () {

    chartPedidosMes();
    chartPedidosSolic();
    buscaPedidosPendentes();

    $('#refreshChart1').click(function () {
        chartPedidosMes();
    });
    $('#refreshChart2').click(function () {
        chartPedidosSolic();
    });
    $('#refreshTable').click(function () {
        buscaPedidosPendentes();
    });

});

function chartPedidosMes() {
    var mysql_query = "SELECT\n\
                            COUNT(id) AS qnt, \n\
                            SUBSTRING(CAST(data_de_compra AS DATE), 1, 10) AS data_pedidos \n\
                       FROM\n\
                            pedidos \n\
                       GROUP BY \n\
                            data_de_compra";

    mysqlQuery(mysql_query, function (result) {
        var obj = JSON.parse(result);
        var arrayObjs = new Array();
        for (var i in obj) {
            var nObj = {
                "category": obj[i].data_pedidos,
                "column-1": obj[i].qnt,
                "color": "#41bd9d",
                "lineColorField": "#41bd9d"
            }
            arrayObjs.push(nObj);
        }
        AmCharts.makeChart("chartdiv1",
                {
                    "type": "serial",
                    "categoryField": "category",
                    "dataDateFormat": "YYYY-MM-DD",
                    "startDuration": 1,
                    "theme": "light",
                    "categoryAxis": {
                        "gridPosition": "start",
                        "parseDates": true
                    },
                    "chartCursor": {
                        "enabled": true
                    },
                    "chartScrollbar": {
                        "enabled": true
                    },
                    "trendLines": [],
                    "graphs": [
                        {
                            "balloonText": "<strong>[[category]]</strong><br>Total de pedidos: [[value]]",
                            "fillAlphas": 1,
                            "id": "AmGraph-1",
                            "title": "graph 1",
                            "type": "column",
                            "valueField": "column-1",
                            "colorField": "color",
                            "lineColorField": "lineColorField"
                        }
                    ],
                    "guides": [],
                    "valueAxes": [
                        {
                            "id": "ValueAxis-1",
                            "title": "Total de pedidos",
                            "integersOnly": true
                        }
                    ],
                    "titles": [
                        {
                            "id": "Title-1",
                            "size": 15,
                            "text": "Total de pedidos por período mensal"
                        }
                    ],
                    "dataProvider": arrayObjs
                }
        );
    });
}



function chartPedidosSolic() {
    var mysql_query = "SELECT    \n\
                        s.nome, \n\
                        COUNT(p.id) AS qnt\n\
                       FROM    \n\
                        pedidos p\n\
                       INNER JOIN    \n\
                        solicitantes s\n\
                         ON s.id = p.id_solicitante\n\
                       GROUP BY(p.id)";

    mysqlQuery(mysql_query, function (result) {
        var obj = JSON.parse(result);
        var arrayObjs = new Array();
        for (var i in obj) {
            var nObj = {
                "category": obj[i].nome,
                "column-1": obj[i].qnt,
                "color": "#41bd9d",
                "lineColorField": "#41bd9d"
            }
            arrayObjs.push(nObj);
        }
        AmCharts.makeChart("chartdiv2",
                {
                    "type": "serial",
                    "categoryField": "category",
                    "startDuration": 1,
                    "theme": "light",
                    "categoryAxis": {
                        "gridPosition": "start",
                        "labelRotation": 33
                    },
                    "graphs": [
                        {
                            "balloonText": "[[category]]:[[value]] pedidos feitos",
                            "fillAlphas": 1,
                            "id": "AmGraph-1",
                            "title": "graph 1",
                            "type": "column",
                            "valueField": "column-1",
                            "colorField": "color",
                            "lineColorField": "lineColorField"
                        }
                    ],
                    "guides": [],
                    "valueAxes": [
                        {
                            "id": "ValueAxis-1",
                            "title": "Total de pedidos",
                            "integersOnly": true
                        }
                    ],
                    "titles": [
                        {
                            "id": "Title-1",
                            "size": 15,
                            "text": "Total de pedidos por solicitante"
                        }
                    ],
                    "dataProvider": arrayObjs
                }
        );
    });
}

function buscaPedidosPendentes() {
    var mysql_query = "SELECT\n\
                        p.id, p.data_de_compra, s.nome \n\
                       FROM pedidos p\n\
                        INNER JOIN solicitantes s\n\
                        ON s.id = p.id_solicitante";
    mysqlQuery(mysql_query, function (result) {
        $('#tBodyPedidos').html('');
        var obj = JSON.parse(result);
        for (var i in obj) {
            var tr = "<tr><td class='text-center'>" + obj[i].id + "</td><td>" + obj[i].nome + "</td><td>" + obj[i].data_de_compra + "</td></tr>";
            $('#tBodyPedidos').append(tr);
        }

    });
}