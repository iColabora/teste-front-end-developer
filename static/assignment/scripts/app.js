angular.module('app', ['ngRoute', 'ngCpfCnpj', 'ui.mask'])
    .directive('stringToNumber', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(value) {
                    return '' + value
                })
                ngModel.$formatters.push(function(value) {
                    return parseFloat(value)
                })
            }
        }
    })
    .directive('price', ['$filter', function($filter) {
        return {
            restrict:'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModelController) {
                ngModelController.$parsers.push(function(data) {
                    data=$filter('comma2decimal')(data)
                    return data
                })

                ngModelController.$formatters.push(function(data) {
                    data=$filter('decimal2comma')(data)
                    return data
                })
            }
        }
    }])
    .filter('comma2decimal', [
        function() {
            return function(input) {
                var ret=(input)? input.toString().trim().replace(",","."):null
                return parseFloat(ret)
            }
        }
    ])
    .filter('decimal2comma', [
        function() {
            return function(input) {
                var ret=(input)? input.toString().replace(".",","):null
                if(ret){
                    var decArr=ret.split(",")
                    if(decArr.length>1){
                        var dec=decArr[1].length
                        if(dec===1){ret+="0"}
                    }
                }
                return ret
            }
        }
    ])
    .factory('safeApply', [function($rootScope) {
        return function($scope, fn) {
            var phase = $scope.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if (fn) {
                    $scope.$eval(fn);
                }
            } else {
                if (fn) {
                    $scope.$apply(fn);
                } else {
                    $scope.$apply();
                }
            }
        }
    }])
/* db Contract class defined in constantes.js */