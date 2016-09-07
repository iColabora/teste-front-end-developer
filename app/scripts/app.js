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
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/tasks.html',
        controller: 'TasksCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode({
        enabled: true,
        requirebase: true
      });
  });
