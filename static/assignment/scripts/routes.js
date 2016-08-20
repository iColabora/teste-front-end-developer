(function(){
    angular.module('app')
        .config(['$routeProvider',
            function config($routeProvider) {
                $routeProvider.
                    when('/', {
                        templateUrl: 'hipermídia/select_pedido.template.html',
                        controller: 'pedidos_controller',
                        resolve: {
                            factory: function (Res) {
                                controllersAndServices(Res, {styles: 'estilos/select_pedido.css'})
                            }
                        }
                    }).
                    when('/insurance', {
                        templateUrl: '/hipermídia/insurance_check.template.html?id=:id',
                        controller: 'insurance_controller',
                        resolve: {
                            factory: function (Res) {
                                controllersAndServices(Res, {styles: 'estilos/insurance_check.css'})
                            }
                        }
                    }).
                    when('/dashboard', {
                        templateUrl: '/hypermídia/dashboard.template.html',
                        controller: 'dashboard_controller',
                        resolve: {
                            factory: function (Res) {
                                controllersAndServices(Res, {styles: 'estilos/dashboard.css'})
                            }
                        }
                    }).

                    otherwise('/')
            }
        ])

    const controllersAndServices = function (Res, Routes) {
        Res.clean_scripts()
        Res.clean_styles()

        if ('scripts' in Routes) {
            Res.script(Routes.scripts)
        }
        if ('styles' in Routes) {
            Res.style(Routes.styles)
        }
    }

})()