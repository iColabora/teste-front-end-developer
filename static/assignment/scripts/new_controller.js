angular.module('app').controller('new_controller', ['$location', '$scope', '$rootScope', 'safeApply',
    'DBContract', 'DataService', 'ViaCEPService',
    'GET_ALL_SOLICITANTES', 'GET_SOURCE_MATERIAIS', 'GET_SOURCE_INSUMOS',
    'POST_SOLICITANTE', 'POST_MATERIAL', 'POST_INSUMO', 'POST_PEDIDO',
    function ($location, $scope, $rootScope, safeApply, DBContract, DataService, ViaCEPService,
              GET_ALL_SOLICITANTES, GET_SOURCE_MATERIAIS, GET_SOURCE_INSUMOS,
              POST_SOLICITANTE, POST_MATERIAL, POST_INSUMO, POST_PEDIDO) {
        console.log('new_controller')


        function init() {
            $scope.solicitantes = []
            $scope.novo_solicitante = {}
            $scope.novo_entrega = {}
            $scope.novo_material = {}
            $scope.selected_materiais = []
            $scope.novo_insumo = {}
            $scope.selected_insumos = []
            $scope.waiting_on = {   POST_SOLICITANTE:0, POST_MATERIAL:0, POST_INSUMO:0, POST_PEDIDO:0}
            $scope.transaction_state = {CYCLE:1, BEGIN:1}

        }
        init()

        function reinit() {
            console.log('reinitializing page')
            delete $scope.pedido

            delete $scope.transactable
            delete $scope.selected_solicitante
            delete $scope.data_de_compra
            $scope.novo_solicitante = {}
            $scope.novo_entrega = {}
            $scope.novo_material = {}
            $scope.selected_materiais = []
            $scope.novo_insumo = {}
            $scope.selected_insumos = []
            $scope.solicitantes = []
            $scope.waiting_on = {POST_SOLICITANTE:0, POST_MATERIAL:0, POST_INSUMO:0, POST_PEDIDO:0}
            $scope.transaction_state = {CYCLE:1, BEGIN:1}
            delete $scope.source_insumos
            delete $scope.source_materiais
            delete $scope.currently_fetching_insumos
            DataService.send(GET_ALL_SOLICITANTES, DBContract.GET_ALL_SOLICITANTES())
            DataService.send(GET_SOURCE_MATERIAIS, DBContract.GET_SOURCE_MATERIAIS())
        }
        $scope.$watchCollection('waiting_on', _can_reinit)
        function _can_reinit(n,o,scope) {
            if(n === undefined) return
            var do_r = true
            var do_transaction = true

            var m = [n.POST_SOLICITANTE, n.POST_INSUMO, n.POST_MATERIAL, scope.transaction_state.BEGIN]
            for (k in [n.POST_SOLICITANTE, n.POST_INSUMO, n.POST_MATERIAL, scope.transaction_state.BEGIN]) {
                if (m[k]) { do_transaction = false; break }
            }
            if (do_transaction) {
                issue_pedido(true,null,scope)
                return
            }

            m = angular.merge({}, n, {CYCLE: scope.transaction_state.CYCLE})
            for (k in m){ if (m[k]) { do_r = false; break }}
            if(do_r) {
                reinit()
            }
        }


        angular.element(document).ready(function () {
            DataService.send(GET_ALL_SOLICITANTES, DBContract.GET_ALL_SOLICITANTES())
            DataService.send(GET_SOURCE_MATERIAIS, DBContract.GET_SOURCE_MATERIAIS())
            $scope.$watch('source_materiais', function (n,o, scope) {
                var not_n = n===undefined?true:undefined
                if([o, not_n, scope.currently_fetching_insumos].every(function (e) { return e === undefined })){
                    scope.currently_fetching_insumos = true
                    DataService.send(GET_SOURCE_INSUMOS, DBContract.GET_SOURCE_INSUMOS())
                }
            })
        })

        $scope.$on(GET_ALL_SOLICITANTES, function (type, tx_response) {
            // in case called while $scope.solicitantes has data:
            var solicitantes = tx_response
                .filter(function(sol) { return !_solicitantesHasId(sol.id) })

            $scope.solicitantes = $scope.solicitantes.concat(solicitantes,$rootScope.dummy.solicitantes)
            safeApply($scope)
        })

        $scope.$on(GET_SOURCE_MATERIAIS, function (type, tx_response) {
          // TODO - replace this with a real call for data (this was a no op call)
            $scope.source_materiais = $rootScope.dummy.materiais
            safeApply($scope)
        })

        $scope.$on(GET_SOURCE_INSUMOS, function (type, tx_response) {
            // TODO - replace this with a real call for data (this was a no op call)
            $scope.source_insumos = $rootScope.dummy.insumos.map(function(i) {
                i.material = angular.copy(($scope.source_materiais.filter(
                    function(m){ return m.id === i.id_material }))[0])
                return i
            })
            $scope.currently_fetching_insumos = false
            safeApply($scope)
        })

        $scope.$on(POST_SOLICITANTE, function (type, tx_response) {
            // TODO - replace this with a real call for data (this was a no op call)
            $scope.pedido.solicitante.id = 1 + $scope.solicitantes.reduce(_max_id, -1)
            $rootScope.dummy.solicitantes.push(angular.copy($scope.pedido.solicitante))
            $scope.waiting_on[POST_SOLICITANTE]--
            safeApply($scope)
        })

        $scope.$on(POST_MATERIAL, function (type, tx_response) {
            // TODO - replace this with a real call for data (this was a no op call)
            $scope.pedido.materiais[tx_response].id = 1 + $scope.source_materiais.reduce(_max_id, -1)
            $rootScope.dummy.materiais.concat(angular.copy($scope.pedido.materiais))
            $scope.waiting_on[POST_MATERIAL]--
            safeApply($scope)
        })
        $scope.$on(POST_INSUMO, function (type, tx_response) {
            // TODO - replace this with a real call for data (this was a no op call)
            $scope.pedido.insumos[tx_response].id = 1 + $scope.source_insumos.reduce(_max_id, -1)
            $rootScope.dummy.insumos.concat(angular.copy($scope.pedido.insumos))
            $scope.waiting_on[POST_INSUMO]--
            safeApply($scope)
        })
        $scope.$on(POST_PEDIDO, function (type, tx_response) {
            // TODO - replace this with a real call for data (this was a no op call)
            var id_pedido = 1 + $scope.dummy.pedidos.reduce(_max_id, 100)
            var id_sol = $scope.pedido.solicitante.id
            $scope.pedido.id = id_pedido
            $rootScope.dummy.pedidos.push(angular.copy($scope.pedido))
            $scope.waiting_on[POST_PEDIDO]--
            $scope.transaction_state.CYCLE=0
            safeApply($scope)

            console.dir(['pedidos',$rootScope.dummy.pedidos])

            $location.path('/check/' + id_sol + '/' + id_pedido)
            safeApply($scope)
        })

        function _max_id (p,c) {
            return c.id > p? c.id:p
        }


        function _solicitantesHasId(id) {
            return $scope.solicitantes.reduce(function (p,c) { return c.id===id? c.id:p }, false)
        }

        $scope.focusCallback = function($event) {
            if($event.target === null) { return }
            $scope.targetField = $event.target
        }

        $scope.CEPonChange = function (form) {
            ViaCEPService.test_CEP($scope.targetField, form)
        }

        $scope.toggle_add = function (type, event) {
            switch (type) {
                case 'novo_solicitante':
                    $scope.show_novo_solicitante = !$scope.show_novo_solicitante
                    break
                case 'editar_entrega':
                    $scope.show_editar_entrega = !$scope.show_editar_entrega
                    break
                case 'add_material':
                    $scope.show_add_material = !$scope.show_add_material
                    break;
                case 'add_insumo':
                    $scope.show_add_insumo = !$scope.show_add_insumo
            }

            event.preventDefault()
        }

        $scope.add = function (type) {
            switch (type) {
                case 'solicitante':
                    var solicitante = angular.copy($scope.novo_solicitante)
                    $scope.solicitantes.push(solicitante)
                    $scope.toggle_add('novo_solicitante', {preventDefault: function(){}})
                    $('#add_sol_form input').val('')
                    break
                case 'material':
                    $scope.source_materiais.push(angular.copy($scope.novo_material))
                    $scope.novo_material = {}
                    $scope.show_add_material = !$scope.show_add_material
                    $('#add_material_form input').val('')
                    break;
                case 'insumo':
                    var insumo = angular.copy($scope.novo_insumo)
                    insumo.id_material = $scope.source_materiais[$scope.selected_material_para_novo_insumo_index].id
                    insumo.material = $scope.source_materiais[$scope.selected_material_para_novo_insumo_index]
                    $scope.source_insumos.push(insumo)
                    $scope.novo_insumo = {}
                    $scope.show_add_insumo = !$scope.show_add_insumo
                    $('#add_insumo_form input, #add_insumo_form select').val('')
                    break;
            }
        }

        $scope.select = function (type) {
            switch (type) {
                case 'solicitante':
                    $scope.selected_solicitante = angular.copy($scope.solicitantes[$scope.selected_solicitante_index])
                    $scope.novo_entrega.cep = $scope.selected_solicitante.cep
                    $scope.novo_entrega.rua = $scope.selected_solicitante.rua
                    $scope.novo_entrega.numero = $scope.selected_solicitante.numero
                    $scope.novo_entrega.complemento = $scope.selected_solicitante.complemento
                    $scope.novo_entrega.bairro = $scope.selected_solicitante.bairro
                    $scope.novo_entrega.cidade = $scope.selected_solicitante.cidade
                    $scope.novo_entrega.estado = $scope.selected_solicitante.estado
                    $scope.novo_entrega.pais = $scope.selected_solicitante.pais
                    break
                case 'material':
                    var material = angular.copy($scope.source_materiais[$scope.selected_material_index])
                    material.quantidade = +$scope.material_quantity
                    material.preco *= +$scope.material_quantity
                    $scope.selected_materiais.push(material)
                    $('#add_material_form input').val('')
                    break
                case 'insumo':
                    var insumo = angular.copy($scope.source_insumos[$scope.selected_insumo_index])
                    insumo.quantidade = +$scope.insumo_quantity
                    insumo.preco *= +$scope.insumo_quantity
                    $scope.selected_insumos.push(insumo)
                    $('#add_insumo_form input').val('')
                    break
                default:
                    return
            }
            safeApply($scope)
        }

        $scope.entregaAvailable = function() {
            return _address_valid($scope.novo_entrega) && (! [undefined, ''].includes($scope.novo_entrega.cep))
        }
        $scope.hasItens = function() {
            return $scope.selected_insumos.length > 0 || $scope.selected_materiais.length > 0
        }

        $scope.shouldDisableButton = function(type) {
            if (type === 'add_material') {
                return _should_disable($scope.material_quantity, $scope.selected_material_index)
            } else if (type === 'add_insumo') {
                return _should_disable($scope.insumo_quantity, $scope.selected_insumo_index)
            }
        }

        function _address_valid(address) {
            return ('cep' in address)
        }

        function _should_disable (q,i) {
            if(([q, i].includes(undefined))
                || (+q < 1) || !_isInt(+q)) {
                return true
            }
            return false
        }

        function _isInt(value) {
            return typeof value === "number" &&
                isFinite(value) &&
                Math.floor(value) === value
        }

        $scope.precoTotal = function () {
            var total = $scope.selected_insumos.reduce(function(p,c) { return p + c.preco },0)
            return total + $scope.selected_materiais.reduce(function(p,c) { return p + c.preco },0)
        }

        $scope.$watch('selected_solicitante', build_pedido)
        $scope.$watch('novo_entrega', build_pedido)
        $scope.$watch('data_de_compra', build_pedido)
        $scope.$watchCollection('selected_insumos', build_pedido)
        $scope.$watchCollection('selected_materiais', build_pedido)
        function build_pedido(n,o,scope) {
            if ( ([scope.selected_solicitante, scope.data_de_compra].includes(undefined)) ||
                (!scope.hasItens()) ||
                (!_address_valid(scope.novo_entrega))
            ){ return }
            scope.pedido = {
                solicitante: angular.copy(scope.selected_solicitante),
                insumos: angular.copy(scope.selected_insumos),
                materiais: angular.copy(scope.selected_materiais),
                data_de_compra: scope.data_de_compra,
                cep: scope.novo_entrega.cep,
                rua: scope.novo_entrega.rua,
                numero: scope.novo_entrega.numero,
                bairro: scope.novo_entrega.bairro,
                cidade: scope.novo_entrega.cidade,
                estado: scope.novo_entrega.estado,
                pais: scope.novo_entrega.pais,
                preco_total: scope.precoTotal()
            }
        }

        $scope.beginTransaction = function() {
            if(!('id' in $scope.pedido.solicitante)) {
                DataService.send(POST_SOLICITANTE, DBContract.POST_SOLICITANTE(0))
                $scope.waiting_on[POST_SOLICITANTE]++
            }
            var idx = 0
            $scope.pedido.materiais.forEach(function (material) {
                if(!('id' in material)) {
                    DataService.send(POST_MATERIAL, DBContract.POST_MATERIAL(idx))
                    $scope.waiting_on[POST_MATERIAL]++
                }
                idx++
            })
            idx=0
            $scope.pedido.insumos.forEach(function (insumo) {
                if(!('id' in insumo)) {
                    DataService.send(POST_INSUMO, DBContract.POST_INSUMO(idx))
                    $scope.waiting_on[POST_INSUMO]++
                }
                idx++
            })
            $scope.transaction_state.BEGIN=0
            $scope.waiting_on.TRIGGER=0
        }

        //$scope.$watch('transactable', issue_pedido)
        $scope.$watch('pedido', issue_pedido)
        function issue_pedido(n,o,scope) {
            if(typeof n === 'undefined') return
            if(typeof n === 'boolean') {
                scope.transactable=n
                if (scope.pedido === undefined) return
                n = scope.pedido
            }
            scope.transaction_state.BEGIN=1

            // if we have results back from the database for the posted parts of the order, all that is missing at this
            // point is the order itself. So post it.

            // the .reduce statements effect to wait for the material and insumo entries to be generated, to respect
            // foreign key constraints
            if (scope.transactable && (n !== undefined) && ('id' in n.solicitante) &&
                ((n.insumos === undefined) || (n.insumos.reduce(function(p,c){ return (p&&('id' in c)) }, true))) &&
                ((n.materiais === undefined) || (n.materiais.reduce(function(p,c){ return (p&&('id' in c)) }, true))) &&
                    n.data_de_compra && n.cep){
                DataService.send(POST_PEDIDO, DBContract.POST_PEDIDO(0))
                $scope.waiting_on[POST_PEDIDO]++
                $scope.transaction_state.CYCLE=1
            }
        }

    }
])