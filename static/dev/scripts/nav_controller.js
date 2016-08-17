angular.module('app').controller('navController', ['$scope', '$location', 'Auth', 'ROUTE_LOGIN', 'ROUTE_REGISTER', 'ROUTE_DASHBOARD',
    function($scope, $location, Auth, ROUTE_LOGIN, ROUTE_REGISTER, ROUTE_DASHBOARD) {
        console.log('navController')

        $scope.destinations = []

        $scope.isLoggedIn = Auth.isLoggedIn

        $scope.$on('$locationChangeSuccess', function () {
            console.log('location changed')
            $scope.destinations = []
            if(/\/login$/.test($location.path())) {
                $scope.destinations.push({path:'#/', text:'Inicial'})
                $scope.destinations.push({path:'#/' + ROUTE_REGISTER, text:'Inscrever-se'})
            } else if(/\/inscrever$/.test($location.path())) {
                $scope.destinations.push({path:'#/', text:'Inicial'})
                $scope.destinations.push({path:'#/' + ROUTE_LOGIN, text:'Login'})
            } else if(/\/(?:inicial)?$/.test($location.path())) {
                $scope.destinations.push({path:'#/' + ROUTE_DASHBOARD, text:'Painéis'})
            }
        })
    }
])