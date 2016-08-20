angular.module('app').controller('pedidos_controller', [ '$scope', '$rootScope', 'safeApply',
    'DataService', 'DBContract',
    'GET_ALL_SOLICITANTES', 'GET_PEDIDOS_FOR_SOLICITANTE', 'GET_INSUMOS_FOR_PEDIDO', 'GET_MATERIAIS_FOR_PEDIDO',
    function ($scope, $rootScope, safeApply,
              DataService, DBContract,
              GET_ALL_SOLICITANTES, GET_PEDIDOS_FOR_SOLICITANTE, GET_INSUMOS_FOR_PEDIDO, GET_MATERIAIS_FOR_PEDIDO) {

        $scope.solicitantes = []

        angular.element(document).ready(function () {
            DataService.send(GET_ALL_SOLICITANTES, DBContract.GET_ALL_SOLICITANTES())
        })

        $scope.$on(GET_ALL_SOLICITANTES, function (type, tx_response) {
            solicitantes = tx_response.filter(function(sol) { return !_solicitantesHasId(sol.id) })
            $scope.solicitantes = $scope.solicitantes.concat(solicitantes)
            safeApply($scope)
        })

        $scope.$on(GET_PEDIDOS_FOR_SOLICITANTE, function (type, tx_response) {
            $rootScope.shipping = tx_response.map(function (p) {
                DataService.send({event: GET_INSUMOS_FOR_PEDIDO, id_pedido: p.id},
                    DBContract.GET_INSUMOS_FOR_PEDIDO(p.id))
                DataService.send({event: GET_MATERIAIS_FOR_PEDIDO, id_pedido: p.id},
                    DBContract.GET_MATERIAIS_FOR_PEDIDO(p.id))

                p.solicitante = $rootScope.client
                p.insumos = []
                p.materiais = []
                p.total = function () {
                        return p.insumos.reduce(_total,0) + p.materiais.reduce(_total,0)
                }
                return p
            })
            safeApply($scope)
        })

        function _total(p,c) {
            return p + c.quantidade * c.preco
        }

        $scope.$on(GET_INSUMOS_FOR_PEDIDO, function (type, tx_response) {
            $rootScope.shipping = $rootScope.shipping.map(function (pedido) {
                if(pedido.id === tx_response.event.id_pedido) {
                    pedido.insumos = pedido.insumos.concat(
                        tx_response.tx_response.filter(
                            function (i) {
                                if (i.id_pedido === tx_response.event.id_pedido) {
                                    i.material = (pedido.materiais.filter(function(m) {
                                        return m.id === i.id_material
                                    }))[0]
                                }
                                return i.id_pedido === tx_response.event.id_pedido
                            }))
                }
                return pedido
            })
            safeApply($scope)
        })

        $scope.$on(GET_MATERIAIS_FOR_PEDIDO, function (type, tx_response) {
            $rootScope.shipping = $rootScope.shipping.map(function (pedido) {
                if(pedido.id === tx_response.event.id_pedido) { // to the pedido requested ...
                    pedido.materiais = pedido.materiais.concat( // add its material
                        tx_response.tx_response.filter(
                            function (m) {
                                /* reusing the filter here to attach materials to insumos */
                                if (m.id_pedido === tx_response.event.id_pedido) {
                                    pedido.insumos = pedido.insumos.map(function(i) {
                                        if(i.id_material === m.id) {
                                            i.material = m
                                        }
                                    })
                                }
                                return m.id_pedido === tx_response.event.id_pedido
                            }))
                }
                return pedido
            })
            safeApply($scope)
        })

        function _solicitantesHasId(id) {
            $scope.solicitantes.reduce(function (p,c) { return c===id? c.id:p }, false)
        }

        $scope.hasClient = function () {
            return ('id' in $rootScope.client)
        }

        $scope.hasShipping = function () {
            return ($rootScope.shipping.length > 0)
        }

        $scope.select = function (id) {
            $rootScope.client = ($scope.solicitantes.filter(function (s) { return s.id === id }))[0]

            DataService.send(GET_PEDIDOS_FOR_SOLICITANTE, DBContract.GET_PEDIDOS_FOR_SOLICITANTE(id))
        }
    }
])