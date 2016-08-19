var app = angular.module('app',['angular-loading-bar','ui.router','oc.lazyLoad']);

app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){

  $stateProvider

  .state('page', {
      url:'/page',
      templateUrl:'views/common.html'
  })
  .state('page.pedido',{
      url:'/pedido',
      templateUrl:'views/pedido.html',
      resolve:{
          loadPlugin: function($ocLazyLoad){$ocLazyLoad.load('/js/pedido.js');}
      }
  })
  .state('page.dashboard',{
      url:'/dashboard',
      templateUrl:'views/dashboard.html'
  });

  $urlRouterProvider.otherwise('page/pedido');
}]);
