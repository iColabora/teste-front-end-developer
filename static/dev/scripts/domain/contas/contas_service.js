angular.module('app').service('contas_service', [
    '$scope', '$location', '$route', '$http',
    'Auth', 'Usuários',
    'USER_SOCKET',
    'LOGIN_COMMAND', 'LOGIN_SUCCESS', 'LOGIN_FAILURE',
    'REGISTER_COMMAND', 'REGISTRATION_SUCCESS', 'REGISTRATION_FAILURE',

    function($scope, $location, $route, $http, Auth, Usuários, USER_SOCKET,
             LOGIN_COMMAND, LOGIN_SUCCESS, LOGIN_FAILURE,
             REGISTER_COMMAND, REGISTRATION_SUCCESS, REGISTRATION_FAILURE) {
        $scope.navTo = function(url) {
            if ($location.path() === url) {
                $route.reload()
            } else {
                $location.path(url)
            }
        }

        $scope.login = function () {
            Socket.send(USER_SOCKET,  LOGIN_SOCKET_COMMAND + ' ' + JSON.stringify($scope.user))
        }

        $scope.$on(LOGIN_SUCCESS, function (msg) {
            Auth.setUser($scope.user)
            $location.path('/')
        })
        $scope.$on(LOGIN_FAILURE, function (msg, tx_response) {
            Auth.setUser(null)
            $.alert({title: 'Falha no login', content: tx_response.reason })
        })

        $scope.register = function () {
            Socket.send(USER_SOCKET, REGISTER_SOCKET_COMMAND  + ' ' + JSON.stringify($scope.user))
        }

        $scope.$on(REGISTRATION_SUCCESS, function (msg) {
            Auth.setUser($scope.user)
            $.alert({ title: 'Registro bem sucedido', content: '' })
            $location.path('/')
        })
        $scope.$on(REGISTRATION_FAILURE, function (msg, tx_response) {
            Auth.setUser(null)
            $.alert({title: 'Falha de registro', content: tx_response.reason })
        })
    }
])
