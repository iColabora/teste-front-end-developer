angular.module('app').controller('mysql_controller', [ '$scope', '$location', 'DataService',
        'SQL_SERVER',
        'SOLICITANTES', 'INSUMOS', 'MATERIAIS', 'GET_ALL_SOLICITANTES', 'GET_ALL_INSUMOS', 'GET_ALL_MATERIAIS',
        'ROUTE_ADMIN', 'ROUTE_SOLUTIONS',
    function($scope, $location, DataService, SQL_SERVER, SOLICITANTES, INSUMOS, MATERIAIS, GET_ALL_SOLICITANTES,
             GET_ALL_INSUMOS, GET_ALL_MATERIAIS, ROUTE_ADMIN, ROUTE_SOLUTIONS) {
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

            mc.route=$location.path().substring(1)
            $('.'+mc.route + '_tab').hide()

            switch(mc.route) {
                case ROUTE_ADMIN:
                    mysqlQuery(mc.solicitantes, SQL_SERVER)
                    break
                case ROUTE_SOLUTIONS:
                    break
            }
        })

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
                    }
                    break
                case MATERIAIS:
                    if($scope.materiais.length === 0) {
                        DataService.send(GET_ALL_MATERIAIS, GET_ALL_MATERIAIS)
                    }
            }

            $('.'+ mc.route +'_tab').hide()
            $('#'+place).show()
        }

        $scope.$on(GET_ALL_SOLICITANTES, function (type, tx_sol) {
            $scope.solicitantes = tx_sol
            $scope.$apply()
            $('.modificar.'+SOLICITANTES).toggle()
        })

        $scope.$on(GET_ALL_INSUMOS, function (type, tx_sol) {
            $scope.solicitantes = tx_sol
            $scope.$apply()
            $('.modificar.'+INSUMOS).toggle()
        })

        $scope.$on(GET_ALL_MATERIAIS, function (type, tx_sol) {
            $scope.solicitantes = tx_sol
            $scope.$apply()
            $('.modificar.'+MATERIAIS).toggle()
        })

        $scope.activate = function(id) {
            $('.order_detail').removeClass('active')
            $('#order_detail_' + id).toggleClass('active')
        }

        $scope.toggle = function(type, item) {
            $('.modificar.'+type+':not(#modificar_'+item+')').hide()
            $('#modificar_'+item+'.'+type).toggle()
        }

        $scope.revert = function(type, item, index) {
            if([SOLICITANTES, INSUMOS, MATERIAIS].includes(type)) {
                for(var key in $scope[type][index]) {
                    if(![MATERIAIS, '$$hashKey', 'id', 'id_pedido'].includes(key)) {
                        console.log(key + ':'+ $('#modificar_' + item + ' input#' + key).data('initial') + ' -> ' + $scope[type][index][key])
                        $('#modificar_' + item + '.' + type + ' input#' + key).val(
                            $('#modificar_' + item + ' input#' + key).data('initial')
                        )
                    }
                }
            } else {
                console.log('[mysql_controller] revert - invalid type')
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