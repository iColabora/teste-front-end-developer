angular.module('app')
    .constant('SQL_SERVER', 'http://192.241.152.185/')
    .constant('DOMÍNIOS', 'scripts/domain')
    .constant('MÍDIA', 'hipermídia')

    .constant('ROUTE_LOGIN', 'login')
    .constant('ROUTE_REGISTER', 'inscrever')

    .constant('ROUTE_DASHBOARD', 'painéis')
    .constant('ROUTE_HOME', '')
    .constant('ROUTE_INICIAL', 'inicial')

    .constant('ROUTE_ADMIN', 'admin')
    .constant('ROUTE_SOLUTIONS', 'soluções')

    .constant('DADOS_USUARIOS', 'ws://dummy_websocket')
    .constant('DEFAULT_STREAM', '/')
    .constant('USER_SOCKET', 'dummy_websocket')
    .constant('LOGIN_COMMAND', 'LOGIN')
    .constant('LOGIN_SUCCESS', 'LOGIN_SUCCESS')
    .constant('LOGIN_FAILURE', 'LOGIN_FAILURE')
    .constant('REGISTER_COMMAND', 'REGISTER')
    .constant('REGISTRATION_SUCCESS', 'REGISTER_SUCCESS')
    .constant('REGISTRATION_FAILURE', 'REGISTER_FAILURE')

    .constant('SOLICITANTES', 'solicitantes')
    .constant('INSUMOS', 'insumos')
    .constant('MATERIAIS', 'materiais')
    .constant('DASHBOARD', 'painéis')

    .constant('GET_ALL_SOLICITANTES', 'SELECT * FROM solicitantes ORDER BY nome ASC')
    //.constant('GET_ALL_INSUMOS', 'SELECT * FROM insumos ORDER BY id_material ASC, precio DESC') // not sure what this doesn't work
    .constant('GET_ALL_INSUMOS', 'SELECT * FROM insumos ORDER BY id_material ASC')
    .constant('GET_ALL_MATERIAIS', 'SELECT * FROM materiais ORDER BY marca ASC, nome ASC')
    .constant('GET_MATERIAL', 'GET_MATERIAL')
    .constant('GET_PEDIDOS_FOR_SOLICITANTE', 'GET_PEDIDOS_FOR_SOLICITANTE')