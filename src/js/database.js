var Database = {
    
    fetchAllPedidos: function(callback) {
        var query = "SELECT * FROM pedidos";
        this._execute(query, callback); 
    },

    findMaterialByPedidoId: function(id, callback) {
        var query = "SELECT * FROM materiais WHERE id_pedido ="+id;
        this._execute(query, callback); 
    },

    fetchAllSolicitantes: function(callback) {
        var query = "SELECT * FROM solicitantes";
        this._execute(query, callback); 
    },

    _execute: function(query, callback) {
        mysqlQuery(query, function(result) {
            var json = JSON.parse(result);
            callback(json);
        });
    }

}