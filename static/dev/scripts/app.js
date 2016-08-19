angular.module('app', ['ngRoute', 'ngCpfCnpj', 'ui.mask'])
    .directive('stringToNumber', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(value) {
                    return '' + value;
                })
                ngModel.$formatters.push(function(value) {
                    return parseFloat(value);
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
                    data=$filter('comma2decimal')(data);
                    return data;
                });

                ngModelController.$formatters.push(function(data) {
                    data=$filter('decimal2comma')(data);
                    return data;
                });
            }
        }
    }])