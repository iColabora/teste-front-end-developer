Service = (function() {
    return {
        body: function(){
            var s = {}
            const controller_wrapper  = function (f) {
                return function () {
                    s = Array.prototype.shift.apply(arguments)
                    let r = f.apply(this, arguments)
                    return {
                        $scope: s,
                        return: r
                    }
                }
            }

            return {
                adder: controller_wrapper(function (a, b) {
                    s.calls.push([a, b])
                    return a + b
                })
            }
        }
    }
})()

Controller = (function() {
    return {
        scope: {},
        body: function(Service, $scope=this.scope){
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

            $scope.calls = []
            $scope.test = service_wrapper(Service.adder)
        }
    }
})()

Controller.body(Service.body())
Controller.scope.test(1,2)
console.log(JSON.stringify(Controller.scope.calls))
console.log(Controller.scope.test(3,4))
console.log(JSON.stringify(Controller.scope.calls))