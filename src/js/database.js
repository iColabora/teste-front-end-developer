var Database = {
    
    fetchAllPedidos: function(callback) {
        var query = "select *, ((SELECT SUM (m.quantidade*m.preco) FROM materiais as m WHERE m.id_pedido = p.id)+(SELECT SUM (i.quantidade*i.preco) FROM insumos as i WHERE i.id_pedido = p.id)) as valor from pedidos as p";
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

    fetchPedidosPorDia: function(callback) {
        var query = "select count(*) as total, day(STR_TO_DATE(data_de_compra, '%Y-%m-%d')) as day from pedidos p group by day(STR_TO_DATE(data_de_compra, '%Y-%m-%d'))";
        this._execute(query, callback);
    },

    fetchPedidosPorSolicitantes: function(callback) {
        var query = "select count(*) total, s.nome from pedidos p inner join solicitantes s on s.id = p.id_solicitante group by p.id_solicitante";
        this._execute(query, callback);
    },

    _execute: function(query, callback) {
        mysqlQuery(query, function(result) {
            var json = JSON.parse(result);
            callback(json);
        });
    }

}