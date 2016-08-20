angular.module('app')
    .constant('SQL_SERVER', 'http://192.241.152.185/')
    .constant('GET_ALL_SOLICITANTES', 'SELECT * FROM solicitantes ORDER BY nome ASC')
    .constant('GET_ALL_INSUMOS', 'SELECT * FROM insumos ORDER BY id_material ASC')
    .constant('GET_ALL_MATERIAIS', 'SELECT * FROM materiais ORDER BY marca ASC, nome ASC')
    .constant('GET_MATERIAL', 'GET_MATERIAL')
    .constant('GET_PEDIDOS_FOR_SOLICITANTE', 'GET_PEDIDOS_FOR_SOLICITANTE')
    .constant('GET_SOLICITANTES_FOR_PEDIDO', 'GET_SOLICITANTES_FOR_PEDIDO')
    .constant('GET_INSUMOS_FOR_PEDIDO', 'GET_INSUMOS_FOR_PEDIDO')
    .constant('GET_MATERIAIS_FOR_PEDIDO', 'GET_MATERIAIS_FOR_PEDIDO')
    .factory('DBContract', ['GET_ALL_SOLICITANTES', 'GET_ALL_INSUMOS', 'GET_ALL_MATERIAIS',
        function(GET_ALL_SOLICITANTES, GET_ALL_INSUMOS, GET_ALL_MATERIAIS) {
            return {
                GET_ALL_SOLICITANTES: function () { return GET_ALL_SOLICITANTES },
                GET_ALL_INSUMOS: function () { return GET_ALL_INSUMOS },
                GET_ALL_MATERIAIS: function () { return GET_ALL_MATERIAIS },
                GET_MATERIAL: function (id) {
                    return 'SELECT * FROM materiais WHERE id = ' + id
                },
                GET_PEDIDOS_FOR_SOLICITANTE: function (id) {
                    return 'SELECT * FROM pedidos WHERE id_solicitante = ' + id
                },
                GET_SOLICITANTES_FOR_PEDIDO: function (id) {
                    return 'SELECT * FROM solicitantes WHERE id_pedido = ' + id
                },
                GET_INSUMOS_FOR_PEDIDO: function (id) {
                    return 'SELECT * FROM insumos WHERE id_pedido = ' + id
                },
                GET_MATERIAIS_FOR_PEDIDO: function (id) {
                    return 'SELECT * FROM materiais WHERE id_pedido = ' + id
                },
            }
        }])