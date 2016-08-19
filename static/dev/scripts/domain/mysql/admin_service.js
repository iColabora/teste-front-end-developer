angular.module('app').service('AdminService', ['$rootScope', 'Auth', 'SOLICITANTES', 'INSUMOS', 'MATERIAIS',
    function($rootScope, Auth, SOLICITANTES, INSUMOS, MATERIAIS) {

        var $scope = {}
        const controller_wrapper  = function (f) {
            return function () {
                $scope = Array.prototype.shift.apply(arguments)
                var r = f.apply(this, arguments)
                return {
                    $scope: $scope,
                    return: r
                }
            }
        }

        return {
            delete: controller_wrapper(function($event, type, index) {
                $event.preventDefault()
                if([SOLICITANTES, INSUMOS, MATERIAIS].includes(type)) {
                    $.confirm({
                        title: 'Você tem certeza?',
                        content: 'Isso irá excluir o item.',
                        confirm: function(){
                            $scope[type].splice(index, 1)
                            $scope.safeApply()
                        },
                        confirmButtonClass: 'btn btn-danger',
                        cancelButtonClass: 'btn btn-default'
                    })
                } else {
                    console.log('[admin_service] delete - invalid type')
                }
            }),
            add: controller_wrapper(function (type) {
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
                    console.log('[admin_service] add - invalid type')
                }
            }),
            revert: controller_wrapper(function($event, type, item, index) {
                $event.preventDefault()
                if([SOLICITANTES, INSUMOS, MATERIAIS].includes(type)) {
                    for(var key in $scope[type][index]) {
                        if(![MATERIAIS, '$$hashKey', 'id', 'id_material', 'id_pedido'].includes(key)) {
                            $scope[type][index][key] = $('#modificar_' + item + '.' + type + ' input#' + key)
                                .data('initial')
                        }
                    }
                } else {
                    console.log('[admin_service] revert - invalid type')
                }
            })
        }
    }
])
