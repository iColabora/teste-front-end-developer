angular.module('app').controller('contas_controller', [ '$scope', '$location', '$route', 'Auth', 'Usuários',
    'LOGIN_COMMAND', 'LOGIN_SUCCESS', 'LOGIN_FAILURE',
    'REGISTER_COMMAND', 'REGISTRATION_SUCCESS', 'REGISTRATION_FAILURE',
    function($scope, $location, $route, Auth, Usuários,
             LOGIN_COMMAND, LOGIN_SUCCESS, LOGIN_FAILURE,
             REGISTER_COMMAND, REGISTRATION_SUCCESS, REGISTRATION_FAILURE) {
        console.log('contas_controller')

        $scope.login = function () {
            Usuários.send(LOGIN_COMMAND, JSON.stringify($scope.user))
        }

        $scope.$on(LOGIN_SUCCESS, function (msg) {
            console.log('login successful')
            Auth.setUser($scope.user)
            $location.path('/')
            $scope.$apply()
        })
        $scope.$on(LOGIN_FAILURE, function (msg, reason) {
            console.log('login failure: ' + reason)
            Auth.setUser(null)
            $.alert({title: 'Falha no login', content: reason })
        })

        $scope.register = function () {
            Usuários.send(REGISTER_COMMAND, JSON.stringify($scope.user))
        }

        $scope.$on(REGISTRATION_SUCCESS, function (msg) {
            console.log('registration successful')
            Auth.setUser($scope.user)
            $.alert({ title: 'Registro bem sucedido', content: '' })
            $location.path('/')
            $scope.$apply()

        })
        $scope.$on(REGISTRATION_FAILURE, function (msg, reason) {
            console.log('registration failure: ' + reason)
            Auth.setUser(null)
            $.alert({title: 'Falha de registro', content: reason })
        })
    }
])