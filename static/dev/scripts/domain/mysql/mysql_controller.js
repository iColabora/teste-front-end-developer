angular.module('app').controller('mysql_controller', [ '$scope', '$location', 'DataService', 'Auth', 'MySQL',
        'SQL_SERVER',
        'SOLICITANTES', 'INSUMOS', 'MATERIAIS',
        'GET_ALL_SOLICITANTES', 'GET_ALL_INSUMOS', 'GET_ALL_MATERIAIS', 'GET_MATERIAL',
        'ROUTE_ADMIN', 'ROUTE_SOLUTIONS',
    function($scope, $location, DataService, Auth, MySQL, SQL_SERVER, SOLICITANTES, INSUMOS, MATERIAIS,
             GET_ALL_SOLICITANTES, GET_ALL_INSUMOS, GET_ALL_MATERIAIS, GET_MATERIAL, ROUTE_ADMIN, ROUTE_SOLUTIONS) {
        console.log('mysql_controller')

        //$scope.shippingForUser = Auth.getUser().shipping? Auth.getUser().shipping: []
        $scope.shippingForUser = [
            {id: 1,
                data_de_compra: '17-08-2016',
                cep: '999-9999',
                rua: 'Primeiro Aven.',
                numero: '98765',
                bairro: 'Central',
                cidade: 'Rio de Janeiro',
                estado: 'RJ',
                pais: 'Brasil',
                solicitante: {
                    id: 1,
                    nome: 'roberto',
                    telefone: '1 301 111 2222',
                    cpf: '12esperançosamente34',
                    cep: '123-4567',
                    rua: 'Oitava Aven.',
                    numero: '12345',
                    bairro: 'Ipanema',
                    cidade: 'Rio de Janeiro',
                    estado: 'RJ',
                    pais: 'Brasil'
                },
                materiais: [
                    {
                        id: 1,
                        marca: 'cortadores de pedra anônima',
                        nome: 'pedra',
                        quantidade: '3',
                        preco: 'R$ 300'
                    },
                    {
                        id: 2,
                        marca: 'fábrica de tecidos',
                        nome: 'tecido',
                        quantidade: '2',
                        preco: 'R$ 100'
                    }
                ],
                insumos: [
                    {
                        id:1,
                        material: {
                            id: 2,
                            marca: 'fábrica de tecidos',
                            nome: 'tecido',
                            quantidade: '2',
                            preco: 'R$ 100'
                        },
                        descricao: 'é para pedra macia, como talco',
                        quantidade: '2',
                        preco: 'R$ 300'
                    },
                    {
                        id:1,
                        material: {
                            id: 3,
                            marca: 'cortadores de pedra anônima',
                            nome: 'pedra macia',
                            quantidade: '2',
                            preco: 'R$ 300'
                        },
                        descricao: 'é para tecido',
                        quantidade: '2',
                        preco: 'R$ 300'
                    }
                ]
            },
            {id: 2,
                data_de_compra: '17-08-2016',
                cep: '999-9999',
                rua: 'Primeiro Aven.',
                numero: '98765',
                bairro: 'Central',
                cidade: 'Rio de Janeiro',
                estado: 'RJ',
                pais: 'Brasil',
                solicitante: {
                    id: 2,
                    nome: 'foo',
                    telefone: '1 301 111 2222',
                    cpf: '1234',
                    cep: '123-4567',
                    rua: 'Rua Nonenta',
                    numero: '145',
                    bairro: 'Ipanema',
                    cidade: 'Rio de Janeiro',
                    estado: 'RJ',
                    pais: 'Brasil'
                },
                materiais: [
                    {
                        id: 2,
                        marca: 'fábrica de tecidos',
                        nome: 'tecido',
                        quantidade: '2',
                        preco: 'R$ 100'
                    }
                ],
                insumos: [
                    {
                        id:1,
                        material: {
                            id: 1,
                            marca: 'cortadores de pedra anônima',
                            nome: 'pedra',
                            quantidade: '3',
                            preco: 'R$ 300'
                        },
                        descricao: 'é para pedra macia, como talco',
                        quantidade: '2',
                        preco: 'R$ 300'
                    }
                ]
            }
        ]

        var mc = this

        angular.element(document).ready(function () {
            $scope.solicitantes = []
            $scope.insumos = []
            $scope.materiais = []
            $scope.solicitante = {pais: 'Brasil'}

            mc.route=$location.path().substring(1)
            $('.'+ mc.route +'_tab').hide()

            switch(mc.route) {
                case ROUTE_ADMIN:
                    mysqlQuery(mc.solicitantes, SQL_SERVER)
                    break
                case ROUTE_SOLUTIONS:
                    break
            }
        })

        $scope.safeApply = function(fn) {
            var phase = this.$root.$$phase
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                    fn()
                }
            } else {
                this.$apply(fn)
            }
        }

        $scope.nav = function(place) {
            mc.tab=place

            switch (place) {
                case SOLICITANTES:
                    if($scope.solicitantes.length === 0) {
                        DataService.send(GET_ALL_SOLICITANTES, GET_ALL_SOLICITANTES)
                    }
                    break
                case INSUMOS:
                    if($scope.insumos.length === 0) {
                        DataService.send(GET_ALL_INSUMOS, GET_ALL_INSUMOS)
                        if($scope.materiais.length === 0) {
                            DataService.send({event: GET_ALL_MATERIAIS}, GET_ALL_MATERIAIS)
                        }
                    }
                    break
                case MATERIAIS:
                    if($scope.materiais.length === 0) {
                        DataService.send(GET_ALL_MATERIAIS, GET_ALL_MATERIAIS)
                    }
            }
            $('.'+ mc.route +'_tab').hide()
            $('#'+place).show(0, function(){ $('.modificar.'+place+', ng-form.add').hide() })
        }

        $scope.$on(GET_ALL_SOLICITANTES, function (type, tx_sol) {
            var solicitantes = Auth.getUser().solicitantes
            $scope.solicitantes = ((solicitantes !== undefined) && solicitantes.length > 0)?
                tx_sol.concat(Auth.getUser().solicitantes): tx_sol

            $scope.safeApply()
            $('.modificar.'+SOLICITANTES).toggle(0, function () { $('ng-form.add').hide() })
        })

        $scope.$on(GET_ALL_INSUMOS, function (type, tx_sol) {
            var insumos = Auth.getUser().insumos
            $scope.insumos = ((insumos !== undefined) && insumos.length > 0)?
                tx_sol.concat(Auth.getUser().insumos): tx_sol

            var cnt = 0
            tx_sol.map(function(insumo){
                DataService.send(
                    { event:GET_MATERIAL, idx: cnt++}, "SELECT * FROM materiais WHERE id = " + insumo.id_material)
            })
            $scope.safeApply()
            $('.modificar.'+INSUMOS).toggle(0, function () { $('ng-form.add').hide() })
        })

        $scope.$on(GET_ALL_MATERIAIS, function (type, tx_sol) {
            if(('event' in tx_sol) && ($scope.materiais.length === 0)) {
                var materiais = Auth.getUser().materiais
                $scope.materiais = ((materiais !== undefined) && materiais.length > 0) ?
                    tx_sol.concat(Auth.getUser().materiais) : tx_sol.tx_response

                $scope.safeApply()

                if(mc.tab !== MATERIAIS ) { $('#'+MATERIAIS).hide() }
            }else{
                var materiais = Auth.getUser().materiais
                $scope.materiais = ((materiais !== undefined) && materiais.length > 0)?
                    tx_sol.concat(Auth.getUser().materiais): tx_sol

                $scope.safeApply()
                $('.modificar.'+MATERIAIS).toggle(0, function () { $('ng-form.add').hide() })
            }
        })

        $scope.$on(GET_MATERIAL, function (type, response) {
            $scope.insumos[response.event.idx].materiais = response.tx_response[0]
            $scope.safeApply()
        })

        $scope.activate = function(id) {
            $('.order_detail').removeClass('active')
            $('#order_detail_' + id).toggleClass('active')
        }

        /* toggles the listing of an individual item in a type */
        $scope.toggle = function(type, item) {
            $('.modificar.'+type+':not(#modificar_'+item+')').hide()
            $('#modificar_'+item+'.'+type).toggle()
        }

        /* toggles the add an item form for a type */
        $scope.toggle_add = function (type, event) {
            if([SOLICITANTES, INSUMOS, MATERIAIS].includes(type)) {
                $('.'+type+' > ng-form.add').toggle()
                $('ng-form.add input[name=cep]').change(function () { MySQL.test_CEP(this, 'ng-form.add') })
                $('ng-form.add input[name=pais]').change(function() {
                    if (/^\s*BRA[SZ]IL\s*$/i.test(''+$(this).val())){
                        $('ng-form.add input[name=cep]').change()
                    }
                })
            } else {
                console.log('[mysql_controller] toggle_add - invalid type')
            }
            event.preventDefault()
        }

        $scope.revert = function(type, item, index) {
            if([SOLICITANTES, INSUMOS, MATERIAIS].includes(type)) {
                for(var key in $scope[type][index]) {
                    if(![MATERIAIS, '$$hashKey', 'id', 'id_material', 'id_pedido'].includes(key)) {
                        $scope[type][index][key] = $('#modificar_' + item + '.' + type + ' input#' + key).data('initial')
                    }
                }
            } else {
                console.log('[mysql_controller] revert - invalid type')
            }
        }

        $scope.add = function (type) {
            if([SOLICITANTES, INSUMOS, MATERIAIS].includes(type)) {
                var item = {}
                $('#'+type+' ng-form.add .field').each(function(i,v){
                    var numeric = ($(v).attr('type') === 'number') || ($(v).attr('name') === 'id_material')
                    item[$(v).attr('name')] = numeric? +$(v).val(): $(v).val()
                })

                item.id = 1 + $scope[type].reduce(function(p, c) { return (p > +c.id)? p: +c.id}, -1)

                if(type === INSUMOS) {
                    item.materiais = angular.copy(
                        $scope[MATERIAIS].reduce(function(p, c) {
                            if(c.id === item.id_material) { return c }
                            return p
                        }, {id:-1})
                    )
                }

                var u = Auth.getUser()
                if(!(type in u)) {
                    u[type] = []
                }
                u[type].push(item)
                Auth.setUser(u)

                $scope[type].push(item)
                $scope.safeApply()

                $('#'+type+' ng-form.add .field').each(function(i,v){ $(v).val('') })
                $('.'+type+' > ng-form.add').toggle()
            } else {
                console.log('[mysql_controller] add - invalid type')
            }
        }

        $scope.delete = function(type, index) {
            if([SOLICITANTES, INSUMOS, MATERIAIS].includes(type)) {
                $.confirm({
                    title: 'Você tem certeza?',
                    content: 'Isso irá excluir o item.',
                    confirm: function(){
                        $scope[type].splice(index, 1)
                    },
                    confirmButtonClass: 'btn btn-danger',
                    cancelButtonClass: 'btn btn-default'
                })
            } else {
                console.log('[mysql_controller] delete - invalid type')
            }
        }


        $scope.hasShipping = function() {
            var has = $scope.shippingForUser.length > 0
            if(has) {
                $('.diamante').addClass('hasSubpanel')
            } else {
                $('.diamante').removeClass('hasSubpanel')
            }

            $('.mysql #shippingSubPanel > .subnav').addClass('shadow')
            $('#nav nav').removeClass('shadow')

            return has
        }

        $scope.hasSubpanel = function(bs) {
            (bs)? $('.diamante').addClass('hasSubpanel'): $('.diamante').removeClass('hasSubpanel'); // these semicolons
            (mc.route === 'admin')? $('.diamante').addClass('admin'): $('.diamante').removeClass('admin'); // are necessary
            (mc.route === 'soluções')? $('.diamante').addClass('soluções'): $('.diamante').removeClass('soluções');

            $('.mysql div:first-child > .subnav').addClass('shadow')
            $('#nav nav').removeClass('shadow')

            return bs
        }

        $scope.$on('$destroy', function(){
            $('.mysql div:first-child > .subnav').removeClass('shadow')
            $('#nav nav').addClass('shadow')
            $('.diamante').removeClass('soluções admin')
        })

    }
])