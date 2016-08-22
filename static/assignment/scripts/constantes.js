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

    .constant('ISSUE_EXTRA_INSURANCE', 'ISSUE_EXTRA_INSURANCE')
    .constant('GET_SOURCE_MATERIAIS', 'GET_SOURCE_MATERIAIS')
    .constant('GET_SOURCE_INSUMOS', 'GET_SOURCE_INSUMOS')
    .constant('POST_SOLICITANTE', 'POST_SOLICITANTE')
    .constant('POST_MATERIAL', 'POST_MATERIAL')
    .constant('POST_INSUMO', 'POST_INSUMO')
    .constant('POST_PEDIDO', 'POST_PEDIDO')

    .constant('NO_OP', ['ISSUE_EXTRA_INSURANCE', 'GET_SOURCE_MATERIAIS', 'GET_SOURCE_INSUMOS',
        'POST_SOLICITANTE', 'POST_MATERIAL', 'POST_INSUMO', 'POST_PEDIDO']) // TODO - fix database to handle insurance, sources, and remove this

    .factory('DBContract', ['GET_ALL_SOLICITANTES', 'GET_ALL_INSUMOS', 'GET_ALL_MATERIAIS', 'GET_MATERIAL',
        'ISSUE_EXTRA_INSURANCE', 'GET_SOURCE_MATERIAIS', 'GET_SOURCE_INSUMOS', 'NO_OP',
        function(GET_ALL_SOLICITANTES, GET_ALL_INSUMOS, GET_ALL_MATERIAIS, GET_MATERIAL,
                 ISSUE_EXTRA_INSURANCE, GET_SOURCE_MATERIAIS, GET_SOURCE_INSUMOS, NO_OP) {
            return {
                isNoOp: function (event) { return NO_OP.includes(event) }, // TODO - fix database to handle insurance, sources, and remove this
                ISSUE_EXTRA_INSURANCE: function (id) { return id },
                GET_MATERIAL: function (tx_sent) { return tx_sent },
                GET_SOURCE_MATERIAIS: function () { return '"' + GET_SOURCE_MATERIAIS + '"' },
                GET_SOURCE_INSUMOS: function () { return '"' + GET_SOURCE_INSUMOS + '"'},
                //TODO - fix this block once database is updated to soruces
                POST_SOLICITANTE: function (solicitante) {
                    return JSON.stringify(solicitante)

                    // I'm not going to build this for each one, this is just a sample of that work. You'd also need to
                    // add error checking to the form fields to ensure they will insert into the database

                    // return 'INSERT INTO solicitante VALUES (' +
                    // solicitante.id + ', ' + solicitante.nome + ', ' + solicitante.telefone + ', ' + solicitante.cpf +
                    // ', ' + solicitante.cep + ', ' + solicitante.rua + ', ' + solicitante.numero + ', ' +
                    // solicitante.bairro + ', ' + solicitante.estado + ', ' + solicitante.pais +
                    // +')'
                },
                POST_MATERIAL: function (material) { return JSON.stringify(material) },
                POST_INSUMO: function (insumo) { return JSON.stringify(insumo) },
                POST_PEDIDO: function (pedido) { return JSON.stringify(pedido) },

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
                }
            }
        }])