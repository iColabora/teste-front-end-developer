angular.module('app').controller('mysql_controller', [ '$scope', '$location',
        'DataService', 'Auth', 'MySQL', 'AdminService', 'DashboardService',
        'SQL_SERVER', 'ROUTE_DASHBOARD', 'ROUTE_INICIAL', 'ROUTE_HOME',
        'SOLICITANTES', 'INSUMOS', 'MATERIAIS', 'DASHBOARD',
        'GET_ALL_SOLICITANTES', 'GET_ALL_INSUMOS', 'GET_ALL_MATERIAIS', 'GET_MATERIAL', 'GET_PEDIDOS_FOR_SOLICITANTE',
    function($scope, $location, DataService, Auth, MySQL, AdminService, DashboardService,
             SQL_SERVER, ROUTE_DASHBOARD, ROUTE_INICIAL, ROUTE_HOME,
             SOLICITANTES, INSUMOS, MATERIAIS, DASHBOARD,
             GET_ALL_SOLICITANTES, GET_ALL_INSUMOS, GET_ALL_MATERIAIS, GET_MATERIAL, GET_PEDIDOS_FOR_SOLICITANTE) {
        console.log('mysql_controller')

        var mc = this

        $scope.shippingForUser = Auth.getUser().shipping? Auth.getUser().shipping: []
        $scope.solicitantes = ($scope.solicitantes === undefined)? []: $scope.solicitantes

        angular.element(document).ready(function () {
            $scope.shippingForUser = Auth.getUser().shipping? Auth.getUser().shipping: []
            $scope.solicitantes = ($scope.solicitantes === undefined)? []: $scope.solicitantes
            $scope.insumos = ($scope.insumos === undefined)? []: $scope.insumos
            $scope.materiais = ($scope.materiais === undefined)? []: $scope.materiais
            $scope.solicitante = {pais: 'Brasil'}

            mc.route=$location.path().substring(1)
            $('.'+ mc.route +'_tab').hide()
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

    /* Navigation */

        $scope.nav = function(place) {
            mc.tab=place

            switch (place) {
                case DASHBOARD:
                    if($scope.solicitantes.length === 0) {
                        DataService.send({event: GET_ALL_SOLICITANTES, for: DASHBOARD}, GET_ALL_SOLICITANTES)
                    }
                    break
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
            $('#'+place).show(0, function(){ $('.modificar.'+place+', ng-form.add').hide() })
        }

        $scope.$on(GET_ALL_SOLICITANTES, function (type, tx_sol) {
            // merge user's custom records if preexisting
            // this must happen at a GET_ALL_SOLICITANTES event before $scope.solicitantes is used
            var tx_r = ('event' in tx_sol)? tx_sol.tx_response : tx_sol
            var solicitantes = Auth.getUser().solicitantes

            $scope.solicitantes = ((solicitantes !== undefined) && solicitantes.length > 0)?
                tx_r.concat(Auth.getUser().solicitantes): tx_r

            $scope.safeApply()
            $('.modificar.'+SOLICITANTES).toggle(0, function () { $('ng-form.add').hide() })
        })

        $scope.$on(GET_ALL_INSUMOS, function (type, tx_sol) {
            var insumos = Auth.getUser().insumos

            if(('event' in tx_sol) && (tx_sol.event.for === GET_PEDIDOS_FOR_SOLICITANTE)) {
                $scope.insumos = ((insumos !== undefined) && insumos.length > 0) ?
                    tx_sol.concat(Auth.getUser().insumos) : tx_sol.tx_response

                get_materiais_for_insumos(tx_sol.tx_response)

                if(($scope.materiais.length !== 0) && ($scope.insumos.length !== 0)) { build_shipping_list() }
            } else {
                $scope.insumos = ((insumos !== undefined) && insumos.length > 0) ?
                    tx_sol.concat(Auth.getUser().insumos) : tx_sol

                get_materiais_for_insumos(tx_sol)

                $scope.safeApply()
                $('.modificar.' + INSUMOS).toggle(0, function () { $('ng-form.add').hide() })
            }
        })

        function get_materiais_for_insumos(insumos) {
            var cnt = 0
            insumos.map(function (insumo) {
                DataService.send({event: GET_MATERIAL, idx: cnt++}, Contract[GET_MATERIAL](insumo.id_material))
            })
        }

        $scope.$on(GET_ALL_MATERIAIS, function (type, tx_sol) {
            var materiais = Auth.getUser().materiais

            if(('event' in tx_sol) && ($scope.materiais.length === 0)) {
                $scope.materiais = ((materiais !== undefined) && materiais.length > 0) ?
                    tx_sol.concat(Auth.getUser().materiais) : tx_sol.tx_response

                if (mc.tab !== MATERIAIS) {
                    $('#' + MATERIAIS).hide()
                }
                if((tx_sol.event.for === GET_PEDIDOS_FOR_SOLICITANTE) &&
                        ($scope.materiais.length !== 0) && ($scope.insumos.length !== 0)) {
                    build_shipping_list()
                }
            }else{
                $scope.materiais = ((materiais !== undefined) && materiais.length > 0) ?
                    tx_sol.concat(Auth.getUser().materiais) : tx_sol

                $scope.safeApply()
                $('.modificar.'+MATERIAIS).toggle(0, function () { $('ng-form.add').hide() })
            }
        })

        $scope.$on(GET_MATERIAL, function (type, response) {
            $scope.insumos[response.event.idx].materiais = response.tx_response[0]
            $scope.safeApply()
        })

        $scope.$on(GET_PEDIDOS_FOR_SOLICITANTE, function (type, tx_sol) {
            var u = Auth.getUser()
            u.shipping = tx_sol
            Auth.setUser(u)

            if($scope.materiais.length === 0) {
                DataService.send({event: GET_ALL_MATERIAIS, for: GET_PEDIDOS_FOR_SOLICITANTE}, GET_ALL_MATERIAIS)
            }
            if($scope.insumos.length === 0) {
                DataService.send({event: GET_ALL_INSUMOS, for: GET_PEDIDOS_FOR_SOLICITANTE}, GET_ALL_INSUMOS)
            }

            var pedidos
            if (($scope.materiais.length !== 0) && ($scope.insumos.length !== 0)) {
                build_shipping_list()
            } else {
                u.shipping = u.shipping.map(function(p) { p.materiais = []; p.insumos = []; return p })
                Auth.setUser(u)
            }
        })

        /* called when all data is available from pedidios, insumos, and materiais */
        function build_shipping_list () {
            var u = Auth.getUser()

            var total = 0
            u.shipping = u.shipping.map(function (pedido) {
                pedido.materiais = $scope.materiais.filter(function(m) {
                    if (m.id_pedido === pedido.id) {
                        total += m.preco * m.quantidade
                        return true
                    }
                })
                pedido.insumos = $scope.insumos
                    .filter(function(i) {
                        if (i.id_pedido === pedido.id) {
                            total += i.preco * i.quantidade
                            return true
                        }
                    })
                    .map(function(i) {
                        i.material = $scope.materiais.reduce(function(p,c) {
                            return (i.id_material === c.id)? c:p
                        }, {id: -1})
                        return i
                    })
                pedido.total = total
                pedido.solicitante = $scope.solicitante

                return pedido
            })

            Auth.setUser(u)

            $scope.shippingForUser = u.shipping
            $scope.safeApply()

            $scope.hasShipping()
        }

    /* UI helpers */
        $scope.activate = function(id) {
            if(id === DASHBOARD) {
                var u = Auth.getUser()
                /* if user is on home page and clicks to nav back, and has already a displayed dashboard,
                 reset it to give them a chance to select a different client  */
                console.log(mc.route)
                if ([ROUTE_DASHBOARD, ROUTE_INICIAL, ROUTE_HOME].includes(mc.route)
                    && $scope.shippingForUser.length > 0) {
                    $scope.shippingForUser = []
                    delete u.client
                    delete u.shipping
                    Auth.setUser(u)
                    $scope.safeApply()
                }
                return
            }
            $('.order_detail').removeClass('active')
            $('#order_detail_' + id).toggleClass('active')
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

        $scope.hasClient = function() {
            var u = Auth.getUser()
            console.log('client' in u)
            return 'client' in u
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

    /* Actions */
        const service_wrapper = function(fun) {
            return function() {
                [].splice.call(arguments, 0,0, $scope);
                var r = fun.apply(this, arguments)
                if(r !== undefined) {
                    if ((typeof r === 'object') && ('$scope' in r)) {
                        $scope = r.$scope
                        return r.return
                    } else {
                        return r
                    }
                }
            }
        }

        /* Dashboard actions */
        $scope.select = service_wrapper(DashboardService.select)

        /* Admin actions */
        $scope.revert = service_wrapper(AdminService.revert)
        $scope.add = service_wrapper(AdminService.add)
        $scope.delete = service_wrapper(AdminService.delete)

    }
])
