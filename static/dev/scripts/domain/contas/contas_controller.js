angular.module('app').controller('mysql_controller', [ '$scope', 'Usuários',
    function($scope, Usuários) {
        console.log('mysql_controller')

        $scope.navTo = function(url) {
            if ($location.path() === url) {
                $route.reload()
            } else {
                $location.path(url)
            }
        }

        $scope.login = function () {
            Usuários.send(LOGIN, JSON.stringify($scope.user))
        }

        $scope.$on(LOGIN_SUCCESS, function (msg) {
            Auth.setUser($scope.user)
            $location.path('/')
        })
        $scope.$on(LOGIN_FAILURE, function (msg, tx_response) {
            Auth.setUser(null)
            $.alert({title: 'Login Failure', content: tx_response.reason })
        })

        $scope.register = function () {
            Usuários.send(REGISTER, JSON.stringify($scope.user))
        }

        $scope.$on(REGISTRATION_SUCCESS, function (msg) {
            Auth.setUser($scope.user)
            $.alert({ title: 'Registration success', content: '' })
            $location.path('/')
        })
        $scope.$on(REGISTRATION_FAILURE, function (msg, tx_response) {
            Auth.setUser(null)
            $.alert({title: 'Registration Failure', content: tx_response.reason })
        })

    }
])