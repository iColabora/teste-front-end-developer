'use strict';

/**
 * @ngdoc service
 * @name appShipment.pedidos
 * @description
 * # pedidos
 * Factory in the appShipment.
 */
angular.module('appShipment.pedidos', [])
  .factory('pedidos', function ($http, $q) {
    // Obj que contêm as funções de busca
    var pedido = {};

    // Função de retorno de consultas
    function callback(query, deferred){
        $http.get("http://192.241.152.185/"+query)
          .success(function(data){
            var pedidos = JSON.stringify(data);
            pedidos = JSON.parse(pedidos);
            return deferred.resolve(pedidos);
          }).error(function(err){
            return deferred.reject(pedidos);
        });
        return deferred.promise;
    };

    /**
     * Retorna Infos Gerais do Pedidos
    */
    pedido.getPedidos = function(){
      var deferred = $q.defer();
      var query = "SELECT pedidos.numero, pedidos.data_de_compra, solicitantes.nome "+
                    "FROM pedidos "+
                        "JOIN solicitantes ON pedidos.id_solicitante=solicitantes.id "+
                          "GROUP BY pedidos.numero "+
                            "ORDER BY pedidos.data_de_compra ASC";

      return callback(query, deferred);
    };

    /**
     * Retorna Insumos
    */
    pedido.getInsumos = function(){
      var deferred = $q.defer();
      var query = "SELECT insumos.descricao, insumos.quantidade, insumos.preco, insumos.id_material, pedidos.numero, materiais.nome "+
                    "FROM insumos "+
                    "JOIN pedidos ON pedidos.id=insumos.id_pedido "+
                      "JOIN materiais ON materiais.id=insumos.id_material "+
                          "ORDER BY pedidos.numero ASC";

      return callback(query, deferred);
    };

    /**
     * Retorna Materiais
    */
    pedido.getMateriais = function(){
      var deferred = $q.defer();
      var query = "SELECT materiais.id, materiais.nome, materiais.marca, materiais.preco, materiais.quantidade, pedidos.numero "+
                    "FROM materiais "+
                      "JOIN pedidos ON pedidos.id=materiais.id_pedido "+
                        "ORDER BY pedidos.numero ASC";

      return callback(query, deferred);
    };

    /**
     * Retorna quantidade de pedidos por Solicitante
    */
    pedido.getPedidosPorSolicitante = function(){
      var deferred = $q.defer();
      var query = "SELECT DATE(pedidos.data_de_compra) AS data_de_compra, pedidos.numero, solicitantes.nome, solicitantes.id "+
                    "FROM pedidos "+
                      "JOIN solicitantes ON solicitantes.id=pedidos.id_solicitante "+
                        "ORDER BY data_de_compra ASC ";

      return callback(query, deferred);
    };

    /**
     * Retorna quantidade de pedidos por dia
    */
    pedido.getPedidosPorDia = function(){
      var deferred = $q.defer();
      var query = "SELECT DATE(pedidos.data_de_compra) AS data_de_compra, pedidos.numero, solicitantes.nome "+
                    "FROM pedidos "+
                      "JOIN solicitantes ON solicitantes.id=pedidos.id_solicitante "+
                        "ORDER BY data_de_compra ASC ";

      return callback(query, deferred);
    };

    return pedido;
  });
