angular.module('app').service('PedidosService', ['$rootScope',
    function($rootScope) {
        return {
            Data: {
                solicitantes: [],
                client: {},
                shipping: []
            },
            awaiting: {},
            await: function (TX) { this.awaiting = (TX in this.awaiting)? ++this.awaiting[TX]: 1 },
            conclude: function (TX) { this.awaiting[TX]-- },
            reinit: function () {
                this.Data.solicitantes = []
                this.Data.client = {}
                this.Data.shipping = []
            }
        }
    }
])