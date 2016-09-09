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
    'appShipment.pedidos',
    'chart.js'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/tasks.html',
        controller: 'TasksCtrl',
        controllerAs: 'task',
        resolve: {
          pedidosPorDia: function(pedidos) {
            return pedidos.getPedidosPorDia();
          }
        }
      })
      .when('/about', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dasboard'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode({
        enabled: true,
        requirebase: true
      });
  });
