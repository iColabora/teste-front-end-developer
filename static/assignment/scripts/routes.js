(function(){
    angular.module('app')
        .config(['$routeProvider',
            function config($routeProvider) {
                $routeProvider.
                    when('/', {
                        templateUrl: 'hipermídia/check_insurance.template.html',
                        controller: 'pedidos_controller',
                        resolve: {
                            factory: function (Res) {
                                controllersAndServices(Res, {styles: 'estilos/check_insurance.css'})
                            }
                        }
                    }).
                    when('/inicial', {
                        templateUrl: 'hipermídia/check_insurance.template.html',
                        controller: 'pedidos_controller',
                        resolve: {
                            factory: function (Res) {
                                controllersAndServices(Res, {styles: 'estilos/check_insurance.css'})
                            }
                        }
                    }).
                    when('/check/:id_sol/:id_pedido', {
                        templateUrl: 'hipermídia/check_insurance.template.html',
                        controller: 'pedidos_controller',
                        resolve: {
                            factory: function (Res) {
                                controllersAndServices(Res, {styles: 'estilos/check_insurance.css'})
                            }
                        }
                    }).
                    when('/list', {
                        templateUrl: 'hipermídia/check_insurance.template.html',
                        controller: 'pedidos_controller',
                        resolve: {
                            factory: function (Res) {
                                controllersAndServices(Res, {styles: 'estilos/check_insurance.css'})
                            }
                        }
                    }).
                    when('/new', {
                        templateUrl: 'hipermídia/new.template.html',
                        controller: 'new_controller',
                        resolve: {
                            factory: function (Res) {
                                controllersAndServices(Res, {styles: 'estilos/new.css'})
                            }
                        }
                    }).
                    when('/dashboard', {
                        templateUrl: 'hipermídia/dashboard.template.html',
                        controller: 'dashboard_controller',
                        resolve: {
                            factory: function (Res) {
                                controllersAndServices(Res, {styles: 'estilos/dashboard.css' ,
                                    scripts: 'scripts/plotly.min.1.16.2.js'})
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