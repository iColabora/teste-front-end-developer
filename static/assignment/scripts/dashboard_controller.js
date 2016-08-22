angular.module('app').controller('dashboard_controller', ['$rootScope', '$scope', 'DataService', 'DBContract',
    'GET_ALL_SOLICITANTES', 'GET_PEDIDOS_FOR_SOLICITANTE',
    function ($rootScope, $scope, DataService, DBContract,
              GET_ALL_SOLICITANTES, GET_PEDIDOS_FOR_SOLICITANTE) {
        console.log('dashboard_controller')

        /* ppp graph */

        $scope.ppp_graph = { x: [], pending: [], completed: []}
        $scope.pending_table = []

        DataService.send(GET_ALL_SOLICITANTES, GET_ALL_SOLICITANTES)
        $scope.$on(GET_ALL_SOLICITANTES, function(type, tx_response) {
            $scope.solicitantes = tx_response
            tx_response.forEach(function (x) {
                DataService.send({event: GET_PEDIDOS_FOR_SOLICITANTE, id_sol: x.id},
                    DBContract.GET_PEDIDOS_FOR_SOLICITANTE(x.id))
                $scope.ppp_graph.x[x.id] = x.nome
                $scope.ppp_graph.pending[x.id]=0
                $scope.ppp_graph.completed[x.id]=0
                $scope.pending_table[x.id] = [x.nome,0]
            })

            wait_on_plotly('ppp_graph',data.ppp_graph, layout.ppp_graph)
        })

        $scope.$on(GET_PEDIDOS_FOR_SOLICITANTE, function (type, tx_response) {
            tx_response.tx_response.forEach(function (x) {
                if($rootScope.dummy.insurance_issued.includes(x.id)){
                    $scope.ppp_graph.completed[tx_response.event.id_sol]++
                } else {
                    $scope.pending_table[tx_response.event.id_sol][1]++
                    $scope.ppp_graph.pending[tx_response.event.id_sol]++
                }
            })
            wait_on_plotly('ppp_graph',data.ppp_graph, layout.ppp_graph)
        })

        function wait_on_plotly(ele,idata,ilayout) {
            if(typeof Plotly !== undefined) {
                Plotly.newPlot(ele,idata, ilayout)
            } else {
                $timeout(function () { wait_on_plotly(ele,idata, ilayout) }, 150)
            }
        }

        var data = {}
        data.ppp_graph = [
            {
                name: 'pendente',
                x: $scope.ppp_graph.x,
                y: $scope.ppp_graph.pending,
                type: 'bar',
                orientation: 'v'
            },
            {
                name: 'total',
                x: $scope.ppp_graph.x,
                y: $scope.ppp_graph.completed,
                type: 'bar',
                orientation: 'v'
            }
        ]

        var layout = {}
        layout.ppp_graph = { barmode: 'stack' }



        angular.element(document).ready(function () {
            wait_on_plotly('ppp_graph', data.ppp_graph, layout.ppp_graph )
        })
    }
])