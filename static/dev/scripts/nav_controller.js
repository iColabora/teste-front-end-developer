angular.module('app').controller('navController', ['$scope', '$location', 'Auth',
        'ROUTE_LOGIN', 'ROUTE_REGISTER', 'ROUTE_DASHBOARD',
    function($scope, $location, Auth, ROUTE_LOGIN, ROUTE_REGISTER, ROUTE_DASHBOARD) {
        console.log('navController')

        $scope.destinations = []

        $scope.showDiamante = function (i) {
            return (Auth.isLoggedIn() && /\/(?:admin|soluções|inicial|painéis)?$/.test($location.path()) && i === 0)
        }

        $scope.isLoggedIn = Auth.isLoggedIn

        $scope.$on('$locationChangeSuccess', function () {
            $scope.destinations = []
            if(/\/login$/.test($location.path())) {
                $scope.destinations.push({path:'#/' + ROUTE_REGISTER, text:'Inscrever-se'})
            } else if(/\/inscrever$/.test($location.path())) {
                $scope.destinations.push({path:'#/' + ROUTE_LOGIN, text:'Login'})
            } else if(/\/(?:admin|soluções|inicial|painéis)?$/.test($location.path())) {
                $scope.destinations.push({path:'#/' + ROUTE_DASHBOARD, text:'Painéis'})
            }
        })

        angular.element(document).ready(function () {
            $('#nav nav').addClass('shadow')
        });
    }
])