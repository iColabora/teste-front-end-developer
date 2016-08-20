angular.module('app').controller('navController', ['$rootScope', '$scope', '$location', 'safeApply',
    function($rootScope, $scope, $location, safeApply) {
        console.log('navController')

        $scope.destinations = []

        $scope.showDiamante = function (i) {
            return ('\/dashboard' === $location.path() && i === 0)
        }

        $scope.resetClient = function() {
            $rootScope.client = {}
            $rootScope.shipping = {}

            $location.path('/')
            safeApply($scope)
        }

        angular.element(document).ready(function () {
            $('#nav nav').addClass('shadow')
        });
    }
])