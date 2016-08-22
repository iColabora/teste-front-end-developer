angular.module('app').controller('new_controller', ['$scope', '$rootScope', 'safeApply',
    'DBContract', 'DataService', 'ViaCEPService',
    'GET_ALL_SOLICITANTES', 'GET_SOURCE_MATERIAIS', 'GET_SOURCE_INSUMOS',
    'POST_SOLICITANTE', 'POST_MATERIAL', 'POST_INSUMO', 'POST_PEDIDO',
    function ($scope, $rootScope, safeApply, DBContract, DataService, ViaCEPService,
              GET_ALL_SOLICITANTES, GET_SOURCE_MATERIAIS, GET_SOURCE_INSUMOS,
              POST_SOLICITANTE, POST_MATERIAL, POST_INSUMO, POST_PEDIDO) {


        function init() {
            $scope.solicitantes = []
            $scope.novo_solicitante = {}
            $scope.novo_entrega = {}
            $scope.novo_material = {}
            $scope.selected_materiais = []
            $scope.novo_insumo = {}
            $scope.selected_insumos = []
        }
        init()
        function reinit() {
            delete $scope.transactable
            delete $scope.selected_solicitante
            delete $scope.data_de_compra
            $scope.novo_solicitante = {}
            $scope.novo_entrega = {}
            $scope.novo_material = {}
            $scope.selected_materiais = []
            $scope.novo_insumo = {}
            $scope.selected_insumos = []
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

            $('#add_sol_form input[name=cep]').change(function () {
                ViaCEPService.test_CEP(this, '#add_sol_form') })
            $('#add_entrega_form input[name=cep]').change(function () {
                ViaCEPService.test_CEP(this, '#add_entrega_form') })

            $('#add_sol_form input[name=pais]').change(function() {
                if (/^\s*BRA[SZ]IL\s*$/i.test(''+$(this).val())){
                    $('#add_sol_form input[name=cep]').change()
                }
            })
            $('#add_entrega_form input[name=pais]').change(function() {
                if (/^\s*BRA[SZ]IL\s*$/i.test(''+$(this).val())){
                    $('#add_entrega_form input[name=cep]').change()
                }
            })

        })

        $scope.$on(GET_ALL_SOLICITANTES, function (type, tx_response) {
            solicitantes = tx_response
                .filter(function(sol) { return !_solicitantesHasId(sol.id) })
            $scope.solicitantes = $scope.solicitantes.concat(solicitantes)
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
            $rootScope.added_solicitantes.push(angular.copy($scope.pedido.solicitante))
        })

        $scope.$on(POST_MATERIAL, function (type, tx_response) {
            // TODO - replace this with a real call for data (this was a no op call)
            var mi = $scope.pedido.materiais.reduce(_find_index_matching_response, {idx:0, tx_response: tx_response})
            $scope.pedido.materiais[mi].id = 1 + $scope.source_materiais.reduce(_max_id, -1)
            $rootScope.added_materiais.concat(angular.copy($scope.pedido.materiais))

        })
        $scope.$on(POST_INSUMO, function (type, tx_response) {
            // TODO - replace this with a real call for data (this was a no op call)
            var ii = $scope.pedido.insumos.reduce(_find_index_matching_response, {idx:0, tx_response: tx_response})
            $scope.pedido.insumos[ii].id = 1 + $scope.source_insumos.reduce(_max_id, -1)
            $rootScope.added_insumos.concat(angular.copy($scope.pedido.insumos))
        })
        $scope.$on(POST_PEDIDO, function (type, tx_response) {
            // TODO - replace this with a real call for data (this was a no op call)
            $scope.pedido.id = 1 + $scope.added_pedidos.reduce(_max_id, 100)
            $rootScope.added_pedidos.push(angular.copy($scope.pedido))
            delete $scope.pedido
            reinit()
            safeApply($scope)
        })

        function _find_index_matching_response (p,c) {
            if( typeof p !== 'object') { return p }
            if(_equal_postback(c,p.tx_response)) {
                return p.idx
            } else {
                p.idx++
                return p
            }
        }

        function _equal_postback(l,r) {
            for (var p in l) {
                if(p === 'id') continue
                if(!(p in r)) {
                    return false
                }
            }
            return true
        }

        function _max_id (p,c) {
            return c.id > p? c.id:p
        }


        function _solicitantesHasId(id) {
            $scope.solicitantes.reduce(function (p,c) { return c===id? c.id:p }, false)
        }

        $scope.toggle_add = function (type, event) {
            switch (type) {
                case 'novo_solicitante':
                    $('#add_sol_form input').val('')
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
                    var solicitante = $scope.novo_solicitante
                    $scope.solicitantes.push(solicitante)
                    $('#add_sol_form input').val('')
                    $scope.toggle_add('novo_solicitante', {preventDefault: function(){}})
                case 'material':
                    $scope.source_materiais.push(angular.copy($scope.novo_material))
                    $scope.novo_material = {}
                    $scope.show_add_material = !$scope.show_add_material
                    $('#add_material_form input').val('')
                    break;
                case 'insumo':
                    var insumo = $scope.novo_insumo
                    insumo.id_material = $scope.source_materiais[$scope.selected_material_para_novo_insumo_index].id
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
                    $scope.selected_solicitante = $scope.solicitantes[$scope.selected_solicitante_index]
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
                    var material = $scope.source_materiais[$scope.selected_material_index]
                    material.quantidade = +$scope.material_quantity
                    material.preco *= +$scope.material_quantity
                    $scope.selected_materiais.push(material)
                    $('#add_material_form input').val('')
                    break
                case 'insumo':
                    var insumo = $scope.source_materiais[$scope.selected_insumo_index]
                    insumo.quantidade = +$scope.insumo_quantity
                    insumo.preco *= +$scope.insumo_quantity
                    insumo.material = $scope.selected_materiais[insumo.id_material]
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
            $scope.transactable = true
            if(!('id' in $scope.pedido.solicitante)) {
                DataService.send(POST_SOLICITANTE, DBContract.POST_SOLICITANTE($scope.pedido.solicitante))
            }
            $scope.pedido.materiais.forEach(function (material) {
                if(!('id' in material)) {
                    DataService.send(POST_MATERIAL, DBContract.POST_MATERIAL(material))
                }
            })
            $scope.pedido.insumos.forEach(function (insumo) {
                if(!('id' in insumo)) {
                    DataService.send(POST_INSUMO, DBContract.POST_INSUMO(insumo))
                }
            })
        }

        $scope.$watch('transactable', issue_pedido)
        $scope.$watch('pedido', issue_pedido)
        function issue_pedido(n,o,scope) {
            if(typeof n === 'undefined') return
            if(typeof n === 'boolean') {
                scope.transactable=n
                if (scope.pedido === undefined) return
                n = scope.pedido
            }
            // if we have results back from the database for the posted parts of the order, all that is missing at this
            // point is the order itself. So post it.
            if (scope.transactable && (n !== undefined) && ('id' in n.solicitante) &&
                ((n.insumos === undefined) || (n.insumos.reduce(function(p,c){ return (p&&('id' in c)) }, true))) &&
                ((n.materiais === undefined) || (n.materiais.reduce(function(p,c){ return (p&&('id' in c)) }, true))) &&
                    n.data_de_compra && n.cep){
                DataService.send(POST_PEDIDO, DBContract.POST_PEDIDO(n))
            }
        }

    }
])