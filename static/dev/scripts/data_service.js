(function() {
    angular.module('app').service('DataService', ['$rootScope',
        'SQL_SERVER', 'GET_ALL_SOLICITANTES', 'GET_ALL_MATERIAIS', 'GET_ALL_INSUMOS', 'GET_MATERIAL',
        function ($rootScope, SQL_SERVER, GET_ALL_SOLICITANTES, GET_ALL_MATERIAIS, GET_ALL_INSUMOS, GET_MATERIAL) {
            var svc = sql_service(SQL_SERVER)

            svc.onMessage(function (event, message) {
                var tx_response
                try {
                    tx_response = JSON.parse(message)
                } catch (e) {
                    console.log('[DataService] onMessage - database error: ' + message)
                    //$.alert({ title: 'Erro de banco de dados', content: message })
                    return
                }

                //console.dir(tx_response)

                var e = event
                if (typeof event !== 'string') {
                    e = e.event
                }

                switch (e) {
                    case GET_ALL_SOLICITANTES:
                    case GET_ALL_INSUMOS:
                        $rootScope.$broadcast(e, tx_response)
                        break
                    case GET_ALL_MATERIAIS:
                        (e === event)? $rootScope.$broadcast(e, tx_response):
                            $rootScope.$broadcast(e, {event: event, tx_response: tx_response})
                        break
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
            message_handler: function () {},
            send: function (event, sql) {
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
