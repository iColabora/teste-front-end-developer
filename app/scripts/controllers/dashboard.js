'use strict';

/**
 * @ngdoc function
 * @name appShipment.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the testeFrontEndDeveloperApp
 */
angular.module('appShipment')
  .controller('DashboardCtrl', function (pedidos, materiais, insumos) {
    var vm = this;

    vm.pedidos = pedidos;
    vm.materiais = materiais;
    vm.insumos = insumos;


    vm.somaTotal = function(numeroPedido){
      if (typeof (materiais) === 'undefined' || typeof (numeroPedido) === 'undefined') {
          return 0;
      }
      var sum = 0;

      // Soma valores dos materiais
      for (var i = 0 ; i < materiais.length; i++) {
          if(materiais[i].numero == numeroPedido){
            sum += materiais[i].quantidade * materiais[i].preco;
          }
      }

      // Soma valores dos insumos
      for (var i = 0 ; i < insumos.length; i++) {
          if(insumos[i].numero == numeroPedido){
            sum += insumos[i].quantidade * insumos[i].preco;
          }
      }
      return sum;
    }

    vm.getInsumo = function(id_material){
      var fInsumo = [];
      insumos.map(function(e){
        if(e.id_material == id_material){
          fInsumo.push(e);
        }
      });
      return fInsumo;
    }

    vm.openTicket = function($event){
      var element = angular.element($event.currentTarget);
      if(element.parent().hasClass('open')){
        element.parent().removeClass('open');
      }else{
        element.parent().addClass('open');
      }
    }

    vm.dateFormat = function(date){
      var newDate = new Date(date);
      console.log(newDate);
      return newDate;
    }

  });
