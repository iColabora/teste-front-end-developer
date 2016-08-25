/*
    CONEXÃO COM O BANCO DE DADOS NÃO PÔDE SER ESTABELECIDA
    PORTANTO, PARA QUE O DASHBOARD NÃO FICASSE EM BRANCO
    PREENCHI COM DADOS FICTÍCIOS.
    SOBRE CADA FUNÇÃO, ESTÁ A QUERY QUE SERIA UTILIZADA PARA
    UTILIZAR OS DADOS
    - DASHBOARD 1
        MOSTRAR 31 DIAS, E UMA LINHA GRÁFICA PARA CADA MÊS.
        SENDO ASSIM, É POSSÍVEL COMPARAR DE UM MODO DINÂMICO
        O MÊS E O DIA QUE MAIS TEVE PEDIDOS SOLICITADOS. PODERIA
        APROFUNDAR UM POUCO MAIS O DASHBOARD E MOSTRAR DENTRO DOS DIAS
        QUAIS FORAM OS PRODUTOS (MATERIAIS OU INSUMOS) MAIS COMPRADOS.
    - DASHBOARD 2
        MOSTRAR O TOP 10 DE SOLICITANTES. O PROPÓSTIO É FAZER
        UM LEVANTAMENTO DOS SOLICITANTES QUE MAIS COMPRAM. PODERIA
        TER MAIS ALGUMAS ABORDAGENS, COMO POR EXEMPLO OS CLIENTES
        QUE NUNCA COMPRARAM NADA, MOSTRAR EM UM GRÁFICO DE PIZZA
        EM PERCENTUAIS OS QUE MAIS COMPRAM, E AINDA IR A FUNDO
        E SABER O QUE MAIS A PESSOA COMPROU ATRAVÉS DE UM MATERIAL
        OU INSUMO. É POSSÍVEL FAZER VÁRIAS ABORDAGENS E APROFUNDÁ-LAS
        PARA DEMONSTRAR EM UM DASHBOARD.
    - DASHBOARD 3
        PEDIDOS PENDENTES, OU SEJA, PEDIDOS QUE FORAM FEITOS
        'HOJE' OU ATÉ 1 DIA ATRÁS, POIS ENTENDE-SE QUE PEDIDOS
        FEITOS 'HOJE' OU ATE 1 DIA ATRÁS AINDA POSSA ESTAR
        COMO PENDENTE EM UM SISTEMA, CONSIDERANDO POSTAGEM E
        RECEBIMENTO DE PAGAMENTO COMPENSADO (NO CASO DE BOLETOS, 
        EM MEDIA 48H).
        POR CAUSA DO CAMPO data_de_compra ESTAR COMO VARCHAR
        NÃO CONSEGUI EXECUTAR O DATEADD().
*/

//DASHBOARD 1

/*  SQL QUERY
    SELECT MONTH(data_de_compra), COUNT(Id) FROM PEDIDOS 
    GROUP BY (MONTH(data_de_compra)) */

    

$(function() {
   
    var i;
    var junho = new Array();
    var julho = new Array();
    var agosto = new Array();
  
    for (i = 1 ; i <= 30; i++)
      {
         junho.push(Math.floor((Math.random() * 10) + 1));
      }
  
    for (i = 1 ; i <= 31; i++)
      {
         julho.push(Math.floor((Math.random() * 10) + 1));
      }
  
     for (i = 1 ; i <= 11; i++)
      {
         agosto.push(Math.floor((Math.random() * 10) + 1));
      }
  
    var resultadoDashboard = [
      
        {"name": "Junho", "data": junho},
        {"name": "Julho", "data": julho},
        {"name": "Agosto", "data": agosto}
      
    ]

$('#pedido_dia').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: 'PEDIDOS / DIA'
        },
        subtitle: {
            text: 'Visualização trimestral'
        },
        xAxis: {
            categories: ['1',
                         '2',
                         '3',
                         '4',
                         '5',
                         '6',
                         '7',
                         '8',
                         '9',
                         '10',
                         '11',
                         '12',
                         '13',
                         '14',
                         '15',
                         '16',
                         '17',
                         '18',
                         '19',
                         '20',
                         '21',
                         '22',
                         '23',
                         '24',
                         '25',
                         '26',
                         '27',
                         '28',
                         '29',
                         '30',
                         '31']
        },
        yAxis: {
            title: {
                text: 'Qtde. de pedidos'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: resultadoDashboard
    });
});


//DASHBOARD 2

/* 
    SQL QUERY
    SELECT TOP10 COUNT(pedidos.id), nome FROM pedidos
    INNER JOIN solicitantes
        WHERE pedidos.id_solicitante = solicitantes.id; */



$(function() {
	$('#pedido_solicitante').highcharts({
            chart: {
            type: 'column'
        },
        title: {
            text: 'PEDIDOS / SOLICITANTE'
        },
        subtitle: {
            text: 'Top 10'
        },
      
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Qtde. de Pedidos'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '{point.y} pedidos feitos'
        },
        series: [{
            name: 'Solicitantes',
            data: [
                ['Maurício', 75],
                ['Olavo', 54],
                ['Bruna', 40],
                ['Felipe', 32],
                ['Gabriel', 22],
                ['Ana Paula', 18],
                ['Nestor', 17],
                ['Amanda', 14],
                ['Paula',10],
            ],
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
});




/* DASHBOARD 3 */

/*SELECT id, data_de_compra FROM PEDIDOS 
    WHERE data_de_compra = CURDATE(); */