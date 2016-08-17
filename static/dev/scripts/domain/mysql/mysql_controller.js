angular.module('app').controller('mysql_controller', [ '$scope', 'Auth',
    function($scope, Auth) {
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

        $scope.activate = function(id) {
            $('.order_detail').removeClass('active')
            $('#order_detail_' + id).toggleClass('active')
        }

        $scope.hasShipping = function() {
            var has = $scope.shippingForUser.length > 0
            if(has) {
                $('.diamante').addClass('hasShipping')
            } else {
                $('.diamante').removeClass('hasShipping')
            }

            $('#dashboard #shippingSubPanel > .subnav').addClass('shadow')
            $('#nav nav').removeClass('shaddow')

            return has
        }

        $scope.on('$destroy', function(){})
    }
])