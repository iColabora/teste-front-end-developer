'use strict';

/**
 * @ngdoc overview
 * @name appShipment
 * @description
 * # appShipment
 *
 * Main module of the application.
 */
angular
  .module('appShipment', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'appShipment.pedidos'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/pedidos.html',
        controller: 'TasksCtrl',
        controllerAs: 'task',
        resolve: {
          pedidosPorDia: function(pedidos) {
            return pedidos.getPedidosPorDia();
          }
        }
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dash',
        resolve: {
          pedidos: function(pedidos){
            return pedidos.getPedidos();
          },
          materiais: function(pedidos){
            return pedidos.getMateriais();
          },
          insumos: function(pedidos){
            return pedidos.getInsumos();
          }
        }
      })
      .when('/solicitantes', {
        templateUrl: 'views/solicitantes.html',
        controller: 'SolicitantesCtrl',
        controllerAs: 'solicitantes',
        resolve: {
          pedidosPorSolicitante: function(pedidos){
            return pedidos.getPedidosPorSolicitante();
          }
        }
      })
      .when('/pedidosPendentes', {
        templateUrl: 'views/pedidospendentes.html',
        controller: 'PedidospendentesCtrl',
        controllerAs: 'pedidosPendentes'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
    .controller('geralCtrl', function($scope, $location){
        $scope.playProcesso = function(){
            window.location.replace('#/dashboard');
        }
    })
  ;
