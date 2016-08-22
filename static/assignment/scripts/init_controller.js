angular.module('app').controller('initController', ['$rootScope',
    function ($rootScope) {
        // TODO - fix database to handle insurance, and remove this
        $rootScope.dummy = {
            materiais: [
                {
                    id:100,
                    nome: 'Terra',
                    marca: 'Fábrica Material S/A',
                    preco: 100
                },
                {
                    id:101,
                    nome: 'Fogo',
                    marca: 'Fábrica Material S/A',
                    preco: 101
                },
                {
                    id:102,
                    nome: 'Ar',
                    marca: 'Fábrica Material S/A',
                    preco: 103
                },
                {
                    id:103,
                    nome: 'Agua',
                    marca: 'Fábrica Material S/A',
                    preco: 97
                }
            ],
            insumos: [
                {
                    id: 100,
                    id_material: 100,
                    descricao: 'Energia',
                    preco: 3
                },
                {
                    id: 101,
                    id_material: 102,
                    descricao: 'Fluxo',
                    preco: 5
                }
            ],
            pedidos: [],
            solicitantes: [],
            insurance_issued: []
        }
    }
])
