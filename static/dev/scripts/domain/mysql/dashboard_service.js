angular.module('app').service('DashboardService', ['$rootScope', 'Auth', 'DataService', 'DASHBOARD', 'GET_PEDIDOS_FOR_SOLICITANTE',
    function($rootScope, Auth, DataService, DASHBOARD, GET_PEDIDOS_FOR_SOLICITANTE) {

        var $scope = {}
        const controller_wrapper  = function (f) {
            return function () {
                $scope = Array.prototype.shift.apply(arguments)
                var r = f.apply(this, arguments)
                return {
                    $scope: $scope,
                    return: r
                }
            }
        }

        return {
            select: controller_wrapper(function (id_solicitante) {
                var client = $scope.solicitantes.reduce(
                    function (prev, curr) { return (curr.id === id_solicitante)? curr: prev }, {id:-1})
                if (client.id === -1) {
                    console.log('[dashboard_service] select - invalid client id')
                    return
                }
                var u = Auth.getUser()
                u.client = client
                Auth.setUser(u)

                $scope.solicitante = client
                DataService.send(GET_PEDIDOS_FOR_SOLICITANTE, Contract.GET_PEDIDOS_FOR_SOLICITANTE(client.id))
                $scope.safeApply()
            }),
            new_order: controller_wrapper(function(client) {
                if(client !== undefined) {

                }
            }),
            get_client: controller_wrapper(function(){
                var u = Auth.getUser()
                return u.client
            })
        }
    }
])