angular.module('app').controller('pedidos_controller', [ '$routeParams', '$location', '$scope', '$rootScope',
    'safeApply',
    'PedidosService', 'DataService', 'DBContract',
    'GET_ALL_SOLICITANTES', 'GET_PEDIDOS_FOR_SOLICITANTE', 'GET_INSUMOS_FOR_PEDIDO', 'GET_MATERIAIS_FOR_PEDIDO',
    'ISSUE_EXTRA_INSURANCE',
    function ($routeParams, $location, $scope, $rootScope, safeApply,
              PedidosService, DataService, DBContract,
              GET_ALL_SOLICITANTES, GET_PEDIDOS_FOR_SOLICITANTE, GET_INSUMOS_FOR_PEDIDO, GET_MATERIAIS_FOR_PEDIDO,
              ISSUE_EXTRA_INSURANCE) {
        console.log('pedidos_controller')

        $scope.data = PedidosService.Data

        angular.element(document).ready(function () {
            if(/^\/inicial$/.test($location.path())) {
                console.log('reinit')
                PedidosService.reinit()
            }
            if(PedidosService.Data.solicitantes.length === 0) {
                DataService.send(GET_ALL_SOLICITANTES, DBContract.GET_ALL_SOLICITANTES())
            }
        })

        $scope.$on(GET_ALL_SOLICITANTES, function (type, tx_response) {
            // in case called while PedidosService.Data.solicitantes has data:
            var solicitantes = tx_response
                 .filter(function(sol) { return !_solicitantesHasId(sol.id) })

            // TODO - remove once project db handles source
            var dummies = $rootScope.dummy.solicitantes.filter(function (s) {
                // all new $rootScope.dummy.solicitantes
                return PedidosService.Data.solicitantes.reduce(function(p,c) { return c.id === s.id? false:p }, true)
            })

            PedidosService.Data.solicitantes = PedidosService.Data.solicitantes.concat(solicitantes, dummies)
            safeApply($scope)

            if(('id_sol' in $routeParams) && ('id_pedido' in $routeParams)) {
                $scope.check = true
                console.log('pedido specified in routeParams')
                $scope.select($routeParams.id_sol)
            }
        })

        function _solicitantesHasId(id) {
            return PedidosService.Data.solicitantes.reduce(function (p,c) { return c.id===id? c.id:p }, false)
        }

        $scope.$on(GET_PEDIDOS_FOR_SOLICITANTE, function (type, tx_response) {
            var id = NaN
            PedidosService.Data.shipping = tx_response.map(function (p) {
                DataService.send({event: GET_INSUMOS_FOR_PEDIDO, id_pedido: p.id},
                    DBContract.GET_INSUMOS_FOR_PEDIDO(p.id))
                DataService.send({event: GET_MATERIAIS_FOR_PEDIDO, id_pedido: p.id},
                    DBContract.GET_MATERIAIS_FOR_PEDIDO(p.id))

                p.solicitante = PedidosService.Data.client

                p.insumos = p.insumos? p.insumos: []
                p.materiais = p.materiais? p.materiais: []
                p.total = function () {
                        return p.insumos.reduce(_total,0) + p.materiais.reduce(_total,0)
                }

                // TODO - fix database to handle insurance, and remove this
                p.extra_insurance = $rootScope.dummy.insurance_issued.includes(p.id)

                id=p.solicitante.id

                return p
            }).concat($rootScope.dummy.pedidos.filter(function (p) { // add only those relevant to the solicitante
                return p.solicitante.id === id
            }))

            safeApply($scope)

        })

        function _total(p,c) {
            return p + ((c === undefined)? 0:c.quantidade * c.preco)
        }

        $scope.$on(GET_INSUMOS_FOR_PEDIDO, function (type, tx_response) {
            // there can be multiple per solicitante, pair up this response with that pedido
            PedidosService.Data.shipping = PedidosService.Data.shipping.map(function (pedido) {
                if(pedido.id === tx_response.event.id_pedido) {
                    pedido.insumos = pedido.insumos
                        .concat(
                            tx_response.tx_response.filter(
                                function (i) {
                                    if (i.id_pedido === tx_response.event.id_pedido) {
                                        i.material = (pedido.materiais
                                            .filter(function(m) {
                                                return m.id === i.id_material
                                            }))[0]
                                    }
                                    return i.id_pedido === tx_response.event.id_pedido
                                })
                        )
                }
                return pedido
            })
            safeApply($scope)
        })

        $scope.$on(GET_MATERIAIS_FOR_PEDIDO, function (type, tx_response) {
            PedidosService.Data.shipping = PedidosService.Data.shipping.map(function (pedido) {
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
                                        return i
                                    })
                                }
                                return m.id_pedido === tx_response.event.id_pedido
                            }))
                }
                return pedido
            })
            safeApply($scope)
        })

        $scope.$on(ISSUE_EXTRA_INSURANCE, function (type, tx_response) {
            PedidosService.Data.shipping = PedidosService.Data.shipping.map(function (p) {
                if (p.id === tx_response) { p.extra_insurance = true }
                return p
            })
            $rootScope.dummy.insurance_issued.push(tx_response) // TODO - fix database to handle insurance, and remove this
            safeApply($scope)
        })

        $scope.hasClient = function () {
            return ('id' in PedidosService.Data.client)
        }

        $scope.hasShipping = function () {
            return (PedidosService.Data.shipping.length > 0)
        }

        $scope.select = function (id) {
            var client = (PedidosService.Data.solicitantes.filter(function (s) { return s.id === id }))[0]
            if (client === undefined) return
            PedidosService.Data.client = client

            DataService.send(GET_PEDIDOS_FOR_SOLICITANTE, DBContract.GET_PEDIDOS_FOR_SOLICITANTE(id))
        }

        $scope.insure = function (id) {
            DataService.send(ISSUE_EXTRA_INSURANCE, DBContract.ISSUE_EXTRA_INSURANCE(id))
        }
    }
])