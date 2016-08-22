(function() {
    angular.module('app').service('DataService', ['$rootScope', 'DBContract','SQL_SERVER',
        'GET_ALL_SOLICITANTES', 'GET_ALL_MATERIAIS', 'GET_ALL_INSUMOS', 'GET_MATERIAL',
        'GET_PEDIDOS_FOR_SOLICITANTE', 'GET_MATERIAIS_FOR_PEDIDO', 'GET_INSUMOS_FOR_PEDIDO',
        'ISSUE_EXTRA_INSURANCE', 'GET_SOURCE_MATERIAIS', 'GET_SOURCE_INSUMOS',
        'POST_SOLICITANTE', 'POST_MATERIAL', 'POST_INSUMO', 'POST_PEDIDO',
        function ($rootScope, DBContract, SQL_SERVER,
                  GET_ALL_SOLICITANTES, GET_ALL_MATERIAIS, GET_ALL_INSUMOS, GET_MATERIAL, GET_PEDIDOS_FOR_SOLICITANTE,
                  GET_MATERIAIS_FOR_PEDIDO, GET_INSUMOS_FOR_PEDIDO,
                  ISSUE_EXTRA_INSURANCE, GET_SOURCE_MATERIAIS, GET_SOURCE_INSUMOS,
                  POST_SOLICITANTE, POST_MATERIAL, POST_INSUMO, POST_PEDIDO) {
            var svc = sql_service(SQL_SERVER)
            svc.isNoOp = DBContract.isNoOp // TODO - fix database to handle insurance, sources, and remove this

            svc.onMessage(function (event, message) {
                var tx_response
                try {
                    tx_response = JSON.parse(message)
                } catch (e) {
                    console.log('[DataService] onMessage - database error: ' + message)
                    //$.alert({ title: 'Erro de banco de dados', content: message })
                    return
                }

                //console.dir([event, tx_response])

                var e = event
                if (typeof event !== 'string') {
                    e = e.event
                }

                switch (e) {
                    case GET_SOURCE_MATERIAIS:
                    case GET_SOURCE_INSUMOS:
                    case ISSUE_EXTRA_INSURANCE:
                    case POST_SOLICITANTE:
                    case POST_MATERIAL:
                    case POST_INSUMO:
                    case POST_PEDIDO:
                        $rootScope.$broadcast(e, tx_response)
                        break
                    case GET_ALL_SOLICITANTES:
                    case GET_ALL_INSUMOS:
                    case GET_ALL_MATERIAIS:
                    case GET_PEDIDOS_FOR_SOLICITANTE:
                        (e === event)? $rootScope.$broadcast(e, tx_response):
                            $rootScope.$broadcast(e, {event: event, tx_response: tx_response})
                        break
                    case GET_MATERIAIS_FOR_PEDIDO:
                    case GET_INSUMOS_FOR_PEDIDO:
                    case GET_MATERIAL:
                        $rootScope.$broadcast(e, {event: event, tx_response: tx_response})
                        break
                }
            })

            return {
                send: function (command, query) {
                    svc.send(command, query)
                }
            }
        }
    ])

    var sql_service = function (uri) {
        return {
            uri: uri,
            isNoOp: function() { return false }, // TODO - fix database to handle insurance, sources, and remove this
            message_handler: function () {},
            send: function (event, sql) {
                // TODO - fix database to handle insurance, sources, and remove this
                if(this.isNoOp(event)) {
                    console.log('[DataService] - forging request for service ' + event);
                    var my = this
                    setTimeout(function () { my.message_handler(event, sql) }, Math.random() * 3000 )
                    return
                }

                console.log('[DataService] sql_service object - sending sql: ' + sql + ' to ' + this.uri)
                var self = this
                mysqlQuery(sql, this.uri, function (){ self.receive(event, arguments[0]) })
            },
            receive: function(event, tx_response) {
                this.message_handler(event, tx_response)
            },
            onMessage: function(fun) {
                this.message_handler = fun
            }
        }
    }
})()
