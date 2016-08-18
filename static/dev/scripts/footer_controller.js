angular.module('app').controller('footerController', ['$scope',
    function($scope) {
        console.log('footerController')

        $scope.year = new Date().getFullYear()
    }
])