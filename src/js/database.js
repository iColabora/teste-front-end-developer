var Database = {
    
    fetchAllPedidos: function(callback) {
        var query = "SELECT * FROM pedidos";
        this._execute(query, callback); 
    },

    _execute: function(query, callback) {
        mysqlQuery(query, function(result) {
            var json = JSON.parse(result);
            callback(json);
        });
    }

}