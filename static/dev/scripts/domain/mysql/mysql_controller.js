angular.module('app').controller('mysql_controller', [ '$scope', 'Auth',
    function($scope, Auth) {
        console.log('mysql_controller')

        //$scope.shippingForUser = Auth.getUser().shipping? Auth.getUser().shipping: []
        $scope.shippingForUser = [ {id: 1, title: 'first order'}, {id: 2, title: 'another order'}]

        $scope.hasShipping = function() {
            var has = $scope.shippingForUser.length > 0
            if(has) {
                $('.diamante').addClass('hasShipping')
            } else {
                $('.diamante').removeClass('hasShipping')
            }
            return has
        }
    }
])